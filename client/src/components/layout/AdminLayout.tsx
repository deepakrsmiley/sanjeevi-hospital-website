import React from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Calendar, Users, Image as ImageIcon, FileText, Megaphone, LogOut } from "lucide-react";
import { logoutAdmin } from "@/lib/adminAuth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    logoutAdmin();
    setLocation("/admin/login");
  };

  const links = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/appointments", icon: Calendar, label: "Appointments" },
    { href: "/admin/doctors", icon: Users, label: "Doctors" },
    { href: "/admin/blog", icon: FileText, label: "Blog Posts" },
    { href: "/admin/advertisements", icon: Megaphone, label: "Advertisements" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-primary to-[#380b6e] text-white hidden md:flex flex-col shadow-xl">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <span className="font-bold text-xl truncate">Admin Panel</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? "bg-white/20 font-bold" : "hover:bg-white/10 text-white/80"}`}>
                <Icon size={20} className={isActive ? "text-accent" : ""} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/80 transition-all">
            <LogOut size={20} />
            Back to Site
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/80 transition-all text-left">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:hidden border-b z-10">
          <span className="font-bold text-primary">Admin Panel</span>
          <Link href="/" className="text-sm font-medium text-muted-foreground">Exit</Link>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}