import { useFetch } from "@/hooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const mockTestimonials = [
  { _id: "1", patientName: "Meena Krishnan", rating: 5, comment: "Sri Sanjeevi Hospital provided exceptional care during my pregnancy. Dr. Priya Sharma was attentive and professional. I felt completely safe and supported. Highly recommend!", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" },
  { _id: "2", patientName: "Ranjitha Bose", rating: 5, comment: "Outstanding emergency care! The staff responded swiftly and the treatment was top-notch. The ICU facilities are world-class. Forever grateful.", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { _id: "3", patientName: "Lakshmi Devi", rating: 5, comment: "I delivered my baby here and the experience was wonderful. The nursing staff is extremely caring and the operation theatre is state-of-the-art.", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
  { _id: "4", patientName: "Kavitha Sundaram", rating: 5, comment: "Excellent family planning counseling. The doctors are knowledgeable and empathetic. Truly a hospital that cares for women.", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
];

export default function Testimonials() {
  const { data: testimonials } = useFetch<any[]>("/api/testimonials");
  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : mockTestimonials;

  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">What Our Patients Say</h2>
          <div className="w-16 h-1 bg-[#E91E63] mx-auto rounded-full" />
        </div>
        <Swiper modules={[Autoplay, Pagination]} spaceBetween={24} slidesPerView={1} breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} pagination={{ clickable: true }} autoplay={{ delay: 4000, disableOnInteraction: false }} loop className="pb-12">
          {displayTestimonials.map((t: any) => (
            <SwiperSlide key={t._id || t.id}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center min-h-[260px]">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-500 italic text-[13px] leading-relaxed mb-5 flex-1">"{t.comment}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <img src={t.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.patientName)}&background=6A1B9A&color=fff&size=80`} alt={t.patientName} className="w-12 h-12 rounded-full object-cover border-2 border-[#6A1B9A]/20" />
                  <div className="text-left">
                    <h4 className="font-extrabold text-[13px] text-gray-900">{t.patientName}</h4>
                    <p className="text-[11px] text-[#E91E63] font-semibold">Patient</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
