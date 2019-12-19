/**
 * @jest-environment jsdom
 */

import { ExecutionResult, VirtualMachine } from "./VirtualMachine";
import { VMIOStub } from "./VMIOStub";
import { to_instructions } from "../../../../test/src/utils";
import { Segment } from "../instructions";
import { Random } from "./Random";
import { Episode } from "../../../core/data_formats/parsing/quest/Episode";

test("integer arithmetic opcodes", () => {
    class TestIO extends VMIOStub {
        error = jest.fn((err: Error) => {
            throw err;
        });
    }

    const result_reg = 100;
    const vm = new VirtualMachine(new TestIO());

    function compute_arithmetic(obj_code: Segment[]): number {
        vm.load_object_code(obj_code, Episode.I);
        vm.start_thread(0);

        let last_result: ExecutionResult;
        do {
            last_result = vm.execute();
        } while (last_result !== ExecutionResult.Halted);

        return vm.get_register_signed(result_reg);
    }

    function compute_arithmetic_with_register(opcode: string, val1: number, val2: number): number {
        const other_reg = result_reg + 1;

        const obj_code = to_instructions(`
            0:
                leti r${result_reg}, ${val1}
                leti r${other_reg}, ${val2}
                ${opcode} r${result_reg}, r${other_reg}`);

        return compute_arithmetic(obj_code);
    }

    function compute_arithmetic_with_literal(opcode: string, val1: number, val2: number): number {
        const obj_code = to_instructions(`
            0:
                leti r${result_reg}, ${val1}
                ${opcode} r${result_reg}, ${val2}`);

        return compute_arithmetic(obj_code);
    }

    // opcodes that use two register
    expect(compute_arithmetic_with_register("add", 143, 656)).toBe(799);
    expect(compute_arithmetic_with_register("sub", 4390, 11670)).toBe(-7280);
    expect(compute_arithmetic_with_register("mul", 5356, 3)).toBe(16068);
    expect(compute_arithmetic_with_register("div", 131, 130)).toBe(1);
    expect(compute_arithmetic_with_register("mod", 5555555, 2)).toBe(1);

    // opcodes that use one register and one literal
    expect(compute_arithmetic_with_literal("addi", -3000, 5885858)).toBe(5882858);
    expect(compute_arithmetic_with_literal("subi", 1, -1)).toBe(2);
    expect(compute_arithmetic_with_literal("muli", 8008135, 0)).toBe(0);
    expect(compute_arithmetic_with_literal("divi", 500, 100)).toBe(5);
    expect(compute_arithmetic_with_literal("modi", 5959, 6969)).toBe(5959);

    // special cases:
    // integer overflow
    expect(compute_arithmetic_with_register("add", 2147483647, 1)).toBe(-2147483648);
    // under
    expect(compute_arithmetic_with_register("sub", -2147483648, 4444)).toBe(2147479204);
    // division by zero
    expect(() => compute_arithmetic_with_register("div", 1, 0)).toThrow();
});

// TODO: add more fp tests
test("floating point arithmetic opcodes", () => {
    class TestIO extends VMIOStub {
        error = jest.fn((err: Error) => {
            throw err;
        });
    }

    const precision = 9;
    const obj_code = to_instructions(`
        0:
            fleti r100, 0.3
            fsubi r100, 0.2
            fsubi r100, 0.1
            fleti r101, 1.0
            fdiv r101, r100
    `);

    const vm = new VirtualMachine(new TestIO());
    vm.load_object_code(obj_code, Episode.I);
    vm.start_thread(0);

    let last_result: ExecutionResult;
    do {
        last_result = vm.execute();
    } while (last_result !== ExecutionResult.Halted);

    expect(vm.get_register_float(100)).toBeCloseTo(7.4505806e-9, precision);
    expect(vm.get_register_float(101)).toBeCloseTo(134217728, precision);
});

test("basic window_msg output", () => {
    const messages = ["foo", "bar", "buz"];
    const segments = to_instructions(
        `
        .code
        0:
            arg_pushs "${messages[0]}"
            window_msg
            arg_pushs "${messages[1]}"
            add_msg
            arg_pushs "${messages[2]}"
            add_msg
            winend
    `,
        true,
    );

    class TestIO extends VMIOStub {
        window_msg = jest.fn((msg: string) => {
            expect(msg).toBe(messages.shift());
        });

        add_msg = jest.fn((msg: string) => {
            expect(msg).toBe(messages.shift());
        });

        winend = jest.fn(() => {});

        error = jest.fn((err: Error) => {
            throw err;
        });
    }

    const io = new TestIO();
    const vm = new VirtualMachine(io);

    vm.load_object_code(segments, Episode.I);
    vm.start_thread(0);

    const exec_results: ExecutionResult[] = [];
    let last_result: ExecutionResult;
    do {
        last_result = vm.execute();
        exec_results.push(last_result);
    } while (last_result !== ExecutionResult.Halted);

    // one result for each instruction and one extra for the halt signal
    expect(exec_results).toHaveLength(segments[0].instructions.length + 1);
    expect(exec_results).toEqual([
        ExecutionResult.Ok,
        ExecutionResult.WaitingInput,
        ExecutionResult.Ok,
        ExecutionResult.WaitingInput,
        ExecutionResult.Ok,
        ExecutionResult.WaitingInput,
        ExecutionResult.Ok,
        ExecutionResult.Halted,
    ]);

    expect(io.window_msg).toBeCalledTimes(1);
    expect(io.add_msg).toBeCalledTimes(2);
    expect(io.winend).toBeCalledTimes(1);
    expect(io.error).toBeCalledTimes(0);
});

test("opcode get_random", () => {
    const result_reg = 102;
    const obj_code = to_instructions(`
    .code
    0:
        leti r100, 0
        leti r101, 65535
        get_random r100, r${result_reg}
        get_random r100, r${result_reg}
        get_random r100, r${result_reg}
        get_random r100, r${result_reg}
        get_random r100, r${result_reg}
        get_random r100, r${result_reg}
        get_random r100, r${result_reg}
    `);

    const vm = new VirtualMachine(undefined, new Random(123));
    vm.load_object_code(obj_code, Episode.I);
    vm.start_thread(0);

    // run `let`s
    expect(vm.execute()).toBe(ExecutionResult.Ok);
    expect(vm.execute()).toBe(ExecutionResult.Ok);

    // test correct get_random sequence
    expect(vm.execute()).toBe(ExecutionResult.Ok);
    expect(vm.get_register_unsigned(result_reg)).toBe(879);
    expect(vm.execute()).toBe(ExecutionResult.Ok);
    expect(vm.get_register_unsigned(result_reg)).toBe(38105);
    expect(vm.execute()).toBe(ExecutionResult.Ok);
    expect(vm.get_register_unsigned(result_reg)).toBe(46149);
    expect(vm.execute()).toBe(ExecutionResult.Ok);
    expect(vm.get_register_unsigned(result_reg)).toBe(26207);
    expect(vm.execute()).toBe(ExecutionResult.Ok);
    expect(vm.get_register_unsigned(result_reg)).toBe(64725);
    expect(vm.execute()).toBe(ExecutionResult.Ok);
    expect(vm.get_register_unsigned(result_reg)).toBe(6529);
    expect(vm.execute()).toBe(ExecutionResult.Ok);
    expect(vm.get_register_unsigned(result_reg)).toBe(61497);
    expect(vm.execute()).toBe(ExecutionResult.Halted);
});

test("opcode list", () => {
    const list_items = ["a", "b", "c", "d"];
    const list_text = list_items.join("\\n");

    class TestIO extends VMIOStub {
        constructor() {
            super();
        }

        list = jest.fn((items: string[]) => {
            expect(items).toEqual(list_items);
        });
    }

    const select_idx = 2;
    const result_reg = 100;
    const obj_code = to_instructions(`
    .code
    0:
        list r${result_reg}, "${list_text}"
    `);

    const vm = new VirtualMachine(new TestIO());
    vm.load_object_code(obj_code, Episode.I);
    vm.start_thread(0);

    expect(vm.execute()).toBe(ExecutionResult.Ok); // arg_pushb
    expect(vm.execute()).toBe(ExecutionResult.Ok); // arg_pushs
    expect(vm.execute()).toBe(ExecutionResult.WaitingSelection); // list
    vm.list_select(select_idx);
    expect(vm.get_register_unsigned(result_reg)).toBe(select_idx);
});