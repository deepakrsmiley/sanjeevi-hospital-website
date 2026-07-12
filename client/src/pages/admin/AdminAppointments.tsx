import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/api";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

export default function AdminAppointments() {
  const { data: appointments, isLoading, refetch } = useFetch<any[]>("/api/appointments");
  const [updating, setUpdating] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      await api.updateAppointment(id, { status });
      refetch();
    } finally { setUpdating(null); }
  };

  const deleteAppt = async (id: string) => {
    if (!confirm("Delete this appointment?")) return;
    await api.deleteAppointment(id);
    refetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Appointments</h1>
      {isLoading ? <p className="text-gray-400">Loading...</p> : (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>{["Patient", "Mobile", "Department", "Date", "Status", "Actions"].map(h => <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments?.map((a: any) => (
                  <tr key={a._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{a.patientName}</td>
                    <td className="px-4 py-3 text-gray-500">{a.mobile}</td>
                    <td className="px-4 py-3">{a.department}</td>
                    <td className="px-4 py-3">{a.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[a.status] || "bg-gray-100 text-gray-600"}`}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <select className="text-xs border rounded-lg px-2 py-1" value={a.status} onChange={e => updateStatus(a._id, e.target.value)} disabled={updating === a._id}>
                        {["pending","confirmed","completed","cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <button onClick={() => deleteAppt(a._id)} className="text-xs text-red-500 hover:text-red-700 font-semibold">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
