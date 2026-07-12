import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Link } from "wouter";

export default function Doctors() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("all");
  const { data: doctors, isLoading } = useFetch<any[]>("/api/doctors");

  const departments = doctors ? Array.from(new Set(doctors.map((d: any) => d.department))) : ["Obstetrics & Gynaecology", "Paediatrics", "General Surgery", "Internal Medicine"];
  const filtered = doctors?.filter((d: any) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "all" || d.department === dept;
    return matchSearch && matchDept;
  });

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-[#6A1B9A] to-[#E91E63] text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Doctors</h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto px-4">Meet our team of experienced and dedicated medical professionals.</p>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-12 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeWidth="2"/></svg>
              <input placeholder="Search doctors by name or specialization..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A1B9A]/30" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="w-full md:w-64 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A1B9A]/30" value={dept} onChange={e => setDept(e.target.value)}>
              <option value="all">All Departments</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1,2,3,4].map(i => <div key={i} className="bg-white rounded-2xl p-6 border h-64 animate-pulse" />)}
            </div>
          ) : (filtered?.length === 0) ? (
            <div className="text-center py-20"><h3 className="text-2xl font-bold text-gray-400">No doctors found matching your criteria.</h3></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered?.map((doctor: any) => (
                <div key={doctor._id} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 border">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <img src={doctor.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=6A1B9A&color=fff&size=200`} alt={doctor.name} className="w-full h-full object-cover rounded-full border-4 border-gray-100" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-[#6A1B9A] font-medium text-sm mb-1">{doctor.qualification}</p>
                  <p className="text-gray-500 text-sm mb-2">{doctor.specialization}</p>
                  <p className="text-xs text-[#E91E63] font-medium mb-4">{doctor.experience} Experience</p>
                  <Link href="/appointment">
                    <button className="w-full rounded-full bg-[#6A1B9A] hover:bg-[#7B1FA2] text-white font-bold text-sm py-2.5 transition-colors">Book Appointment</button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
