import { IPipeline } from "@/models/Pipeline";
import Link from "next/link";

type Props = {
  pipeline: Pick<IPipeline, "pipelineId" | "name" | "material" | "length_km" | "anomalies">;
};

export default function PipelineCard({ pipeline }: Props) {
  const anomalyCount = pipeline.anomalies?.length ?? 0;

  return (
    <Link
      href={`/pipeline/${encodeURIComponent(pipeline.pipelineId)}`}
      className="block rounded-2xl border p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{pipeline.name}</h3>
        <span className="text-sm px-2 py-1 rounded-full bg-gray-100">
          {anomalyCount} anomalies
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        ID: <span className="font-mono">{pipeline.pipelineId}</span>
      </p>
      <p className="text-sm text-gray-700 mt-2">
        {pipeline.material} • {pipeline.length_km} km
      </p>
    </Link>
  );
}