import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/api";
import ImageUploadField from "@/components/admin/ImageUploadField";

const empty = { title: "", description: "", ctaText: "Book Now", ctaLink: "/appointment", imageUrl: "", active: true };

export default function AdminAdvertisements() {
  const { data: ads, isLoading, refetch } = useFetch<any[]>("/api/advertisements");
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      if (editing) { await api.updateAd(editing, form); }
      else { await api.createAd(form); }
      setForm(empty); setEditing(null); refetch();
    } finally { setSaving(false); }
  };

  const del = async (id: string) => {
    if (!confirm("Delete advertisement?")) return;
    await api.deleteAd(id); refetch();
  };

  const deleteAll = async () => {
    if (!ads?.length) return;
    if (!confirm(`Delete ALL ${ads.length} advertisements? This cannot be undone.`)) return;
    if (!confirm("Are you absolutely sure? This will permanently remove every advertisement.")) return;
    setDeletingAll(true);
    try {
      await api.deleteAllAds();
      setForm(empty); setEditing(null); refetch();
    } finally { setDeletingAll(false); }
  };

  const inp = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A1B9A]/30";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Advertisements</h1>
        {!!ads?.length && (
          <button
            onClick={deleteAll}
            disabled={deletingAll}
            className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60"
          >
            <Trash2 size={14} /> {deletingAll ? "Deleting..." : "Delete All Ads"}
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 border shadow-sm mb-8">
        <h2 className="font-bold text-lg text-[#6A1B9A] mb-4">{editing ? "Edit Ad" : "Add Advertisement"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(["title","description","ctaText","ctaLink"] as const).map(k => (
            <div key={k}><label className="block text-xs font-semibold text-gray-600 mb-1 capitalize">{k}</label><input className={inp} value={form[k as keyof typeof form] as string} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={k} /></div>
          ))}
          <div className="md:col-span-2">
            <ImageUploadField label="Advertisement Image" value={form.imageUrl} onChange={(dataUrl) => setForm(f => ({ ...f, imageUrl: dataUrl }))} />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="active" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="w-4 h-4 accent-[#6A1B9A]" />
            <label htmlFor="active" className="text-sm font-semibold text-gray-700">Active</label>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={save} disabled={saving} className="bg-[#6A1B9A] text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-[#7B1FA2] transition-colors disabled:opacity-60">{saving ? "Saving..." : editing ? "Update" : "Add Ad"}</button>
          {editing && <button onClick={() => { setForm(empty); setEditing(null); }} className="text-gray-500 text-sm font-semibold px-4 py-2.5">Cancel</button>}
        </div>
      </div>
      {isLoading ? <p className="text-gray-400">Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ads?.map((ad: any) => (
            <div key={ad._id} className="bg-white rounded-2xl p-5 border shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-900 text-sm flex-1 pr-4">{ad.title}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${ad.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{ad.active ? "Active" : "Inactive"}</span>
              </div>
              {ad.imageUrl && <img src={ad.imageUrl} alt={ad.title} className="w-full h-32 object-cover rounded-lg mb-3" />}
              <p className="text-gray-400 text-xs mb-3">{ad.description}</p>
              <div className="flex gap-2">
                <button onClick={() => { setForm({ title: ad.title, description: ad.description, ctaText: ad.ctaText, ctaLink: ad.ctaLink, imageUrl: ad.imageUrl, active: ad.active }); setEditing(ad._id); }} className="text-xs text-[#6A1B9A] font-semibold hover:underline">Edit</button>
                <button onClick={() => del(ad._id)} className="text-xs text-red-500 font-semibold hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
