import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";

const mockGallery = [
  { _id: "1", title: "Operation Theatre", imageUrl: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600", category: "Facilities" },
  { _id: "2", title: "ICU Ward", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600", category: "Facilities" },
  { _id: "3", title: "Delivery Room", imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600", category: "Maternity" },
  { _id: "4", title: "Ambulance Service", imageUrl: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=600", category: "Emergency" },
  { _id: "5", title: "Pharmacy", imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600", category: "Services" },
  { _id: "6", title: "Reception Area", imageUrl: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600", category: "General" },
  { _id: "7", title: "Consultation Room", imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600", category: "General" },
  { _id: "8", title: "Laboratory", imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600", category: "Facilities" },
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const { data: gallery, isLoading } = useFetch<any[]>("/api/gallery");
  const items = gallery && gallery.length > 0 ? gallery : mockGallery;
  const categories = ["All", ...Array.from(new Set(items.map((i: any) => i.category)))];
  const filtered = filter === "All" ? items : items.filter((i: any) => i.category === filter);

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-[#6A1B9A] to-[#E91E63] text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto px-4">A glimpse into life at Sri Sanjeevi Hospital.</p>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((c: string) => (
              <button key={c} onClick={() => setFilter(c)} className={`px-6 py-2 rounded-full font-medium transition-colors ${filter === c ? "bg-[#6A1B9A] text-white shadow-md" : "bg-white text-gray-700 hover:bg-[#6A1B9A]/10"}`}>{c}</button>
            ))}
          </div>
          {isLoading && !gallery ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {[1,2,3,4,5,6].map(i => <div key={i} className="w-full h-64 rounded-2xl bg-gray-200 animate-pulse break-inside-avoid" />)}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filtered.map((item: any) => (
                <div key={item._id} className="relative rounded-2xl overflow-hidden break-inside-avoid group shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                  <img src={item.imageUrl || item.url} alt={item.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[#6A1B9A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <span className="text-white font-bold text-lg text-center">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
