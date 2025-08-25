import { IPipeline } from "@/models/Pipeline";
import PipelineCard from "./PipelineCard";

export default function PipelineList({ pipelines }: { pipelines: IPipeline[] }) {
  if (!pipelines.length) {
    return <p className="text-gray-600">no pipelines yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {pipelines.map((p) => (
        <PipelineCard
          key={p.pipelineId}
          pipeline={{
            pipelineId: p.pipelineId,
            name: p.name,
            material: p.material,
            length_km: p.length_km,
            anomalies: p.anomalies,
          }}
        />
      ))}
    </div>
  );
}