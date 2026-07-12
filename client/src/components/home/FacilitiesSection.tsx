import { Link } from "wouter";
import { Check } from "lucide-react";

const facilities = [
  {
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=700&h=300&fit=crop",
    label: "Modern Operation Theatre",
    span: "col-span-2",
  },
  {
    img: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=350&h=220&fit=crop",
    label: "24x7 Emergency Care",
    span: "col-span-1",
  },
  {
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=350&h=220&fit=crop",
    label: "Advanced ICU",
    span: "col-span-1",
  },
];

const points = [
  "Compassionate & Personalized Care",
  "Advanced Medical Technology",
  "24/7 Emergency Services",
  "Experienced & Caring Staff",
  "Patient-Centered Approach",
];

export default function FacilitiesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#6A1B9A] leading-tight mb-3">
                Advanced Facilities.<br />Trusted Care.
              </h2>
              <p className="text-gray-500 text-base leading-relaxed">
                Sri Sanjeevi Hospital is equipped with modern technology and a compassionate team to provide the best healthcare services for every patient.
              </p>
            </div>

            <ul className="space-y-3">
              {points.map((point, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E91E63] flex items-center justify-center shrink-0">
                    <Check size={12} className="text-white stroke-[3]" />
                  </div>
                  <span className="text-gray-800 font-semibold text-[15px]">{point}</span>
                </li>
              ))}
            </ul>

            <Link href="/about">
              <button className="bg-[#6A1B9A] hover:bg-[#7B1FA2] text-white font-bold text-sm px-8 py-3 rounded-full shadow-md transition-colors mt-2">
                Learn More About Us
              </button>
            </Link>
          </div>

          {/* Right - Image Grid */}
          <div className="grid grid-cols-2 gap-3 h-[420px]">
            {/* Full width top */}
            <div className="col-span-2 relative rounded-xl overflow-hidden group h-[220px]">
              <img
                src={facilities[0].img}
                alt={facilities[0].label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a148c]/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-bold text-base drop-shadow">
                {facilities[0].label}
              </span>
            </div>
            {/* Bottom two */}
            {facilities.slice(1).map((f, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden group h-[185px]">
                <img
                  src={f.img}
                  alt={f.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#880e4f]/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-white font-bold text-sm drop-shadow">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
