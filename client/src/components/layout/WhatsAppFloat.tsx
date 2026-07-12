import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppFloat() {
  const link = buildWhatsAppLink(
    "Hello Sri Sanjeevi Hospital, I would like to know more information."
  );

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-110 transition-transform duration-200"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping" />
      <svg
        viewBox="0 0 32 32"
        className="relative w-8 h-8 fill-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.004 2.667c-7.363 0-13.333 5.97-13.333 13.333 0 2.353.615 4.56 1.688 6.474L2.667 29.333l7.03-1.844a13.27 13.27 0 0 0 6.307 1.605h.006c7.362 0 13.333-5.97 13.333-13.333 0-3.562-1.387-6.912-3.905-9.43a13.246 13.246 0 0 0-9.434-3.664zm0 24.42h-.005a11.06 11.06 0 0 1-5.638-1.544l-.404-.24-4.172 1.094 1.114-4.067-.264-.418a11.06 11.06 0 0 1-1.696-5.912c0-6.115 4.977-11.09 11.093-11.09a11.02 11.02 0 0 1 7.842 3.25 11.02 11.02 0 0 1 3.246 7.847c0 6.115-4.977 11.09-11.116 11.09zm6.09-8.31c-.334-.167-1.97-.973-2.276-1.084-.306-.112-.528-.167-.75.167-.222.334-.86 1.084-1.055 1.306-.194.223-.389.25-.723.084-.334-.167-1.408-.519-2.682-1.654-.991-.884-1.66-1.977-1.855-2.31-.194-.334-.02-.514.146-.68.15-.15.334-.39.5-.585.167-.195.223-.334.334-.556.111-.223.055-.418-.028-.585-.084-.167-.75-1.806-1.028-2.474-.271-.65-.546-.562-.75-.573l-.639-.011c-.222 0-.583.083-.888.417-.306.334-1.167 1.14-1.167 2.78 0 1.639 1.195 3.223 1.362 3.446.167.222 2.352 3.592 5.7 5.036.796.343 1.417.549 1.902.703.799.254 1.526.218 2.101.132.641-.096 1.97-.805 2.248-1.583.278-.779.278-1.446.194-1.584-.083-.139-.305-.222-.639-.39z" />
      </svg>
    </a>
  );
}