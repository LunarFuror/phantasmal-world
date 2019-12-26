import { icon, Icon, input, label, span } from "./dom";
import "./FileButton.css";
import { property } from "../observable";
import { Property } from "../observable/property/Property";
import { Control, ControlOptions } from "./Control";
import { WritableProperty } from "../observable/property/WritableProperty";

export type FileButtonOptions = ControlOptions & {
    accept?: string;
    icon_left?: Icon;
};

export class FileButton extends Control {
    readonly element = label({
        className: "core_FileButton core_Button",
    });

    readonly files: Property<File[]>;

    private input: HTMLInputElement = input({
        className: "core_FileButton_input core_Button_inner",
    });

    private readonly _files: WritableProperty<File[]> = property<File[]>([]);

    constructor(text: string, options?: FileButtonOptions) {
        super(options);

        this.files = this._files;

        this.input.type = "file";
        this.input.onchange = () => {
            if (this.input.files && this.input.files.length) {
                this._files.val = [...this.input.files!];
            } else {
                this._files.val = [];
            }
        };

        if (options && options.accept) this.input.accept = options.accept;

        const inner_element = span({
            className: "core_FileButton_inner core_Button_inner",
        });

        if (options && options.icon_left != undefined) {
            inner_element.append(
                span(
                    { className: "core_FileButton_left core_Button_left" },
                    icon(options.icon_left),
                ),
            );
        }

        inner_element.append(span({ className: "core_Button_center" }, text));

        this.element.append(inner_element, this.input);

        this.disposables(
            this.enabled.observe(({ value }) => {
                this.input.disabled = !value;

                if (value) {
                    this.element.classList.remove("disabled");
                } else {
                    this.element.classList.add("disabled");
                }
            }),
        );

        this.finalize_construction();
    }

    click(): void {
        this.input.click();
    }
}
