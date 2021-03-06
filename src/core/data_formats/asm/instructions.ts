import { Kind, Opcode } from "./opcodes";
import { array_buffers_equal, arrays_equal } from "../../util";
import { BinFormat } from "../parsing/quest/BinFormat";

/**
 * Instruction invocation.
 */
export type Instruction = {
    readonly opcode: Opcode;
    readonly args: readonly Arg[];
    /**
     * Maps each parameter by index to its arguments.
     */
    readonly param_to_args: readonly Arg[][];
    readonly asm?: InstructionAsm;
};

export function new_instruction(opcode: Opcode, args: Arg[], asm?: InstructionAsm): Instruction {
    const len = Math.min(opcode.params.length, args.length);
    const param_to_args: Arg[][] = [];

    for (let i = 0; i < len; i++) {
        const type = opcode.params[i].type;
        const arg = args[i];
        param_to_args[i] = [];

        switch (type.kind) {
            case Kind.ILabelVar:
            case Kind.RegRefVar:
                for (let j = i; j < args.length; j++) {
                    param_to_args[i].push(args[j]);
                }

                break;
            default:
                param_to_args[i].push(arg);
                break;
        }
    }

    return {
        opcode,
        args,
        param_to_args,
        asm,
    };
}

/**
 * @returns The byte size of the entire instruction, i.e. the sum of the opcode size and all
 * argument sizes.
 */
export function instruction_size(instruction: Instruction, format: BinFormat): number {
    const opcode = instruction.opcode;
    const p_len = Math.min(opcode.params.length, instruction.param_to_args.length);
    let arg_size = 0;

    for (let i = 0; i < p_len; i++) {
        const type = opcode.params[i].type;
        const args = instruction.param_to_args[i];

        switch (type.kind) {
            case Kind.Byte:
            case Kind.RegRef:
            case Kind.RegTupRef:
                arg_size++;
                break;
            case Kind.Word:
            case Kind.Label:
            case Kind.ILabel:
            case Kind.DLabel:
            case Kind.SLabel:
                arg_size += 2;
                break;
            case Kind.DWord:
            case Kind.Float:
                arg_size += 4;
                break;
            case Kind.String:
                if (format == BinFormat.DC_GC) {
                    arg_size += (args[0].value as string).length + 1;
                } else {
                    arg_size += 2 * (args[0].value as string).length + 2;
                }
                break;
            case Kind.ILabelVar:
                arg_size += 1 + 2 * args.length;
                break;
            case Kind.RegRefVar:
                arg_size += 1 + args.length;
                break;
            default:
                throw new Error(`Parameter type ${Kind[type.kind]} not implemented.`);
        }
    }

    return opcode.size + arg_size;
}

function instructions_equal(a: Instruction, b: Instruction): boolean {
    return a.opcode.code === b.opcode.code && arrays_equal(a.args, b.args, args_equal);
}

export function clone_instruction(instr: Instruction): Instruction {
    return {
        opcode: instr.opcode,
        args: instr.args.map(arg => ({ ...arg })),
        param_to_args: instr.param_to_args.map(args => args.map(arg => ({ ...arg }))),
        asm: instr.asm,
    };
}

/**
 * Instruction argument.
 */
export type Arg = {
    readonly value: any;
};

export function new_arg(value: any): Arg {
    return { value };
}

function args_equal(a: Arg, b: Arg): boolean {
    return a.value === b.value;
}

/**
 * Position and length of related assembly code.
 */
export type AsmToken = {
    readonly line_no: number;
    readonly col: number;
    readonly len: number;
};

/**
 * Information about the related assembly code.
 */
export type InstructionAsm = {
    readonly mnemonic?: AsmToken;
    readonly args: AsmToken[];
    readonly stack_args: (AsmToken & { readonly value: number })[];
};

export enum SegmentType {
    Instructions,
    Data,
    String,
}

/**
 * Segment of object code. A segment starts with an instruction, byte or string character that is
 * referenced by one or more labels. The segment ends right before the next instruction, byte or
 * string character that is referenced by a label.
 */
export type Segment = InstructionSegment | DataSegment | StringSegment;

export type InstructionSegment = {
    type: SegmentType.Instructions;
    labels: number[];
    instructions: Instruction[];
    asm: {
        labels: AsmToken[];
    };
};

export type DataSegment = {
    type: SegmentType.Data;
    labels: number[];
    data: ArrayBuffer;
    asm: {
        labels: AsmToken[];
    };
};

export type StringSegment = {
    type: SegmentType.String;
    labels: number[];
    value: string;
    asm: {
        labels: AsmToken[];
    };
};

function segments_equal(a: Segment, b: Segment): boolean {
    if (a.type !== b.type || !arrays_equal(a.labels, b.labels)) return false;

    switch (a.type) {
        case SegmentType.Instructions:
            return arrays_equal(
                a.instructions,
                (b as InstructionSegment).instructions,
                instructions_equal,
            );

        case SegmentType.Data:
            return array_buffers_equal(a.data, (b as DataSegment).data);

        case SegmentType.String:
            return a.value === (b as StringSegment).value;
    }
}

export function segment_arrays_equal(a: readonly Segment[], b: readonly Segment[]): boolean {
    return arrays_equal(a, b, segments_equal);
}

export function clone_segment(seg: Segment): Segment {
    const labels = seg.labels.slice();
    const asm = {
        labels: seg.asm.labels.map(label => ({ ...label })),
    };

    switch (seg.type) {
        case SegmentType.Instructions:
            return {
                type: SegmentType.Instructions,
                labels,
                instructions: seg.instructions.map(instr => clone_instruction(instr)),
                asm,
            };
        case SegmentType.Data:
            return {
                type: SegmentType.Data,
                labels,
                data: seg.data.slice(0),
                asm,
            };
        case SegmentType.String:
            return {
                type: SegmentType.String,
                labels,
                value: seg.value,
                asm,
            };
    }
}
