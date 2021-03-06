import { disposable_listener, div } from "./dom";
import { Widget } from "./Widget";
import { is_property, Property } from "../observable/property/Property";
import { property } from "../observable";
import { WritableProperty } from "../observable/property/WritableProperty";
import { WidgetProperty } from "../observable/property/WidgetProperty";
import "./Menu.css";

export type MenuOptions<T> = {
    readonly items: readonly T[] | Property<readonly T[]>;
    readonly to_label?: (item: T) => string;
    readonly related_element: HTMLElement;
};

export class Menu<T> extends Widget {
    readonly element = div({ className: "core_Menu", tabIndex: -1 });
    readonly children: readonly Widget[] = [];
    readonly selected: WritableProperty<T | undefined>;

    private readonly to_label: (item: T) => string;
    private readonly items: Property<readonly T[]>;
    private readonly inner_element = div({ className: "core_Menu_inner" });
    private readonly related_element: HTMLElement;
    private readonly _selected: WidgetProperty<T | undefined>;
    private hovered_index?: number;
    private hovered_element?: HTMLElement;
    private previously_focused_element?: Element;

    constructor(options: MenuOptions<T>) {
        super();

        this.visible.val = false;

        this.element.onmouseup = this.mouseup;
        this.element.onkeydown = this.keydown;
        this.element.onblur = this.blur;

        this.inner_element.onmouseover = this.inner_mouseover;
        this.element.append(this.inner_element);

        this.to_label = options.to_label ?? (item => String(item));
        this.items = is_property(options.items) ? options.items : property(options.items);
        this.related_element = options.related_element;

        this._selected = new WidgetProperty<T | undefined>(this, undefined, this.set_selected);
        this.selected = this._selected;

        this.disposables(
            this.items.observe(
                ({ value: items }) => {
                    this.inner_element.innerHTML = "";
                    this.inner_element.append(
                        ...items.map((item, index) =>
                            div({ data: { index: index.toString() } }, this.to_label(item)),
                        ),
                    );
                    this.hover_item();
                },
                { call_now: true },
            ),

            disposable_listener(document, "mousedown", this.document_mousedown, {
                capture: true,
            }),

            disposable_listener(document, "keydown", this.document_keydown),
        );

        this.finalize_construction();
    }

    focus(): void {
        this.previously_focused_element = document.activeElement ?? undefined;
        this.element.focus();
    }

    hover_next(): void {
        this.visible.set_val(true, { silent: false });
        this.hover_item(
            this.hovered_index != undefined ? (this.hovered_index + 1) % this.items.val.length : 0,
        );
    }

    hover_prev(): void {
        this.visible.set_val(true, { silent: false });
        this.hover_item(this.hovered_index ? this.hovered_index - 1 : this.items.val.length - 1);
    }

    select_hovered(): void {
        if (this.hovered_index != undefined) {
            this.select_item(this.hovered_index);
        }
    }

    protected set_visible(visible: boolean): void {
        super.set_visible(visible);

        if (this.visible.val != visible) {
            this.hover_item();
            this.inner_element.scrollTop = 0;

            if (!visible && this.previously_focused_element instanceof HTMLElement) {
                this.previously_focused_element.focus();
            }
        }
    }

    protected set_selected(): void {
        // Noop
    }

    private mouseup = (e: Event): void => {
        if (!(e.target instanceof HTMLElement)) return;

        const index_str = e.target.dataset.index;
        if (index_str == undefined) return;

        this.select_item(parseInt(index_str, 10));
    };

    private keydown = (evt: Event): void => {
        const key = (evt as KeyboardEvent).key;

        switch (key) {
            case "ArrowDown":
                evt.preventDefault();
                this.hover_next();
                break;

            case "ArrowUp":
                evt.preventDefault();
                this.hover_prev();
                break;

            case "Enter":
                evt.preventDefault();
                evt.stopPropagation();
                this.select_hovered();
                break;
        }
    };

    private blur = (): void => {
        this.visible.val = false;
    };

    private inner_mouseover = (e: Event): void => {
        if (e.target && e.target instanceof HTMLElement) {
            const index = e.target.dataset.index;

            if (index != undefined) {
                this.hover_item(parseInt(index, 10));
            }
        }
    };

    private document_mousedown = (e: Event): void => {
        if (
            this.visible.val &&
            !this.element.contains(e.target as Node) &&
            !this.related_element.contains(e.target as Node)
        ) {
            this.visible.set_val(false, { silent: false });
        }
    };

    private document_keydown = (e: Event): void => {
        if ((e as KeyboardEvent).key === "Escape") {
            this.visible.set_val(false, { silent: false });
        }
    };

    private hover_item(index?: number): void {
        if (this.hovered_element) {
            this.hovered_element.classList.remove("core_Menu_hovered");
        }

        if (index == undefined) {
            this.hovered_index = undefined;
            this.hovered_element = undefined;
        } else {
            this.hovered_element = this.inner_element.children.item(index) as HTMLElement;

            if (this.hovered_element) {
                this.hovered_index = index;
                this.hovered_element.classList.add("core_Menu_hovered");
                this.hovered_element.scrollIntoView({ block: "nearest" });
            }
        }
    }

    private select_item(index: number): void {
        const item = this.items.val[index];
        if (item === undefined) return;

        this.selected.set_val(item, { silent: false });
        this.visible.set_val(false, { silent: false });
    }
}
