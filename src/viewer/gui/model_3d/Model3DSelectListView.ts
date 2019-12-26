import { ResizableWidget } from "../../../core/gui/ResizableWidget";
import "./Model3DSelectListView.css";
import { Property } from "../../../core/observable/property/Property";
import { li, ul } from "../../../core/gui/dom";

export class Model3DSelectListView<T extends { name: string }> extends ResizableWidget {
    readonly element = ul({ className: "viewer_Model3DSelectListView" });

    set borders(borders: boolean) {
        if (borders) {
            this.element.style.borderLeft = "var(--border)";
            this.element.style.borderRight = "var(--border)";
        } else {
            this.element.style.borderLeft = "none";
            this.element.style.borderRight = "none";
        }
    }

    private selected_model?: T;
    private selected_element?: HTMLLIElement;

    constructor(
        private models: readonly T[],
        private selected: Property<T | undefined>,
        private set_selected: (selected: T) => void,
    ) {
        super();

        this.element.onclick = this.list_click;

        models.forEach((model, index) => {
            this.element.append(li({ data: { index: index.toString() } }, model.name));
        });

        this.disposable(
            selected.observe(({ value: model }) => {
                if (this.selected_element) {
                    this.selected_element.classList.remove("active");
                    this.selected_element = undefined;
                }

                if (model && model !== this.selected_model) {
                    const index = this.models.indexOf(model);

                    if (index !== -1) {
                        this.selected_element = this.element.childNodes[index] as HTMLLIElement;
                        this.selected_element.classList.add("active");
                    }
                }
            }),
        );

        this.finalize_construction();
    }

    private list_click = (e: MouseEvent): void => {
        if (e.target instanceof HTMLLIElement && e.target.dataset["index"]) {
            if (this.selected_element) {
                this.selected_element.classList.remove("active");
            }

            e.target.classList.add("active");

            const index = parseInt(e.target.dataset["index"]!, 10);

            this.selected_element = e.target;
            this.set_selected(this.models[index]);
        }
    };
}
