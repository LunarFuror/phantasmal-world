import { QuestRenderer } from "./QuestRenderer";
import { AreaVariantDetails, Quest3DModelManager } from "./Quest3DModelManager";
import { AreaVariantModel } from "../model/AreaVariantModel";
import { QuestNpcModel } from "../model/QuestNpcModel";
import { QuestObjectModel } from "../model/QuestObjectModel";
import { ListProperty } from "../../core/observable/property/list/ListProperty";
import { list_property } from "../../core/observable";
import { Property } from "../../core/observable/property/Property";
import { QuestModel } from "../model/QuestModel";
import { AreaModel } from "../model/AreaModel";
import { AreaAssetLoader } from "../loading/AreaAssetLoader";
import { EntityAssetLoader } from "../loading/EntityAssetLoader";
import { WaveModel } from "../model/WaveModel";

/**
 * Model loader used while editing a quest.
 */
export class QuestEditor3DModelManager extends Quest3DModelManager {
    constructor(
        private readonly current_quest: Property<QuestModel | undefined>,
        private readonly current_area: Property<AreaModel | undefined>,
        current_wave: Property<WaveModel | undefined>,
        renderer: QuestRenderer,
        area_asset_loader: AreaAssetLoader,
        entity_asset_loader: EntityAssetLoader,
    ) {
        super(current_wave, renderer, area_asset_loader, entity_asset_loader);

        this.disposer.add_all(
            current_quest.observe(this.area_variant_changed),
            current_area.observe(this.area_variant_changed),
        );
    }

    protected get_area_variant_details(): AreaVariantDetails {
        const quest = this.current_quest.val;
        const area = this.current_area.val;

        let area_variant: AreaVariantModel | undefined;
        let npcs: ListProperty<QuestNpcModel>;
        let objects: ListProperty<QuestObjectModel>;

        if (quest && area) {
            area_variant =
                quest.area_variants.val.find(v => v.area.id === area.id) || area.area_variants[0];

            npcs = quest.npcs.filtered(entity => entity.area_id === area.id);
            objects = quest.objects.filtered(entity => entity.area_id === area.id);
        } else {
            npcs = list_property();
            objects = list_property();
        }

        return {
            episode: quest?.episode,
            area_variant,
            npcs,
            objects,
        };
    }
}
