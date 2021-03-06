import { bind_children_to, div, img, span } from "../../core/gui/dom";
import "./EntityListView.css";
import { entity_data, EntityType } from "../../core/data_formats/parsing/quest/entities";
import { entity_dnd_source } from "./entity_dnd";
import { WritableListProperty } from "../../core/observable/property/list/WritableListProperty";
import { list_property } from "../../core/observable";
import { QuestEditorStore } from "../stores/QuestEditorStore";
import { EntityImageRenderer } from "../rendering/EntityImageRenderer";
import { ResizableView } from "../../core/gui/ResizableView";

export abstract class EntityListView<T extends EntityType> extends ResizableView {
    readonly element: HTMLElement;

    protected readonly entities: WritableListProperty<T> = list_property();

    protected constructor(
        quest_editor_store: QuestEditorStore,
        private readonly entity_image_renderer: EntityImageRenderer,
        class_name: string,
    ) {
        super();

        const list_element = div({ className: "quest_editor_EntityListView_entity_list" });

        this.element = div(
            { className: `${class_name} quest_editor_EntityListView`, tabIndex: -1 },
            list_element,
        );

        this.disposables(
            bind_children_to(list_element, this.entities, this.create_entity_element),

            entity_dnd_source(list_element, target => {
                if (!this.enabled.val) return undefined;

                let element: HTMLElement | null = target;

                do {
                    const index = target.dataset.index;

                    if (index != undefined) {
                        return [
                            element.querySelector("img")!.cloneNode(true) as HTMLElement,
                            this.entities.get(parseInt(index, 10)),
                        ];
                    }

                    element = element.parentElement;
                } while (element && element !== list_element);

                return undefined;
            }),

            this.enabled.bind_to(quest_editor_store.quest_runner.running.map(r => !r)),
        );
    }

    private create_entity_element = (entity: T, index: number): HTMLElement => {
        const entity_element = div({
            className: "quest_editor_EntityListView_entity",
            data: { index: index.toString() },
        });
        entity_element.draggable = true;

        const img_element = img({ width: 100, height: 100 });
        img_element.style.visibility = "hidden";
        // Workaround for Chrome bug: when dragging an image, calling setDragImage on a DragEvent
        // has no effect.
        img_element.style.pointerEvents = "none";
        entity_element.append(img_element);

        this.entity_image_renderer.render(entity).then(url => {
            img_element.src = url;
            img_element.style.visibility = "visible";
        });

        const name_element = span(entity_data(entity).name);
        entity_element.append(name_element);

        return entity_element;
    };
}
