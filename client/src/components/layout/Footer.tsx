import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-[#E91E63] to-[#6A1B9A] py-7">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-white">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Phone size={22} className="text-white fill-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg leading-tight">Need Immediate Help?</h3>
              <p className="text-white/85 text-sm">Our 24x7 Emergency Services Are Always Ready.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-white text-center">
              <p className="font-black text-2xl leading-none">99944 72774</p>
              <p className="font-black text-2xl leading-none">93634 34021</p>
            </div>
            <Link href="/appointment">
              <button className="bg-white text-[#6A1B9A] font-extrabold text-sm px-7 py-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                Book Appointment
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-[#2d0a4e] text-white pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Col 1 — Logo + About */}
            <div>
              <Link href="/" className="flex items-center gap-2.5 mb-5">
                <img
                  src="/logo.jpeg"
                  alt="Sri Sanjeevi Hospital Logo"
                  className="w-12 h-12 object-contain rounded-full bg-white p-0.5"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-black text-[14px] tracking-wide text-white uppercase">SRI SANJEEVI</span>
                  <span className="font-bold text-[11px] text-[#E91E63] tracking-widest uppercase">HOSPITAL</span>
                  <span className="text-white/50 text-[9px]">Care for Women. Care for Life.</span>
                </div>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Providing compassionate and advanced healthcare for women and children. Your trusted partner in maternity and beyond.
              </p>
              <div className="flex gap-3">
                {[FaFacebookF, FaInstagram, FaYoutube, FaTwitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E91E63] transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Quick Links */}
            <div>
              <h4 className="font-extrabold text-base mb-5 pb-2 border-b border-white/15">Quick Links</h4>
              <ul className="space-y-2.5 text-sm text-white/70">
                {[
                  ["Home", "/"],
                  ["About Us", "/about"],
                  ["Services", "/services"],
                  ["Doctors", "/doctors"],
                  ["Facilities", "/facilities"],
                  ["Gallery", "/gallery"],
                  ["Blog", "/blog"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-[#E91E63] transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Services */}
            <div>
              <h4 className="font-extrabold text-base mb-5 pb-2 border-b border-white/15">Our Services</h4>
              <ul className="space-y-2.5 text-sm text-white/70">
                {[
                  "Ante Natal Check-up",
                  "Delivery Services",
                  "Family Planning",
                  "Intensive Care Unit (ICU)",
                  "Accident & Emergency Care",
                  "Poison & Snake Bite Treatment",
                ].map((s) => (
                  <li key={s}>
                    <Link href="/services" className="hover:text-[#E91E63] transition-colors">
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Contact */}
            <div>
              <h4 className="font-extrabold text-base mb-5 pb-2 border-b border-white/15">Contact Info</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex gap-3">
                  <Phone size={16} className="text-[#E91E63] shrink-0 mt-0.5" />
                  <div>
                    <p>99944 72774</p>
                    <p>93634 34021</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <Mail size={16} className="text-[#E91E63] shrink-0 mt-0.5" />
                  <span>info@srisanjeevihospital.com</span>
                </li>
                <li className="flex gap-3 items-start">
                  <MapPin size={16} className="text-[#E91E63] shrink-0 mt-0.5" />
                  <span>Near Kalaimaigal School, Uthangai Main Road, Mathur</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-7 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/50">
            <p>© {new Date().getFullYear()} Sri Sanjeevi Hospital. All Rights Reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
