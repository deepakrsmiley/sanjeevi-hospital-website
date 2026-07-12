import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/api";
import ImageUploadField from "@/components/admin/ImageUploadField";

const empty = { title: "", excerpt: "", category: "", author: "", coverImage: "", readTime: "5 min read" };

export default function AdminBlog() {
  const { data: posts, isLoading, refetch } = useFetch<any[]>("/api/blog");
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      if (editing) { await api.updateBlogPost(editing, form); }
      else { await api.createBlogPost(form); }
      setForm(empty); setEditing(null); refetch();
    } finally { setSaving(false); }
  };

  const del = async (id: string) => {
    if (!confirm("Delete post?")) return;
    await api.deleteBlogPost(id); refetch();
  };

  const deleteAll = async () => {
    if (!posts?.length) return;
    if (!confirm(`Delete ALL ${posts.length} blog posts? This cannot be undone.`)) return;
    if (!confirm("Are you absolutely sure? This will permanently remove every blog post.")) return;
    setDeletingAll(true);
    try {
      await api.deleteAllBlogPosts();
      setForm(empty); setEditing(null); refetch();
    } finally { setDeletingAll(false); }
  };

  const inp = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A1B9A]/30";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        {!!posts?.length && (
          <button
            onClick={deleteAll}
            disabled={deletingAll}
            className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60"
          >
            <Trash2 size={14} /> {deletingAll ? "Deleting..." : "Delete All Posts"}
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 border shadow-sm mb-8">
        <h2 className="font-bold text-lg text-[#6A1B9A] mb-4">{editing ? "Edit Post" : "Add Post"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(["title","category","author","readTime"] as const).map(k => (
            <div key={k}><label className="block text-xs font-semibold text-gray-600 mb-1 capitalize">{k}</label><input className={inp} value={form[k as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={k} /></div>
          ))}
          <div className="md:col-span-2">
            <ImageUploadField label="Cover Image" value={form.coverImage} onChange={(dataUrl) => setForm(f => ({ ...f, coverImage: dataUrl }))} />
          </div>
          <div className="md:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Excerpt</label><textarea className={inp} rows={3} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Blog excerpt..." /></div>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={save} disabled={saving} className="bg-[#6A1B9A] text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-[#7B1FA2] transition-colors disabled:opacity-60">{saving ? "Saving..." : editing ? "Update" : "Add Post"}</button>
          {editing && <button onClick={() => { setForm(empty); setEditing(null); }} className="text-gray-500 text-sm font-semibold px-4 py-2.5">Cancel</button>}
        </div>
      </div>
      {isLoading ? <p className="text-gray-400">Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((p: any) => (
            <div key={p._id} className="bg-white rounded-2xl overflow-hidden border shadow-sm">
              <img src={p.coverImage || "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400"} alt={p.title} className="w-full h-36 object-cover" />
              <div className="p-4">
                <span className="text-xs bg-[#6A1B9A]/10 text-[#6A1B9A] font-bold px-2 py-0.5 rounded-full">{p.category}</span>
                <h3 className="font-bold text-gray-900 text-sm mt-2 line-clamp-2">{p.title}</h3>
                <p className="text-gray-400 text-xs mt-1">{p.author}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => { setForm({ title: p.title, excerpt: p.excerpt, category: p.category, author: p.author, coverImage: p.coverImage, readTime: p.readTime }); setEditing(p._id); }} className="text-xs text-[#6A1B9A] font-semibold hover:underline">Edit</button>
                  <button onClick={() => del(p._id)} className="text-xs text-red-500 font-semibold hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
