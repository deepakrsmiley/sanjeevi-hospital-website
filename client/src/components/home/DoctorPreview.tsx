import { useFetch } from "@/hooks/useFetch";
import { Link } from "wouter";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const mockDoctors = [
  { _id: "1", name: "Dr. Priya Sharma", qualification: "MBBS, MD (OBG)", specialization: "Obstetrician & Gynaecologist", experience: "12 Years", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop" },
  { _id: "2", name: "Dr. Karthik Reddy", qualification: "MBBS, MS (Surgery)", specialization: "General Surgeon", experience: "10 Years", photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop" },
  { _id: "3", name: "Dr. Anjali Patel", qualification: "MBBS, DCH, DNB", specialization: "Paediatrician", experience: "8 Years", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop" },
  { _id: "4", name: "Dr. Suresh Kumar", qualification: "MBBS, MD", specialization: "Physician", experience: "15 Years", photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop" },
];

export default function DoctorPreview() {
  const { data: doctors, isLoading } = useFetch<any[]>("/api/doctors");
  const displayDoctors = doctors && doctors.length > 0 ? doctors.slice(0, 4) : mockDoctors;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-3">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Our Doctors</h2>
            <div className="w-14 h-1 bg-[#E91E63] rounded-full" />
          </div>
          <Link href="/doctors" className="text-[#E91E63] font-bold text-sm hover:text-[#6A1B9A] flex items-center gap-1 transition-colors">
            View All Doctors <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 18l6-6-6-6" strokeLinecap="round" /></svg>
          </Link>
        </div>
        {isLoading && !doctors ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <div key={i} className="bg-white rounded-2xl p-6 border h-64 animate-pulse bg-gray-100" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayDoctors.map((doctor: any) => (
              <div key={doctor._id || doctor.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 text-center">
                <div className="h-[5px] bg-gradient-to-r from-[#6A1B9A] to-[#E91E63]" />
                <div className="p-6">
                  <div className="relative w-28 h-28 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6A1B9A] to-[#E91E63] p-[3px]">
                      <div className="w-full h-full rounded-full bg-white p-[2px]">
                        <img src={doctor.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=6A1B9A&color=fff&size=200`} alt={doctor.name} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-[16px] font-extrabold text-gray-900 mb-0.5">{doctor.name}</h3>
                  <p className="text-[#6A1B9A] font-semibold text-xs mb-0.5">{doctor.qualification}</p>
                  <p className="text-gray-400 text-xs mb-1">{doctor.specialization}</p>
                  <p className="text-[#E91E63] text-xs font-semibold mb-4">Exp: {doctor.experience}</p>
                  <div className="flex justify-center gap-2 mb-4">
                    {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
                      <a key={i} href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#6A1B9A] hover:text-white hover:border-[#6A1B9A] transition-all"><Icon size={13} /></a>
                    ))}
                  </div>
                  <Link href="/appointment">
                    <button className="w-full bg-gradient-to-r from-[#6A1B9A] to-[#E91E63] text-white font-bold text-xs py-2.5 rounded-full shadow hover:opacity-90 transition-opacity">Book Appointment</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
