import { Link } from "wouter";
import { Clock, Shield, Star, Phone } from "lucide-react";
import AdvertisementSlider from "@/components/home/AdvertisementSlider";
import ServicesSection from "@/components/home/ServicesSection";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-gradient-to-br from-[#f8f0ff] via-white to-[#fff0f5] pt-12 pb-10 overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#6A1B9A]/8 to-[#E91E63]/5 blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#E91E63]/8 to-[#6A1B9A]/5 blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-[2.1rem] md:text-[2.6rem] lg:text-[3rem] font-extrabold leading-[1.15] text-gray-900 tracking-tight">
                Compassionate Care<br />
                <span className="text-[#6A1B9A]">for Women.</span>{" "}
                <span className="text-gray-900">Care for Life.</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg max-w-lg leading-relaxed mt-2">
                Advanced medical care with empathy and excellence.<br />
                Your health is our mission.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/appointment">
                <button className="flex items-center gap-2 bg-gradient-to-r from-[#E91E63] to-[#6A1B9A] text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg hover:opacity-90 transition-opacity">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2"/></svg>
                  Book Appointment
                </button>
              </Link>
              <Link href="/services">
                <button className="flex items-center gap-2 border-2 border-[#6A1B9A] text-[#6A1B9A] font-bold text-sm px-7 py-3.5 rounded-full hover:bg-[#6A1B9A]/5 transition-colors">
                  Our Services
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" strokeWidth="2.5" strokeLinecap="round"/></svg>
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-4 gap-3 pt-4">
              {[
                { icon: <Clock size={18} />, label: "24/7", sub: "Always Open", color: "bg-[#6A1B9A]/10 text-[#6A1B9A]" },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7 7 0 0113 0"/></svg>, label: "Expert Doctors", sub: "Specialized Care", color: "bg-[#E91E63]/10 text-[#E91E63]" },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, label: "Advanced Facilities", sub: "Modern Technology", color: "bg-[#7B1FA2]/10 text-[#7B1FA2]" },
                { icon: <Phone size={18} />, label: "Emergency Care", sub: "Immediate Support", color: "bg-[#FF4081]/10 text-[#FF4081]" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1.5">
                  <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 leading-tight">{item.label}</span>
                  <span className="text-[10px] text-gray-400">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Hero Image */}
          <div className="relative flex justify-center lg:justify-end mt-6 lg:mt-0">
            {/* Outer gradient ring */}
            <div className="relative w-[380px] h-[380px] md:w-[430px] md:h-[430px]">
              {/* Decorative circles behind */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-full border-2 border-[#E91E63]/20" />
              <div className="absolute -top-8 -right-8 w-full h-full rounded-full border border-[#6A1B9A]/10" />

              {/* Main circular image */}
              <div className="relative w-full h-full rounded-full p-[6px] bg-gradient-to-br from-[#E91E63] via-[#9C27B0] to-[#6A1B9A] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=600&h=600&fit=crop&crop=center"
                  alt="Pregnant woman"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {/* 24x7 badge - top left */}
              <div className="absolute -left-14 top-12 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 z-10">
                <div className="w-11 h-11 rounded-full bg-[#6A1B9A] flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-extrabold text-sm text-gray-900 leading-none">24x7 SERVICE</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">AVAILABLE</p>
                </div>
              </div>

              {/* Health mission badge - bottom right */}
              <div className="absolute -right-12 bottom-16 bg-[#E91E63] text-white rounded-2xl shadow-xl px-5 py-3 z-10">
                <p className="font-extrabold text-sm tracking-wide">YOUR HEALTH</p>
                <p className="font-extrabold text-base tracking-wide">OUR MISSION</p>
              </div>

              {/* Small decorative dots */}
              <div className="absolute top-0 left-8 w-3 h-3 rounded-full bg-[#E91E63]" />
              <div className="absolute bottom-4 left-0 w-2 h-2 rounded-full bg-[#6A1B9A]" />
            </div>
          </div>
        </div>
      </section>

      <AdvertisementSlider />
      <ServicesSection />
      <FacilitiesSection />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}