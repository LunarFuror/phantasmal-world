import { Property } from "../Property";
import { Disposable } from "../../Disposable";

export enum ListChangeType {
    ListChange,
    ValueChange,
}

export type ListChangeEvent<T> = ListChange<T> | ListValueChange<T>;

export type ListChange<T> = {
    readonly type: ListChangeType.ListChange;
    readonly index: number;
    readonly removed: readonly T[];
    readonly inserted: readonly T[];
};

export type ListValueChange<T> = {
    readonly type: ListChangeType.ValueChange;
    readonly index: number;
    readonly updated: readonly T[];
};

export interface ListProperty<T> extends Property<readonly T[]> {
    readonly is_list_property: true;

    readonly length: Property<number>;

    get(index: number): T;

    observe_list(
        observer: (change: ListChangeEvent<T>) => void,
        options?: { call_now?: boolean },
    ): Disposable;

    filtered(predicate: ((value: T) => boolean) | Property<(value: T) => boolean>): ListProperty<T>;

    [Symbol.iterator](): IterableIterator<T>;
}

export function is_list_property<T>(observable: any): observable is ListProperty<T> {
    return observable != undefined && observable.is_list_property;
}
