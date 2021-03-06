import { REGISTER_COUNT } from "../scripting/vm/VirtualMachine";
import { TextInput } from "../../core/gui/TextInput";
import { ToolBar } from "../../core/gui/ToolBar";
import { CheckBox } from "../../core/gui/CheckBox";
import { number_to_hex_string } from "../../core/util";
import "./RegistersView.css";
import { Select } from "../../core/gui/Select";
import { QuestRunner } from "../QuestRunner";
import { div } from "../../core/gui/dom";
import { ResizableView } from "../../core/gui/ResizableView";

enum RegisterDisplayType {
    Signed,
    Unsigned,
    Word,
    Byte,
    Float,
}

type RegisterGetterFunction = (register: number) => number;

export class RegistersView extends ResizableView {
    private readonly type_select = this.add(
        new Select({
            label: "Display type:",
            tooltip: "Select which data type register values should be displayed as.",
            items: [
                RegisterDisplayType.Signed,
                RegisterDisplayType.Unsigned,
                RegisterDisplayType.Word,
                RegisterDisplayType.Byte,
                RegisterDisplayType.Float,
            ],
            to_label: type => RegisterDisplayType[type],
        }),
    );
    private register_getter: RegisterGetterFunction = this.get_register_getter(
        RegisterDisplayType.Signed,
    );

    private readonly hex_checkbox = this.add(
        new CheckBox(false, {
            label: "Hex",
            tooltip: "Display register values in hexadecimal.",
        }),
    );

    private readonly settings_bar = this.add(new ToolBar(this.type_select, this.hex_checkbox));

    private readonly register_els: TextInput[];
    private readonly list_element = div({ className: "quest_editor_RegistersView_list" });
    private readonly container_element = div(
        { className: "quest_editor_RegistersView_container" },
        this.list_element,
    );

    readonly element = div(
        { className: "quest_editor_RegistersView" },
        this.settings_bar.element,
        this.container_element,
    );

    constructor(private readonly quest_runner: QuestRunner) {
        super();

        this.type_select.selected.val = RegisterDisplayType.Signed;

        // create register elements
        const register_els: TextInput[] = Array(REGISTER_COUNT);
        for (let i = 0; i < REGISTER_COUNT; i++) {
            const value_el = this.add(
                new TextInput("", {
                    class: "quest_editor_RegistersView_value",
                    label: `r${i}:`,
                    readonly: true,
                }),
            );

            const wrapper_el = div(
                { className: "quest_editor_RegistersView_register" },
                value_el.label!.element,
                value_el.element,
            );

            register_els[i] = value_el;

            this.list_element.appendChild(wrapper_el);
        }
        this.register_els = register_els;

        // predicate that indicates whether to display
        // placeholder text or the actual register values
        const should_use_placeholders = (): boolean =>
            !this.quest_runner.paused.val || !this.quest_runner.running.val;

        // set initial values
        this.update(should_use_placeholders(), this.hex_checkbox.checked.val);

        this.disposables(
            // check if values need to be updated
            // when QuestRunner execution state changes
            this.quest_runner.running.observe(() =>
                this.update(should_use_placeholders(), this.hex_checkbox.checked.val),
            ),
            this.quest_runner.paused.observe(() =>
                this.update(should_use_placeholders(), this.hex_checkbox.checked.val),
            ),

            this.type_select.selected.observe(({ value }) => {
                if (value != undefined) {
                    this.register_getter = this.get_register_getter(value);
                    this.update(should_use_placeholders(), this.hex_checkbox.checked.val);
                }
            }),

            this.hex_checkbox.checked.observe(change =>
                this.update(should_use_placeholders(), change.value),
            ),
        );

        this.finalize_construction();
    }

    private get_register_getter(type: RegisterDisplayType): RegisterGetterFunction {
        let getter: RegisterGetterFunction;

        switch (type) {
            case RegisterDisplayType.Signed:
                getter = this.quest_runner.vm.get_register_signed;
                break;
            case RegisterDisplayType.Unsigned:
                getter = this.quest_runner.vm.get_register_unsigned;
                break;
            case RegisterDisplayType.Word:
                getter = this.quest_runner.vm.get_register_word;
                break;
            case RegisterDisplayType.Byte:
                getter = this.quest_runner.vm.get_register_byte;
                break;
            case RegisterDisplayType.Float:
                getter = this.quest_runner.vm.get_register_float;
                break;
        }

        return getter.bind(this.quest_runner.vm);
    }

    private update(use_placeholders: boolean, use_hex: boolean): void {
        if (use_placeholders) {
            const placeholder_text = "??";
            for (let i = 0; i < REGISTER_COUNT; i++) {
                const reg_el = this.register_els[i];

                reg_el.value.set_val(placeholder_text, { silent: true });
            }
        } else if (use_hex) {
            for (let i = 0; i < REGISTER_COUNT; i++) {
                const reg_el = this.register_els[i];
                const reg_val = this.quest_runner.vm.get_register_unsigned(i);

                reg_el.value.set_val(number_to_hex_string(reg_val), { silent: true });
            }
        } else {
            for (let i = 0; i < REGISTER_COUNT; i++) {
                const reg_el = this.register_els[i];
                const reg_val = this.register_getter(i);

                reg_el.value.set_val(reg_val.toString(), { silent: true });
            }
        }
    }
}
