import { Vec3 } from "../../core/data_formats/vector";
import { AreaVariantModel } from "./AreaVariantModel";

export class SectionModel {
    readonly id: number;
    readonly position: Vec3;
    readonly y_axis_rotation: number;
    readonly sin_y_axis_rotation: number;
    readonly cos_y_axis_rotation: number;
    readonly area_variant: AreaVariantModel;

    constructor(
        id: number,
        position: Vec3,
        y_axis_rotation: number,
        area_variant: AreaVariantModel,
    ) {
        if (!Number.isInteger(id) || id < -1)
            throw new Error(`Expected id to be an integer greater than or equal to -1, got ${id}.`);
        if (!position) throw new Error("position is required.");
        if (!Number.isFinite(y_axis_rotation)) throw new Error("y_axis_rotation is required.");
        if (!area_variant) throw new Error("area_variant is required.");

        this.id = id;
        this.position = position;
        this.y_axis_rotation = y_axis_rotation;
        this.sin_y_axis_rotation = Math.sin(this.y_axis_rotation);
        this.cos_y_axis_rotation = Math.cos(this.y_axis_rotation);
        this.area_variant = area_variant;
    }
}
