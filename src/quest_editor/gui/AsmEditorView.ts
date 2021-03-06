import { editor, KeyCode, KeyMod, Range } from "monaco-editor";
import { AsmEditorToolBar } from "./AsmEditorToolBar";
import { EditorHistory } from "./EditorHistory";
import "./AsmEditorView.css";
import { ListChangeType } from "../../core/observable/property/list/ListProperty";
import { GuiStore } from "../../core/stores/GuiStore";
import { AsmEditorStore } from "../stores/AsmEditorStore";
import { QuestRunner } from "../QuestRunner";
import { div } from "../../core/gui/dom";
import { ResizableView } from "../../core/gui/ResizableView";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

editor.defineTheme("phantasmal-world", {
    base: "vs-dark",
    inherit: true,
    rules: [
        { token: "", foreground: "e0e0e0", background: "#181818" },
        { token: "tag", foreground: "99bbff" },
        { token: "keyword", foreground: "d0a0ff", fontStyle: "bold" },
        { token: "predefined", foreground: "bbffbb" },
        { token: "number", foreground: "ffffaa" },
        { token: "number.hex", foreground: "ffffaa" },
        { token: "string", foreground: "88ffff" },
        { token: "string.escape", foreground: "8888ff" },
    ],
    colors: {
        "editor.background": "#181818",
        "editor.lineHighlightBackground": "#202020",
    },
});

const DUMMY_MODEL = editor.createModel("", "psoasm");

export class AsmEditorView extends ResizableView {
    private readonly tool_bar_view: AsmEditorToolBar;
    private readonly editor: IStandaloneCodeEditor;
    private readonly history: EditorHistory;
    private breakpoint_decoration_ids: string[] = [];
    private execloc_decoration_id: string | undefined;
    private old_pause_location?: number;

    readonly element = div();

    constructor(
        gui_store: GuiStore,
        quest_runner: QuestRunner,
        private readonly asm_editor_store: AsmEditorStore,
    ) {
        super();

        this.tool_bar_view = this.add(new AsmEditorToolBar(asm_editor_store));

        this.element.append(this.tool_bar_view.element);

        this.editor = this.disposable(
            editor.create(this.element, {
                theme: "phantasmal-world",
                scrollBeyondLastLine: false,
                autoIndent: "full",
                fontSize: 13,
                wordWrap: "on",
                wrappingIndent: "indent",
                renderIndentGuides: false,
                folding: false,
                glyphMargin: gui_store.feature_active("vm"),
            }),
        );

        this.history = this.disposable(new EditorHistory(this.editor));

        // Commands and actions.
        this.editor.addCommand(KeyMod.CtrlCmd | KeyCode.KEY_Z, () => {
            // Do nothing.
        });

        this.editor.addCommand(KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_Z, () => {
            // Do nothing.
        });

        const quick_command = this.editor.getAction("editor.action.quickCommand");

        this.disposables(
            this.editor.addAction({
                id: "editor.action.quickCommand",
                label: "Command Palette",
                keybindings: [KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_P],
                run: () => quick_command.run(),
            }),
        );

        // Undo/Redo
        this.disposables(
            asm_editor_store.did_undo.observe(({ value: source }) => {
                this.editor.trigger(source, "undo", undefined);
            }),

            asm_editor_store.did_redo.observe(({ value: source }) => {
                this.editor.trigger(source, "redo", undefined);
            }),

            asm_editor_store.model.observe(
                ({ value: model }) => {
                    this.editor.updateOptions({
                        readOnly: !this.enabled.val || !model,
                    });
                    this.editor.setModel(model || DUMMY_MODEL);
                    this.history.reset();

                    this.breakpoint_decoration_ids = [];
                    this.execloc_decoration_id = "";

                    quest_runner.clear_breakpoints();
                },
                { call_now: true },
            ),

            asm_editor_store.breakpoints.observe_list(change => {
                if (change.type === ListChangeType.ListChange) {
                    // remove
                    for (const breakpoint of change.removed) {
                        const cur_decos = this.editor.getLineDecorations(breakpoint.line_no);
                        // find decoration on line
                        if (cur_decos) {
                            for (const deco of cur_decos) {
                                const idx = this.breakpoint_decoration_ids.indexOf(deco.id);

                                if (idx > -1) {
                                    // remove decoration
                                    this.editor.deltaDecorations([deco.id], []);
                                    this.breakpoint_decoration_ids.splice(idx, 1);
                                    break;
                                }
                            }
                        }
                    }

                    // add
                    for (const breakpoint of change.inserted) {
                        const cur_decos = this.editor.getLineDecorations(breakpoint.line_no);
                        // don't allow duplicates
                        if (
                            !cur_decos?.some(deco =>
                                this.breakpoint_decoration_ids.includes(deco.id),
                            )
                        ) {
                            // add new decoration, don't overwrite anything, save decoration id
                            this.breakpoint_decoration_ids.push(
                                this.editor.deltaDecorations(
                                    [],
                                    [
                                        {
                                            range: new Range(
                                                breakpoint.line_no,
                                                0,
                                                breakpoint.line_no,
                                                0,
                                            ),
                                            options: {
                                                glyphMarginClassName:
                                                    "quest_editor_AsmEditorView_breakpoint-enabled",
                                                glyphMarginHoverMessage: {
                                                    value: "Breakpoint",
                                                },
                                            },
                                        },
                                    ],
                                )[0],
                            );
                        }
                    }
                }
            }),

            asm_editor_store.pause_location.observe(e => {
                const old_line_num = this.old_pause_location;
                const new_line_num = e.value;
                this.old_pause_location = new_line_num;

                // remove old
                if (old_line_num !== undefined && this.execloc_decoration_id !== undefined) {
                    const old_line_decos = this.editor.getLineDecorations(old_line_num);

                    if (old_line_decos) {
                        this.editor.deltaDecorations([this.execloc_decoration_id], []);
                    }
                }

                // add new
                if (new_line_num !== undefined) {
                    this.execloc_decoration_id = this.editor.deltaDecorations(
                        [],
                        [
                            {
                                range: new Range(new_line_num, 0, new_line_num, 0),
                                options: {
                                    className: "quest_editor_AsmEditorView_execution-location",
                                    isWholeLine: true,
                                },
                            },
                        ],
                    )[0];

                    this.editor.revealLineInCenterIfOutsideViewport(new_line_num);
                }
            }),

            this.editor.onDidFocusEditorWidget(() => asm_editor_store.undo.make_current()),

            this.editor.onMouseDown(e => {
                switch (e.target.type) {
                    case editor.MouseTargetType.GUTTER_GLYPH_MARGIN:
                        {
                            const pos = e.target.position;
                            if (!pos) {
                                return;
                            }
                            quest_runner.toggle_breakpoint(pos.lineNumber);
                        }
                        break;
                    default:
                        break;
                }
            }),

            this.enabled.bind_to(quest_runner.running.map(r => !r)),
        );

        this.finalize_construction();
    }

    focus(): void {
        this.editor.focus();
    }

    resize(width: number, height: number): this {
        const editor_height = Math.max(0, height - this.tool_bar_view.height);
        this.editor.layout({ width, height: editor_height });
        return this;
    }

    protected set_enabled(enabled: boolean): void {
        super.set_enabled(enabled);

        this.tool_bar_view.enabled.val = enabled;
        this.editor.updateOptions({ readOnly: !enabled || !this.asm_editor_store.model.val });
    }
}
