import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/api";
import ImageUploadField from "@/components/admin/ImageUploadField";

const empty = { name: "", specialization: "", department: "", photo: "" };

export default function AdminDoctors() {
  const { data: doctors, isLoading, refetch } = useFetch<any[]>("/api/doctors");
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      if (editing) { await api.updateDoctor(editing, form); }
      else { await api.createDoctor(form); }
      setForm(empty); setEditing(null); refetch();
    } finally { setSaving(false); }
  };

  const del = async (id: string) => {
    if (!confirm("Delete doctor?")) return;
    await api.deleteDoctor(id); refetch();
  };

  const deleteAll = async () => {
    if (!doctors?.length) return;
    if (!confirm(`Delete ALL ${doctors.length} doctors? This cannot be undone.`)) return;
    if (!confirm("Are you absolutely sure? This will permanently remove every doctor.")) return;
    setDeletingAll(true);
    try {
      await api.deleteAllDoctors();
      setForm(empty); setEditing(null); refetch();
    } finally { setDeletingAll(false); }
  };

  const inp = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A1B9A]/30";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
        {!!doctors?.length && (
          <button
            onClick={deleteAll}
            disabled={deletingAll}
            className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60"
          >
            <Trash2 size={14} /> {deletingAll ? "Deleting..." : "Delete All Doctors"}
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 border shadow-sm mb-8">
        <h2 className="font-bold text-lg text-[#6A1B9A] mb-4">{editing ? "Edit Doctor" : "Add Doctor"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(["name","specialization","department"] as const).map(k => (
            <div key={k}><label className="block text-xs font-semibold text-gray-600 mb-1 capitalize">{k}</label><input className={inp} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={k} /></div>
          ))}
          <div className="md:col-span-2">
            <ImageUploadField label="Doctor Photo" value={form.photo} onChange={(dataUrl) => setForm(f => ({ ...f, photo: dataUrl }))} />
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={save} disabled={saving} className="bg-[#6A1B9A] text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-[#7B1FA2] transition-colors disabled:opacity-60">{saving ? "Saving..." : editing ? "Update" : "Add Doctor"}</button>
          {editing && <button onClick={() => { setForm(empty); setEditing(null); }} className="text-gray-500 text-sm font-semibold px-4 py-2.5">Cancel</button>}
        </div>
      </div>
      {isLoading ? <p className="text-gray-400">Loading...</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors?.map((d: any) => (
            <div key={d._id} className="bg-white rounded-2xl p-5 border shadow-sm flex gap-4 items-start">
              <img src={d.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&background=6A1B9A&color=fff&size=80`} alt={d.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm truncate">{d.name}</h3>
                <p className="text-gray-400 text-xs">{d.specialization}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => { setForm({ name: d.name, specialization: d.specialization, department: d.department, photo: d.photo }); setEditing(d._id); }} className="text-xs text-[#6A1B9A] font-semibold hover:underline">Edit</button>
                  <button onClick={() => del(d._id)} className="text-xs text-red-500 font-semibold hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
