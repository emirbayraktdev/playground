import PipelineList from "@/components/PipelineList";
import { dbConnect } from "@/lib/mongoose";
import PipelineModel, { IPipeline } from "@/models/Pipeline";

export const revalidate = 0; // always fresh (no api, server query)

export default async function HomePage() {
  let pipelines: IPipeline[]  = []
  try{
await dbConnect();

  pipelines= await PipelineModel.find({})
    .select("pipelineId name material length_km anomalies")
    .collation({ locale: "en", numericOrdering: true })
    .sort({ name: 1 })
    .lean();

  }catch(err){
console.log(err)
  }



  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <header>

        <h1 className="text-2xl font-bold">Pipelines</h1>
        <p className="text-gray-600">select a pipeline to view anomalies</p>
      </header>
      <PipelineList pipelines={pipelines as any} />
    </main>
  );
}