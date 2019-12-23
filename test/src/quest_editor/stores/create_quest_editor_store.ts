import { QuestEditorStore } from "../../../../src/quest_editor/stores/QuestEditorStore";
import { GuiStore } from "../../../../src/core/stores/GuiStore";
import { AreaStore } from "../../../../src/quest_editor/stores/AreaStore";
import { AreaAssetLoader } from "../../../../src/quest_editor/loading/AreaAssetLoader";
import { FileSystemHttpClient } from "../../core/FileSystemHttpClient";

export function create_quest_editor_store(): QuestEditorStore {
    return new QuestEditorStore(
        new GuiStore(),
        new AreaStore(new AreaAssetLoader(new FileSystemHttpClient())),
    );
}
