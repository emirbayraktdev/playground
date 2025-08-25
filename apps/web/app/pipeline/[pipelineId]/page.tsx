import AnomalyList from "@/components/AnomalyList";
import { dbConnect } from "@/lib/mongoose";
import PipelineModel, { IPipeline } from "@/models/Pipeline";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { pipelineId: string } };

export const revalidate = 0;

export default async function PipelinePage({ params }: Props) {
  await dbConnect();

  const pipeline = (await PipelineModel.findOne({ pipelineId: params.pipelineId }).lean()) as
    | (IPipeline & { _id: string })
    | null;

  if (!pipeline) return notFound();

    pipeline.anomalies = pipeline.anomalies.sort(
    (a, b) =>
      new Date(b.detection_date).getTime() - new Date(a.detection_date).getTime()
  );

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{pipeline.name}</h1>
          <p className="text-gray-600">
            ID: <span className="font-mono">{pipeline.pipelineId}</span>
          </p>
        </div>
        <Link href="/" className="text-sm underline">
          ← back to all pipelines
        </Link>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border p-4">
          <div className="text-sm text-gray-600">Material</div>
          <div className="text-lg">{pipeline.material}</div>
        </div>
        <div className="rounded-2xl border p-4">
          <div className="text-sm text-gray-600">Length (km)</div>
          <div className="text-lg">{pipeline.length_km}</div>
        </div>
        <div className="rounded-2xl border p-4">
          <div className="text-sm text-gray-600">Diameter (cm)</div>
          <div className="text-lg">{pipeline.diameter_cm}</div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Anomalies</h2>
        <AnomalyList anomalies={pipeline.anomalies as any} />
      </section>
    </main>
  );
}
