import { Kind, StackInteraction } from "../../../core/data_formats/asm/opcodes";
import { VirtualMachineIO } from "./io";
import { Memory } from "./Memory";
import { Endianness } from "../../../core/data_formats/Endianness";
import { InstructionPointer } from "./InstructionPointer";

const ARG_STACK_SLOT_SIZE = 4;
const ARG_STACK_LENGTH = 8;

type ArgStackTypeList = [Kind, Kind, Kind, Kind, Kind, Kind, Kind, Kind];

export enum StepMode {
    BreakPoint,
    Over,
    In,
    Out,
}

export class StackFrame {
    constructor(public idx: number, public instruction_pointer: InstructionPointer) {}
}

export class Thread {
    private static next_id = 0;

    private readonly _call_stack: StackFrame[];
    private arg_stack = new Memory(ARG_STACK_LENGTH * ARG_STACK_SLOT_SIZE, Endianness.Little);
    private arg_stack_counter: number = 0;
    private arg_stack_types: ArgStackTypeList = Array(ARG_STACK_LENGTH).fill(
        Kind.Any,
    ) as ArgStackTypeList;
    private _step_mode: StepMode = StepMode.BreakPoint;
    private _step_frame?: StackFrame;

    /**
     * Unique thread ID.
     */
    readonly id = Thread.next_id++;

    /**
     * Call stack. The top frame contains a pointer to the instruction about to be executed.
     */
    readonly call_stack: readonly Readonly<StackFrame>[];

    readonly variable_stack: number[] = [];

    /**
     * Floor-local threads have an area_id.
     */
    readonly area_id?: number;

    get step_mode(): StepMode {
        return this._step_mode;
    }

    set step_mode(step_mode: StepMode) {
        this._step_mode = step_mode;
        this._step_frame = this.current_stack_frame();
    }

    /**
     * The frame from which the current {@link StepMode} was entered.
     */
    get step_frame(): StackFrame | undefined {
        return this._step_frame;
    }

    constructor(public io: VirtualMachineIO, entry_point: InstructionPointer, area_id?: number) {
        this._call_stack = [new StackFrame(0, entry_point)];
        this.call_stack = this._call_stack;
        this.area_id = area_id;
    }

    /**
     * @returns undefined when the thread has been terminated.
     */
    current_stack_frame(): StackFrame | undefined {
        return this._call_stack[this._call_stack.length - 1];
    }

    set_current_instruction_pointer(instruction_pointer: InstructionPointer): void {
        if (this._call_stack.length) {
            this._call_stack[this._call_stack.length - 1].instruction_pointer = instruction_pointer;
        } else {
            this.push_frame(instruction_pointer);
        }
    }

    push_frame(instruction_pointer: InstructionPointer): void {
        this._call_stack.push(new StackFrame(this.call_stack.length, instruction_pointer));
    }

    pop_call_stack(): void {
        this._call_stack.pop();
    }

    push_arg(data: number, type: Kind): void {
        if (this.arg_stack_counter >= ARG_STACK_LENGTH) {
            throw new Error("Argument stack: Stack overflow");
        }

        this.arg_stack.write_u32_at(this.arg_stack_counter * ARG_STACK_SLOT_SIZE, data);
        this.arg_stack_types[this.arg_stack_counter] = type;

        this.arg_stack_counter++;
    }

    fetch_args(inst_ptr: InstructionPointer): number[] {
        const inst = inst_ptr.instruction;
        if (inst.opcode.stack !== StackInteraction.Pop) return [];

        const args: number[] = [];

        if (inst.opcode.params.length !== this.arg_stack_counter) {
            this.io.warning("Argument stack: Argument count mismatch.", inst_ptr);
        }

        for (let i = 0; i < inst.opcode.params.length; i++) {
            const param = inst.opcode.params[i];

            this.check_arg_type(param.type.kind, this.arg_stack_types[i], inst_ptr);

            const arg_slot_offset = i * ARG_STACK_SLOT_SIZE;
            switch (param.type.kind) {
                case Kind.Byte:
                    args.push(this.arg_stack.u8_at(arg_slot_offset));
                    break;
                case Kind.Word:
                case Kind.ILabel:
                case Kind.DLabel:
                case Kind.SLabel:
                    args.push(this.arg_stack.u16_at(arg_slot_offset));
                    break;
                case Kind.DWord:
                case Kind.String:
                    args.push(this.arg_stack.u32_at(arg_slot_offset));
                    break;
                case Kind.RegTupRef:
                    if (param.type.register_tuples.length > 0) {
                        args.push(this.arg_stack.u8_at(arg_slot_offset));
                    }
                    break;
                default:
                    throw new Error(
                        `Argument stack: Unhandled parameter kind: ${Kind[param.type.kind]}.`,
                    );
            }
        }

        this.arg_stack_counter = 0;

        return args;
    }

    private check_arg_type(
        param_kind: Kind,
        stack_kind: Kind,
        inst_ptr?: InstructionPointer,
    ): void {
        let match: boolean;

        switch (param_kind) {
            case Kind.Any:
                match = true;
                break;
            case Kind.Byte:
            case Kind.Word:
            case Kind.DWord:
            case Kind.Float:
            case Kind.String:
            case Kind.Pointer:
                match = stack_kind === param_kind;
                break;
            case Kind.Label:
            case Kind.ILabel:
            case Kind.ILabelVar:
            case Kind.DLabel:
            case Kind.SLabel:
                match = stack_kind === Kind.Word;
                break;
            case Kind.RegRef:
            case Kind.RegTupRef:
            case Kind.RegRefVar:
                match = stack_kind === Kind.Byte;
                break;
        }

        if (!match) {
            this.io.warning(
                `Argument stack: Argument type mismatch, expected ${Kind[param_kind]} but received ${Kind[stack_kind]}.`,
                inst_ptr,
            );
        }
    }
}
