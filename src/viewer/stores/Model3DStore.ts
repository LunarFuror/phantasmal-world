import { ArrayBufferCursor } from "../../core/data_formats/cursor/ArrayBufferCursor";
import { Endianness } from "../../core/data_formats/Endianness";
import { NjMotion, parse_njm } from "../../core/data_formats/parsing/ninja/motion";
import { NjObject, parse_nj, parse_xj } from "../../core/data_formats/parsing/ninja";
import {
    CharacterClassModel,
    FOMAR,
    FOMARL,
    FONEWEARL,
    FONEWM,
    HUCASEAL,
    HUCAST,
    HUMAR,
    HUNEWEARL,
    RACASEAL,
    RACAST,
    RAMAR,
    RAMARL,
} from "../model/CharacterClassModel";
import { CharacterClassAnimationModel } from "../model/CharacterClassAnimationModel";
import { WritableProperty } from "../../core/observable/property/WritableProperty";
import { read_file } from "../../core/read_file";
import { list_property, property } from "../../core/observable";
import { Property } from "../../core/observable/property/Property";
import { PSO_FRAME_RATE } from "../../core/rendering/conversion/ninja_animation";
import { parse_xvm, XvrTexture } from "../../core/data_formats/parsing/ninja/texture";
import { CharacterClassAssetLoader } from "../loading/CharacterClassAssetLoader";
import { Store } from "../../core/stores/Store";
import { LogManager } from "../../core/Logger";
import { ListProperty } from "../../core/observable/property/list/ListProperty";
import { parse_afs } from "../../core/data_formats/parsing/afs";
import { random_array_element, random_integer } from "../../core/util";
import { SectionIds } from "../../core/model";

const logger = LogManager.get("viewer/stores/ModelStore");

export type NjData = {
    nj_object: NjObject;
    bone_count: number;
    has_skeleton: boolean;
};

export class Model3DStore extends Store {
    private readonly _current_model: WritableProperty<CharacterClassModel | undefined> = property(
        undefined,
    );
    private readonly _current_nj_data = property<NjData | undefined>(undefined);
    private readonly _current_textures = list_property<XvrTexture | undefined>();
    private readonly _show_skeleton: WritableProperty<boolean> = property(false);
    private readonly _current_animation: WritableProperty<
        CharacterClassAnimationModel | undefined
    > = property(undefined);
    private readonly _current_nj_motion = property<NjMotion | undefined>(undefined);
    private readonly _animation_playing: WritableProperty<boolean> = property(true);
    private readonly _animation_frame_rate: WritableProperty<number> = property(PSO_FRAME_RATE);
    private readonly _animation_frame: WritableProperty<number> = property(0);

    readonly models: readonly CharacterClassModel[] = [
        HUMAR,
        HUNEWEARL,
        HUCAST,
        HUCASEAL,
        RAMAR,
        RAMARL,
        RACAST,
        RACASEAL,
        FOMAR,
        FOMARL,
        FONEWM,
        FONEWEARL,
    ];

    readonly animations: readonly CharacterClassAnimationModel[] = new Array(572)
        .fill(undefined)
        .map((_, i) => new CharacterClassAnimationModel(i, `Animation ${i + 1}`));

    readonly current_model: Property<CharacterClassModel | undefined> = this._current_model;
    readonly current_nj_data: Property<NjData | undefined> = this._current_nj_data;
    readonly current_textures: ListProperty<XvrTexture | undefined> = this._current_textures;
    readonly show_skeleton: Property<boolean> = this._show_skeleton;
    readonly current_animation: Property<CharacterClassAnimationModel | undefined> = this
        ._current_animation;
    readonly current_nj_motion: Property<NjMotion | undefined> = this._current_nj_motion;
    readonly animation_playing: Property<boolean> = this._animation_playing;
    readonly animation_frame_rate: Property<number> = this._animation_frame_rate;
    readonly animation_frame: Property<number> = this._animation_frame;
    readonly animation_frame_count: Property<number> = this.current_nj_motion.map(njm =>
        njm ? njm.frame_count : 0,
    );

    constructor(private readonly asset_loader: CharacterClassAssetLoader) {
        super();

        this.disposables(
            this.current_model.observe(({ value }) => this.load_model(value)),
            this.current_animation.observe(({ value }) => this.load_animation(value)),
        );

        this.set_current_model(random_array_element(this.models));
    }

    set_current_model = (current_model?: CharacterClassModel): void => {
        this._current_model.val = current_model;
    };

    set_show_skeleton = (show_skeleton: boolean): void => {
        this._show_skeleton.val = show_skeleton;
    };

    set_current_animation = (animation?: CharacterClassAnimationModel): void => {
        this._current_animation.val = animation;
    };

    set_animation_playing = (playing: boolean): void => {
        this._animation_playing.val = playing;
    };

    set_animation_frame_rate = (frame_rate: number): void => {
        this._animation_frame_rate.val = frame_rate;
    };

    set_animation_frame = (frame: number): void => {
        this._animation_frame.val = frame;
    };

    // TODO: notify user of problems.
    load_file = async (file: File): Promise<void> => {
        try {
            const buffer = await read_file(file);
            const cursor = new ArrayBufferCursor(buffer, Endianness.Little);

            if (file.name.endsWith(".nj")) {
                this.set_current_model(undefined);
                this._current_textures.clear();

                const nj_object = parse_nj(cursor)[0];

                this.set_current_nj_data({
                    nj_object,
                    bone_count: nj_object.bone_count(),
                    has_skeleton: true,
                });
            } else if (file.name.endsWith(".xj")) {
                this.set_current_model(undefined);
                this._current_textures.clear();

                const nj_object = parse_xj(cursor)[0];

                this.set_current_nj_data({
                    nj_object,
                    bone_count: 0,
                    has_skeleton: false,
                });
            } else if (file.name.endsWith(".njm")) {
                this.set_current_animation(undefined);
                this._current_nj_motion.val = undefined;

                const nj_data = this.current_nj_data.val;

                if (nj_data) {
                    this.set_animation_playing(true);
                    this._current_nj_motion.val = parse_njm(cursor, nj_data.bone_count);
                }
            } else if (file.name.endsWith(".xvm")) {
                this._current_textures.val = parse_xvm(cursor).textures;
            } else if (file.name.endsWith(".afs")) {
                const files = parse_afs(cursor);
                const textures: XvrTexture[] = [];

                for (const file of files) {
                    textures.push(
                        ...parse_xvm(new ArrayBufferCursor(file, Endianness.Little)).textures,
                    );
                }

                this._current_textures.val = textures;
            } else {
                logger.error(`Unknown file extension in filename "${file.name}".`);
            }
        } catch (e) {
            logger.error("Couldn't read file.", e);
        }
    };

    private load_model = async (model?: CharacterClassModel): Promise<void> => {
        this.set_current_animation(undefined);

        if (model) {
            try {
                this.set_current_nj_data(undefined);

                const nj_object = await this.asset_loader.load_geometry(model);

                this._current_textures.val = await this.asset_loader.load_textures(
                    model,
                    random_array_element(SectionIds),
                    random_integer(0, model.body_style_count),
                );

                this.set_current_nj_data({
                    nj_object,
                    // Ignore the bones from the head parts.
                    bone_count: model ? 64 : nj_object.bone_count(),
                    has_skeleton: true,
                });
            } catch (e) {
                logger.error(`Couldn't load model for ${model.name}.`);
                this._current_nj_data.val = undefined;
            }
        } else {
            this._current_nj_data.val = undefined;
        }
    };

    private set_current_nj_data(nj_data?: NjData): void {
        this._current_nj_data.val = nj_data;
    }

    private load_animation = async (animation?: CharacterClassAnimationModel): Promise<void> => {
        const nj_data = this.current_nj_data.val;

        if (nj_data && animation) {
            try {
                this._current_nj_motion.val = await this.asset_loader.load_animation(
                    animation.id,
                    nj_data.bone_count,
                );
                this.set_animation_playing(true);
            } catch (e) {
                logger.error(`Couldn't load animation "${animation.name}".`);
                this._current_nj_motion.val = undefined;
            }
        } else {
            this._current_nj_motion.val = undefined;
        }
    };
}
