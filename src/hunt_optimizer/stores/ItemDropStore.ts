import { Difficulties, Difficulty, SectionId, SectionIds, Server } from "../../core/model";
import { ServerMap } from "../../core/stores/ServerMap";
import { NpcType } from "../../core/data_formats/parsing/quest/npc_types";
import { EnemyDrop } from "../model/ItemDrop";
import { EnemyDropDto } from "../dto/drops";
import { GuiStore } from "../../core/stores/GuiStore";
import { ItemTypeStore } from "../../core/stores/ItemTypeStore";
import { HttpClient } from "../../core/HttpClient";
import { DisposableServerMap } from "../../core/stores/DisposableServerMap";
import { Store } from "../../core/stores/Store";
import { LogManager } from "../../core/Logger";

const logger = LogManager.get("stores/ItemDropStore");

export function create_item_drop_stores(
    http_client: HttpClient,
    gui_store: GuiStore,
    item_type_stores: ServerMap<ItemTypeStore>,
): DisposableServerMap<ItemDropStore> {
    return new DisposableServerMap(gui_store, create_loader(http_client, item_type_stores));
}

export class ItemDropStore extends Store {
    readonly enemy_drops: EnemyDropTable;

    constructor(enemy_drops: EnemyDropTable) {
        super();
        this.enemy_drops = enemy_drops;
    }
}

export class EnemyDropTable {
    // Mapping of difficulties to section IDs to NpcTypes to EnemyDrops.
    private table: EnemyDrop[][][] = [];

    // Mapping of ItemType ids to EnemyDrops.
    private item_type_to_drops: EnemyDrop[][] = [];

    constructor() {
        for (let i = 0; i < Difficulties.length; i++) {
            const diff_array: EnemyDrop[][] = [];
            this.table.push(diff_array);

            for (let j = 0; j < SectionIds.length; j++) {
                diff_array.push([]);
            }
        }
    }

    get_drop(
        difficulty: Difficulty,
        section_id: SectionId,
        npc_type: NpcType,
    ): EnemyDrop | undefined {
        return this.table[difficulty][section_id][npc_type];
    }

    set_drop(
        difficulty: Difficulty,
        section_id: SectionId,
        npc_type: NpcType,
        drop: EnemyDrop,
    ): void {
        this.table[difficulty][section_id][npc_type] = drop;

        let drops = this.item_type_to_drops[drop.item_type.id];

        if (!drops) {
            drops = [];
            this.item_type_to_drops[drop.item_type.id] = drops;
        }

        drops.push(drop);
    }

    get_drops_for_item_type(item_type_id: number): EnemyDrop[] {
        return this.item_type_to_drops[item_type_id] || [];
    }
}

function create_loader(
    http_client: HttpClient,
    item_type_stores: ServerMap<ItemTypeStore>,
): (server: Server) => Promise<ItemDropStore> {
    return async server => {
        const item_type_store = await item_type_stores.get(server);
        const data: EnemyDropDto[] = await http_client
            .get(`/enemy_drops.${Server[server].toLowerCase()}.json`)
            .json();
        const enemy_drops = new EnemyDropTable();

        for (const drop_dto of data) {
            const npc_type = (NpcType as any)[drop_dto.enemy];

            if (!npc_type) {
                logger.warn(
                    `Couldn't determine NpcType of episode ${drop_dto.episode} ${drop_dto.enemy}.`,
                );
                continue;
            }

            const difficulty = (Difficulty as any)[drop_dto.difficulty];
            const item_type = item_type_store.get_by_id(drop_dto.item_type_id);

            if (!item_type) {
                logger.warn(`Couldn't find item kind ${drop_dto.item_type_id}.`);
                continue;
            }

            const section_id = (SectionId as any)[drop_dto.section_id];

            if (section_id == null) {
                logger.warn(`Couldn't find section ID ${drop_dto.section_id}.`);
                continue;
            }

            enemy_drops.set_drop(
                difficulty,
                section_id,
                npc_type,
                new EnemyDrop(
                    difficulty,
                    section_id,
                    npc_type,
                    item_type,
                    drop_dto.drop_rate,
                    drop_dto.rare_rate,
                ),
            );
        }

        return new ItemDropStore(enemy_drops);
    };
}
