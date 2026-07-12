import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Cross } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/facilities", label: "Facilities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/logo.jpeg"
            alt="Sri Sanjeevi Hospital Logo"
            className="w-16 h-16 object-contain rounded-full"
          />
          <div className="flex flex-col leading-none gap-0.5">
            <span className="text-[#6A1B9A] font-extrabold text-[19px] tracking-wide uppercase">SRI SANJEEVI</span>
            <span className="text-[#E91E63] font-bold text-[16px] tracking-widest uppercase">HOSPITAL</span>
            <span className="text-gray-500 text-[11px] font-medium tracking-wide">Care for Women. Care for Life.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-[13.5px] font-semibold text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-[#E91E63] ${
                location === link.href ? "text-[#E91E63]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Book Appointment Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/appointment">
            <button className="bg-gradient-to-r from-[#E91E63] to-[#6A1B9A] text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-lg hover:opacity-90 transition-opacity">
              Book Appointment
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-[#6A1B9A]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-700 font-semibold text-sm hover:text-[#E91E63] transition-colors py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/appointment" onClick={() => setMenuOpen(false)}>
            <button className="w-full mt-2 bg-gradient-to-r from-[#E91E63] to-[#6A1B9A] text-white font-bold text-sm px-5 py-2.5 rounded-full">
              Book Appointment
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
