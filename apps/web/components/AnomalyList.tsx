import { formatDate } from "@/lib/format";
import { IAnomaly } from "@/models/Pipeline";

export default function AnomalyList({ anomalies }: { anomalies: IAnomaly[] }) {
  if (!anomalies?.length) return <p className="text-gray-600">no anomalies.</p>;

  return (
    <div className="overflow-x-auto rounded-2xl border">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Type</th>
            <th className="p-3">Severity</th>
            <th className="p-3">Status</th>
            <th className="p-3">Detection Date</th>
            <th className="p-3">Distance (km)</th>
            <th className="p-3">Depth (m)</th>
          </tr>
        </thead>
        <tbody>
          {anomalies.map((a) => (
            <tr key={a.anomalyId} className="border-t">
              <td className="p-3 font-mono">{a.anomalyId}</td>
              <td className="p-3">{a.type}</td>
              <td className="p-3">{a.severity}</td>
              <td className="p-3">{a.status}</td>
              <td className="p-3">
                {formatDate(a.detection_date)}
              </td>
              <td className="p-3">{a.location.distance_from_start_km}</td>
              <td className="p-3">{a.location.depth_m}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}