import { ResizableWidget } from "./ResizableWidget";
import { Widget } from "./Widget";
import { div, h1, li, section, ul } from "./dom";
import { Problem } from "../Result";
import { Button } from "./Button";
import { Disposable } from "../observable/Disposable";
import "./ProblemsPopup.css";

const POPUP_WIDTH = 500;
const POPUP_HEIGHT = 500;

export class ProblemsPopup extends ResizableWidget {
    private x = 0;
    private y = 0;
    private prev_mouse_x = 0;
    private prev_mouse_y = 0;

    readonly element: HTMLElement;
    readonly children: readonly Widget[] = [];
    readonly dismiss_button = this.disposable(new Button({ text: "Dismiss" }));

    constructor(description: string, problems: readonly Problem[] = []) {
        super();

        let header_element: HTMLElement;

        this.element = section(
            { className: "core_ProblemsPopup", tabIndex: 0 },
            (header_element = h1("Problems")),
            div({ className: "core_ProblemsPopup_description" }, description),
            div(
                { className: "core_ProblemsPopup_body" },
                ul(...problems.map(problem => li(problem.ui_message))),
            ),
            div({ className: "core_ProblemsPopup_footer" }, this.dismiss_button.element),
        );

        this.element.style.width = `${POPUP_WIDTH}px`;
        this.element.style.maxHeight = `${POPUP_HEIGHT}px`;

        this.set_position(
            (window.innerWidth - POPUP_WIDTH) / 2,
            (window.innerHeight - POPUP_HEIGHT) / 2,
        );

        this.element.addEventListener("keydown", this.keydown);
        header_element.addEventListener("mousedown", this.mousedown);

        this.finalize_construction();
    }

    set_position(x: number, y: number): void {
        this.x = x;
        this.y = y;
        this.element.style.transform = `translate(${Math.floor(x)}px, ${Math.floor(y)}px)`;
    }

    private mousedown = (evt: MouseEvent): void => {
        this.prev_mouse_x = evt.clientX;
        this.prev_mouse_y = evt.clientY;
        window.addEventListener("mousemove", this.window_mousemove);
        window.addEventListener("mouseup", this.window_mouseup);
    };

    private window_mousemove = (evt: MouseEvent): void => {
        evt.preventDefault();
        this.set_position(
            this.x + evt.clientX - this.prev_mouse_x,
            this.y + evt.clientY - this.prev_mouse_y,
        );
        this.prev_mouse_x = evt.clientX;
        this.prev_mouse_y = evt.clientY;
    };

    private window_mouseup = (evt: MouseEvent): void => {
        evt.preventDefault();
        window.removeEventListener("mousemove", this.window_mousemove);
        window.removeEventListener("mouseup", this.window_mouseup);
    };

    private keydown = (evt: KeyboardEvent): void => {
        if (evt.key === "Escape") {
            this.dispose();
        }
    };
}

export function show_problems_popup(
    description: string,
    problems?: readonly Problem[],
): Disposable {
    const popup = new ProblemsPopup(description, problems);
    const onclick = popup.dismiss_button.onclick.observe(() => popup.dispose());
    document.body.append(popup.element);
    popup.focus();

    return {
        dispose() {
            onclick.dispose();
            popup.dispose();
        },
    };
}
