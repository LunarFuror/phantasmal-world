import { ResizableWidget } from "../../core/gui/ResizableWidget";
import { el } from "../../core/gui/dom";
import { QuestEventDagModel } from "../model/QuestEventDagModel";
import { Disposer } from "../../core/observable/Disposer";
import { NumberInput } from "../../core/gui/NumberInput";
import "./EventsView.css";
import { Disposable } from "../../core/observable/Disposable";
import { defer } from "lodash";
import {
    ListChangeType,
    ListPropertyChangeEvent,
} from "../../core/observable/property/list/ListProperty";
import { QuestEditorStore } from "../stores/QuestEditorStore";

type DagGuiData = {
    dag: QuestEventDagModel;
    element: HTMLElement;
    edge_container_element: HTMLElement;
    disposer: Disposer;
    /**
     * Maps event IDs to GUI data.
     */
    event_gui_data: Map<number, { element: HTMLDivElement; position: number }>;
};

export class EventsView extends ResizableWidget {
    private readonly dag_gui_data: DagGuiData[] = [];
    private event_dags_observer?: Disposable;

    readonly element = el.div({ class: "quest_editor_EventsView" });

    constructor(private readonly quest_editor_store: QuestEditorStore) {
        super();

        this.element.addEventListener("focus", () => quest_editor_store.undo.make_current(), true);

        this.disposables(
            quest_editor_store.current_quest.observe(this.update),
            quest_editor_store.current_area.observe(this.update),
            this.enabled.bind_to(quest_editor_store.quest_runner.running.map(r => !r)),
        );

        this.finalize_construction();
    }

    resize(width: number, height: number): this {
        super.resize(width, height);
        this.update_edges();
        return this;
    }

    focus(): void {
        super.focus();
        this.update_edges();
    }

    dispose(): void {
        super.dispose();

        if (this.event_dags_observer) {
            this.event_dags_observer.dispose();
        }

        for (const { disposer } of this.dag_gui_data) {
            disposer.dispose();
        }
    }

    private update = (): void => {
        if (this.event_dags_observer) {
            this.event_dags_observer.dispose();
        }

        const quest = this.quest_editor_store.current_quest.val;
        const area = this.quest_editor_store.current_area.val;

        if (quest && area) {
            const event_dags = quest.event_dags.filtered(dag => dag.area_id === area.id);
            this.event_dags_observer = event_dags.observe_list(this.observe_event_dags);
            this.redraw_event_dags(event_dags.val);
        } else {
            this.event_dags_observer = undefined;
            this.redraw_event_dags([]);
        }
    };

    private redraw_event_dags = (event_dags: readonly QuestEventDagModel[]): void => {
        this.element.innerHTML = "";

        for (const removed of this.dag_gui_data.splice(0, this.dag_gui_data.length)) {
            removed.disposer.dispose();
        }

        let index = 0;

        for (const dag of event_dags) {
            const data = this.create_dag_ui_data(dag);
            this.dag_gui_data.splice(index, 0, data);
            this.element.append(data.element);

            index++;
        }

        defer(this.update_edges);
    };

    private observe_event_dags = (change: ListPropertyChangeEvent<QuestEventDagModel>): void => {
        if (change.type === ListChangeType.ListChange) {
            for (const removed of this.dag_gui_data.splice(change.index, change.removed.length)) {
                removed.element.remove();
                removed.disposer.dispose();
            }

            let index = change.index;

            for (const dag of change.inserted) {
                const data = this.create_dag_ui_data(dag);
                this.dag_gui_data.splice(index, 0, data);
                this.element.insertBefore(data.element, this.element.children.item(index));

                index++;
            }

            defer(this.update_edges);
        }
    };

    private create_dag_ui_data = (dag: QuestEventDagModel): DagGuiData => {
        const disposer = new Disposer();
        const event_gui_data = new Map<number, { element: HTMLDivElement; position: number }>();

        const element = el.div({ class: "quest_editor_EventsView_dag" });

        const edge_container_element = el.div({
            class: "quest_editor_EventsView_edge_container",
        });
        element.append(edge_container_element);

        const inputs_enabled = this.quest_editor_store.quest_runner.running.map(r => !r);

        dag.events.forEach((event, i) => {
            const section_id_input = disposer.add(new NumberInput(event.section_id.val));

            const delay_input = disposer.add(new NumberInput(event.delay.val));

            disposer.add_all(
                section_id_input.value.bind_to(event.section_id),
                section_id_input.value.observe(e =>
                    this.quest_editor_store.event_section_id_changed(event, e),
                ),
                section_id_input.enabled.bind_to(inputs_enabled),

                delay_input.value.bind_to(event.delay),
                delay_input.value.observe(e =>
                    this.quest_editor_store.event_delay_changed(event, e),
                ),
                delay_input.enabled.bind_to(inputs_enabled),
            );

            const event_element = el.div(
                { class: "quest_editor_EventsView_event" },
                el.table(
                    el.tr(el.th({ text: "ID:" }), el.td({ text: event.id.toString() })),
                    el.tr(el.th({ text: "Section:" }), el.td(section_id_input.element)),
                    el.tr(el.th({ text: "Wave:" }), el.td({ text: event.wave.toString() })),
                    el.tr(el.th({ text: "Delay:" }), el.td(delay_input.element)),
                ),
            );

            element.append(event_element);
            event_gui_data.set(event.id, { element: event_element, position: i });
        });

        return {
            dag,
            element,
            edge_container_element,
            disposer,
            event_gui_data,
        };
    };

    /**
     * This method does measurements of the event elements. So it should be called after the event
     * elements have been added to the DOM and have been *laid out* by the browser.
     */
    private update_edges = (): void => {
        const SPACING = 8;
        let max_depth = 0;

        for (const { dag, edge_container_element, event_gui_data } of this.dag_gui_data) {
            edge_container_element.innerHTML = "";

            const used_depths: boolean[][] = Array(dag.events.length - 1);

            for (let i = 0; i < used_depths.length; i++) {
                used_depths[i] = [];
            }

            for (const event of dag.events) {
                const { element: event_element, position } = event_gui_data.get(event.id)!;

                const y_offset = event_element.offsetTop + event_element.offsetHeight;

                for (const child of dag.get_children(event)) {
                    const { element: child_element, position: child_position } = event_gui_data.get(
                        child.id,
                    )!;
                    const child_y_offset = child_element.offsetTop;

                    const edge_element = el.div({ class: "quest_editor_EventsView_edge" });

                    const top = Math.min(y_offset, child_y_offset) - 20;
                    const height = Math.max(y_offset, child_y_offset) - top + 20;

                    let depth = 1;
                    const low_pos = Math.min(position, child_position);
                    const high_pos = Math.max(position, child_position);

                    outer: while (true) {
                        for (let i = low_pos; i < high_pos; i++) {
                            if (used_depths[i][depth]) {
                                depth++;
                                continue outer;
                            }
                        }

                        break;
                    }

                    for (let i = low_pos; i < high_pos; i++) {
                        used_depths[i][depth] = true;
                    }

                    max_depth = Math.max(depth, max_depth);

                    const width = SPACING * depth;

                    edge_element.style.left = `${4 - width}px`;
                    edge_element.style.top = `${top}px`;
                    edge_element.style.width = `${width}px`;
                    edge_element.style.height = `${height}px`;

                    edge_container_element.append(edge_element);
                }
            }
        }

        for (const { element } of this.dag_gui_data) {
            element.style.marginLeft = `${SPACING * max_depth}px`;
        }
    };
}
