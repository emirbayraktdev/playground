import mongoose, { Model, Schema } from "mongoose";

/** ----- Types ----- */
interface IAnomalyLocation {
  distance_from_start_km: number;
  depth_m: number;
}

export interface IAnomaly {
  anomalyId: string;
  type: string;
  severity: "low" | "medium" | "critical";
  detection_date: Date;
  location: IAnomalyLocation;
  status: "pending" | "under review" | "resolved";
}

interface IPipelineLocation {
  latitude: number;
  longitude: number;
}

export interface IPipeline {
  pipelineId: string;
  name: string;
  location: IPipelineLocation;
  length_km: number;
  diameter_cm: number;
  material: string;
  installation_year: number;
  anomalies: IAnomaly[];
}

/** ----- Schemas ----- */
const AnomalyLocationSchema = new Schema<IAnomalyLocation>({
  distance_from_start_km: { type: Number, required: true },
  depth_m: { type: Number, required: true },
});

const AnomalySchema = new Schema<IAnomaly>({
  anomalyId: { type: String, required: true },
  type: { type: String, required: true },
  severity: { type: String, enum: ["low", "medium", "critical"], required: true },
  detection_date: { type: Date, required: true },
  location: { type: AnomalyLocationSchema, required: true },
  status: { type: String, enum: ["pending", "under review", "resolved"], default: "pending" },
});

const PipelineSchema = new Schema<IPipeline>(
  {
    pipelineId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    length_km: { type: Number, required: true },
    diameter_cm: { type: Number, required: true },
    material: { type: String, required: true },
    installation_year: { type: Number, required: true },
    anomalies: [AnomalySchema],
  },
  { timestamps: true, collection: "pipelines", }
);

/** ----- Model (typed) ----- */
const PipelineModel: Model<IPipeline> =
  (mongoose.models.Pipeline as Model<IPipeline>) ||
  mongoose.model<IPipeline>("Pipeline", PipelineSchema);

export default PipelineModel;
