import { useFetch } from "@/hooks/useFetch";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: stats } = useFetch<any>("/api/stats");

  const cards = [
    { label: "Total Doctors", value: stats?.doctors ?? "—", color: "bg-[#6A1B9A]", icon: "👨‍⚕️", link: "/admin/doctors" },
    { label: "Appointments", value: stats?.appointments ?? "—", color: "bg-[#E91E63]", icon: "📅", link: "/admin/appointments" },
    { label: "Blog Posts", value: stats?.blogPosts ?? "—", color: "bg-[#00897B]", icon: "📝", link: "/admin/blog" },
    { label: "Active Ads", value: stats?.advertisements ?? "—", color: "bg-[#FF4081]", icon: "📢", link: "/admin/advertisements" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <Link key={card.label} href={card.link}>
            <div className={`${card.color} text-white rounded-2xl p-6 shadow-lg hover:opacity-90 transition-opacity cursor-pointer`}>
              <div className="text-4xl mb-3">{card.icon}</div>
              <div className="text-3xl font-black mb-1">{card.value}</div>
              <div className="text-white/80 font-semibold text-sm">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Manage Appointments", href: "/admin/appointments" },
            { label: "Manage Doctors", href: "/admin/doctors" },
            { label: "Manage Blog", href: "/admin/blog" },
            { label: "Manage Advertisements", href: "/admin/advertisements" },
          ].map(({ label, href }) => (
            <Link key={href} href={href}>
              <button className="bg-[#6A1B9A] text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#7B1FA2] transition-colors">{label}</button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
