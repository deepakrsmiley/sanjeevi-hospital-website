import { useFetch } from "@/hooks/useFetch";
import { Link } from "wouter";

const mockServices = [
  { _id: "1", name: "Ante Natal Check-up", description: "Complete pregnancy care and monitoring for expectant mothers from conception to delivery.", icon: "antenatal" },
  { _id: "2", name: "Delivery Services", description: "Safe and compassionate delivery services including normal delivery and C-section.", icon: "delivery" },
  { _id: "3", name: "Family Planning", description: "Safe & Effective Planning Services and expert counseling for couples.", icon: "family" },
  { _id: "4", name: "ICU Services", description: "Intensive Care Unit equipped with advanced life-support and monitoring systems.", icon: "icu" },
  { _id: "5", name: "Accident & Emergency Care", description: "Immediate Care, Swift Response — 24/7 trauma and emergency services.", icon: "emergency" },
  { _id: "6", name: "Poison & Snake Bite Treatment", description: "Quick Care and specialized antivenom treatment for emergency poisoning cases.", icon: "poison" },
];

const iconColors: Record<string, string> = { antenatal: "bg-[#6A1B9A]", delivery: "bg-[#E91E63]", family: "bg-[#7B1FA2]", icu: "bg-[#00897B]", emergency: "bg-[#E91E63]", poison: "bg-[#6A1B9A]" };

function ServiceIcon({ icon }: { icon: string }) {
  const key = icon?.toLowerCase() || "antenatal";
  const bg = iconColors[key] || "bg-[#6A1B9A]";
  const svgs: Record<string, JSX.Element> = {
    antenatal: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="w-7 h-7"><circle cx="12" cy="8" r="3" /><path d="M9 8c0 4 2 8 3 10M15 8c0 4-2 8-3 10" /><ellipse cx="12" cy="16" rx="4" ry="2" /></svg>,
    delivery: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="w-7 h-7"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M9 12l2 2 4-4" /></svg>,
    family: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="w-7 h-7"><circle cx="9" cy="7" r="3" /><circle cx="15" cy="7" r="3" /><path d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2" /></svg>,
    icu: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="w-7 h-7"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    emergency: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="w-7 h-7"><path d="M10 3H6a2 2 0 00-2 2v14c0 1.1.9 2 2 2h12a2 2 0 002-2V9l-4-6z" /><path d="M12 9v4M12 17h.01" strokeWidth="2" strokeLinecap="round" /></svg>,
    poison: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="w-7 h-7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
  };
  return (
    <div className={`w-[68px] h-[68px] rounded-full ${bg} flex items-center justify-center shadow-lg mb-5`}>
      {svgs[key] || svgs["antenatal"]}
    </div>
  );
}

export default function ServicesSection() {
  const { data: services, isLoading } = useFetch<any[]>("/api/services");
  const displayServices = services && services.length > 0 ? services.slice(0, 6) : mockServices;

  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Our Healthcare Services</h2>
          <div className="w-16 h-1 bg-[#E91E63] mx-auto rounded-full mb-4" />
          <p className="text-gray-500 text-base max-w-xl mx-auto">Comprehensive healthcare services for you and your family</p>
        </div>
        {isLoading && !services ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="bg-white rounded-2xl p-7 border h-48 animate-pulse bg-gray-100" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service: any) => (
              <div key={service._id || service.id} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#6A1B9A]/30 transition-all duration-300 group">
                <ServiceIcon icon={service.icon} />
                <h3 className="text-[17px] font-extrabold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">{service.description}</p>
                <Link href="/services" className="text-[#E91E63] font-bold text-sm hover:text-[#6A1B9A] transition-colors inline-flex items-center gap-1">
                  Learn More <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 18l6-6-6-6" strokeLinecap="round" /></svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
