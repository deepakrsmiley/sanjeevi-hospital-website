import { Phone } from "lucide-react";

const AMBULANCE_NUMBER = "9994472774";

export default function CallFloat() {
  return (
    <a href={`tel:${AMBULANCE_NUMBER}`} aria-label="Call Ambulance" className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-red-600 shadow-lg hover:scale-110 transition-transform duration-200">
      <span className="absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75 animate-ping" />
      <Phone className="relative w-6 h-6 fill-white text-white" />
    </a>
  );
}