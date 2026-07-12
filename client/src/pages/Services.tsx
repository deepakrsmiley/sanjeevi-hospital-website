import { useFetch } from "@/hooks/useFetch";
import { Baby, Activity, Heart, Stethoscope, Ambulance, Syringe } from "lucide-react";

const mockServices = [
  { _id: "1", name: "Ante Natal Check-up", description: "Complete pregnancy care and monitoring from conception to delivery.", icon: "Baby", features: ["Regular monitoring","Nutritional advice","Foetal monitoring"] },
  { _id: "2", name: "Delivery Services", description: "Safe and compassionate delivery services including normal and C-section.", icon: "Heart", features: ["Normal Delivery","Caesarean Section","Post-delivery care"] },
  { _id: "3", name: "Family Planning", description: "Safe & Effective Planning Services and expert counseling for couples.", icon: "Stethoscope", features: ["Contraception advice","Fertility planning","Counseling"] },
  { _id: "4", name: "ICU Services", description: "Intensive Care Unit with advanced life-support and monitoring systems.", icon: "Activity", features: ["24/7 monitoring","Life support","Specialist care"] },
  { _id: "5", name: "Accident & Emergency Care", description: "Immediate Care, Swift Response — 24/7 trauma and emergency services.", icon: "Ambulance", features: ["24/7 emergency","Trauma care","Rapid response"] },
  { _id: "6", name: "Poison & Snake Bite Treatment", description: "Specialized antivenom treatment for emergency poisoning cases.", icon: "Syringe", features: ["Antivenom therapy","Toxicology support","Emergency response"] },
];

const iconMap: Record<string, any> = { Baby, Activity, Heart, Stethoscope, Ambulance, Syringe };

export default function Services() {
  const { data: services, isLoading } = useFetch<any[]>("/api/services");
  const items = services && services.length > 0 ? services : mockServices;

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-[#6A1B9A] to-[#E91E63] text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto px-4">Comprehensive healthcare services tailored for women and their families.</p>
      </div>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {isLoading && !services ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => <div key={i} className="bg-white p-8 rounded-2xl border h-64 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((service: any) => {
                const Icon = iconMap[service.icon] || Heart;
                return (
                  <div key={service._id} className="bg-white p-8 rounded-2xl shadow-sm border group hover:border-[#6A1B9A] transition-colors">
                    <div className="w-16 h-16 rounded-full bg-[#6A1B9A]/10 flex items-center justify-center mb-6 group-hover:bg-[#6A1B9A] transition-colors">
                      <Icon className="w-8 h-8 text-[#6A1B9A] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.name}</h3>
                    <p className="text-gray-500 mb-6 leading-relaxed">{service.description}</p>
                    {service.features && service.features.length > 0 && (
                      <div className="space-y-2 mt-4 border-t pt-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-[#6A1B9A]">Features</h4>
                        <ul className="space-y-2">
                          {service.features.map((f: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                              <span className="text-[#E91E63] mt-1">•</span>{f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
