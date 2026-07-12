import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";

const mockFacilities = [
  { _id: "1", title: "Operation Theatre", imageUrl: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600", category: "Surgery" },
  { _id: "2", title: "ICU", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600", category: "Critical Care" },
  { _id: "3", title: "Delivery Room", imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600", category: "Maternity" },
  { _id: "4", title: "Ambulance", imageUrl: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=600", category: "Emergency" },
  { _id: "5", title: "Laboratory", imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600", category: "Diagnostics" },
  { _id: "6", title: "Pharmacy", imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600", category: "Services" },
];

const facilitiesInfo = [
  { title: "Operation Theatre", icon: "🏥", desc: "State-of-the-art operation theatre with advanced surgical equipment and sterile environment." },
  { title: "ICU / NICU", icon: "💊", desc: "Intensive Care Unit and Neonatal ICU equipped with advanced monitoring and life-support systems." },
  { title: "Delivery Suite", icon: "🤱", desc: "Comfortable delivery suites with modern obstetric equipment for safe childbirth." },
  { title: "24/7 Ambulance", icon: "🚑", desc: "Fully equipped ambulances available round the clock for emergency response." },
  { title: "Laboratory", icon: "🔬", desc: "Modern diagnostic laboratory offering comprehensive tests and quick results." },
  { title: "In-house Pharmacy", icon: "💉", desc: "On-site pharmacy stocked with all essential medicines for patient convenience." },
];

export default function Facilities() {
  const [filter, setFilter] = useState("All");
  const { data: gallery } = useFetch<any[]>("/api/gallery");
  const items = gallery && gallery.length > 0 ? gallery : mockFacilities;
  const facilityItems = items.filter((i: any) => i.category === "Facilities" || i.category === "Maternity" || i.category === "Emergency" || true).slice(0, 6);

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-[#6A1B9A] to-[#E91E63] text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Facilities</h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto px-4">World-class infrastructure and medical equipment for the best patient care.</p>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {facilitiesInfo.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#6A1B9A]/30 transition-all">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Facility Gallery</h2>
            <div className="w-14 h-1 bg-[#E91E63] rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilityItems.map((item: any) => (
              <div key={item._id} className="relative rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl transition-shadow">
                <img src={item.imageUrl || item.url} alt={item.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#6A1B9A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
