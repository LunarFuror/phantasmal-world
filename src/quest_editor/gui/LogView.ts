import { bind_children_to, el } from "../../core/gui/dom";
import { ResizableWidget } from "../../core/gui/ResizableWidget";
import { ToolBar } from "../../core/gui/ToolBar";
import "./LogView.css";
import { log_store, LogLevel, LogLevels, LogMessage } from "../stores/LogStore";
import { Select } from "../../core/gui/Select";

const AUTOSCROLL_TRESHOLD = 5;

export class LogView extends ResizableWidget {
    readonly element = el.div({ class: "quest_editor_LogView", tab_index: -1 });

    // container is needed to get a scrollbar in the right place
    private readonly list_container: HTMLElement;
    private readonly list_element: HTMLElement;

    private readonly level_filter: Select<LogLevel>;
    private readonly settings_bar: ToolBar;

    private should_scroll_to_bottom = true;

    constructor() {
        super();

        this.list_container = el.div({ class: "quest_editor_LogView_list_container" });
        this.list_element = el.div({ class: "quest_editor_LogView_message_list" });

        this.level_filter = this.disposable(
            new Select(LogLevels, level => LogLevel[level], {
                class: "quest_editor_LogView_level_filter",
                label: "Level:",
            }),
        );

        this.settings_bar = this.disposable(
            new ToolBar({
                class: "quest_editor_LogView_settings",
                children: [this.level_filter],
            }),
        );

        this.list_container.addEventListener("scroll", this.scrolled);

        this.disposables(
            bind_children_to(
                this.list_element,
                log_store.log_messages,
                this.create_message_element,
                { after: this.scroll_to_bottom },
            ),

            this.level_filter.selected.observe(
                ({ value }) => value != undefined && log_store.set_log_level(value),
            ),

            log_store.log_level.observe(
                ({ value }) => {
                    this.level_filter.selected.val = value;
                },
                { call_now: true },
            ),
        );

        this.list_container.appendChild(this.list_element);
        this.element.appendChild(this.settings_bar.element);
        this.element.appendChild(this.list_container);

        this.finalize_construction();
    }

    private scrolled = (): void => {
        this.should_scroll_to_bottom =
            this.list_container.scrollTop >=
            this.list_container.scrollHeight -
                this.list_container.offsetHeight -
                AUTOSCROLL_TRESHOLD;
    };

    private scroll_to_bottom = (): void => {
        if (this.should_scroll_to_bottom) {
            this.list_container.scrollTo({
                top: this.list_container.scrollHeight,
                left: 0,
                behavior: "auto",
            });
        }
    };

    private create_message_element = (msg: LogMessage): HTMLElement => {
        return el.div(
            {
                class: [
                    "quest_editor_LogView_message",
                    "quest_editor_LogView_" + LogLevel[msg.level] + "_message",
                ].join(" "),
            },
            el.div({
                class: "quest_editor_LogView_message_timestamp",
                text: msg.time.toTimeString().slice(0, 8),
            }),
            el.div({
                class: "quest_editor_LogView_message_level",
                text: "[" + LogLevel[msg.level] + "]",
            }),
            el.div({
                class: "quest_editor_LogView_message_contents",
                text: msg.message,
            }),
        );
    };
}
