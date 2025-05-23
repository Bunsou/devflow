import { model, models, Schema, Types } from "mongoose";

export interface IModelName {}

const ModelNameSchema = new Schema<IModelName>({}, { timestamps: true });

const ModelName =
  models?.Modelname || model<IModelName>("ModelName", ModelNameSchema);

export default ModelName;
