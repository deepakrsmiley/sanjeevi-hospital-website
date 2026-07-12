import { Phone, Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function TopHeader() {
  return (
    <div className="bg-gradient-to-r from-[#6A1B9A] to-[#8e24aa] text-white py-2 px-4 text-xs font-medium hidden md:flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <Phone size={12} className="fill-white" />
        <span>24/7 Emergency Services</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Mail size={12} />
          <span>info@srisanjeevihospital.com</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={12} />
          <span>Near Kalaimaigal School, Uthangai Main Road, Mathur</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-[#FF4081] font-bold">
        <FaWhatsapp size={14} />
        <span>99944 72774 / 93634 34021</span>
      </div>
    </div>
  );
}
