import { useFetch } from "@/hooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "wouter";

const mockAds = [
  { _id: "1", title: "FREE Health Check-up Camp Every Sunday", description: "BP Check • Sugar Check • BMI Consultation & More", ctaText: "Book Now", ctaLink: "/appointment", bg: "from-[#7B1FA2] to-[#E91E63]", rightText: "Your Health, Our Priority", rightSub: "Stay Healthy, Stay Happy", type: "free" },
  { _id: "2", title: "Women's Health Screening Camp", description: "Comprehensive check-up for women of all ages.", ctaText: "Register Now", ctaLink: "/appointment", bg: "from-[#6A1B9A] to-[#AD1457]", rightText: "Empowering Women's Health", rightSub: "Register Today — Limited Slots!", type: "camp" },
  { _id: "3", title: "Maternity Package — Special Offer", description: "Complete antenatal care + delivery at affordable rates.", ctaText: "Learn More", ctaLink: "/services", bg: "from-[#880E4F] to-[#4A148C]", rightText: "Care for Every Mother", rightSub: "Compassionate Maternity Care", type: "camp" },
];

export default function AdvertisementSlider() {
  const { data: ads } = useFetch<any[]>("/api/advertisements");
  const displayAds = ads && ads.length > 0 ? ads : mockAds;

  return (
    <section className="w-full bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="relative">
          <Swiper modules={[Autoplay, Navigation]} spaceBetween={0} slidesPerView={1} navigation={{ nextEl: ".ad-next", prevEl: ".ad-prev" }} autoplay={{ delay: 5000, disableOnInteraction: false }} loop className="rounded-2xl overflow-hidden shadow-xl">
            {displayAds.map((ad: any, idx: number) => {
              const bg = ad.bg || (idx % 2 === 0 ? "from-[#7B1FA2] to-[#E91E63]" : "from-[#6A1B9A] to-[#AD1457]");
              const isFree = ad.type === "free" || ad.title?.toLowerCase().includes("free");
              return (
                <SwiperSlide key={ad._id || idx}>
                  <div className={`bg-gradient-to-r ${bg} h-[220px] md:h-[260px] flex items-center`}>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 h-full">
                      <div className="flex flex-col justify-center px-8 md:px-12 py-6 text-white">
                        {isFree && <span className="text-5xl md:text-6xl font-black text-white drop-shadow-lg tracking-tight mb-2">FREE</span>}
                        <h2 className={`font-black text-white leading-tight mb-2 ${isFree ? "text-lg md:text-xl" : "text-2xl md:text-3xl"}`}>{ad.title}</h2>
                        {ad.description && <p className="text-white/85 text-sm mb-4 leading-relaxed">{ad.description}</p>}
                        {ad.ctaText && (
                          <Link href={ad.ctaLink || "/appointment"}>
                            <button className="self-start bg-white text-[#6A1B9A] font-extrabold text-sm px-7 py-2.5 rounded-full shadow-lg hover:bg-gray-50 transition-colors">{ad.ctaText}</button>
                          </Link>
                        )}
                      </div>
                      <div className="hidden md:flex items-center justify-end relative overflow-hidden">
                        <div className="relative z-10 text-white text-right pr-8 py-6">
                          <p className="text-xl md:text-2xl font-extrabold leading-tight">{ad.rightText || "Your Health, Our Priority"}</p>
                          <p className="text-base md:text-lg font-semibold text-white/85 mt-1">{ad.rightSub || "Stay Healthy, Stay Happy"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <button className="ad-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors">
            <svg className="w-4 h-4 text-[#6A1B9A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" strokeLinecap="round" /></svg>
          </button>
          <button className="ad-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors">
            <svg className="w-4 h-4 text-[#6A1B9A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 18l6-6-6-6" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
