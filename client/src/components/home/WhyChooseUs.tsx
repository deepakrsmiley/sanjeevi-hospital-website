const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
        <circle cx="12" cy="8" r="1" fill="currentColor"/>
        <path d="M9 14c.83 1.2 1.8 2 3 2s2.17-.8 3-2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Experienced Doctors",
    sub: "Round the clock specialized doctors",
    color: "bg-[#6A1B9A]/15 text-[#6A1B9A]",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "24x7 Services",
    sub: "Medical support round the clock",
    color: "bg-[#E91E63]/15 text-[#E91E63]",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    title: "Advanced Equipment",
    sub: "State-of-the-art medical technology",
    color: "bg-[#7B1FA2]/15 text-[#7B1FA2]",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M9 12l2 2 4-4" strokeLinecap="round"/>
      </svg>
    ),
    title: "Affordable Care",
    sub: "Healthcare accessible at affordable cost",
    color: "bg-[#00897B]/15 text-[#00897B]",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    title: "Patient Satisfaction",
    sub: "High priority for patient happiness",
    color: "bg-[#FF4081]/15 text-[#FF4081]",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-14 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-10">
          Why Choose Sri Sanjeevi Hospital?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 group"
            >
              <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-[14px] font-extrabold text-gray-900 mb-1 leading-snug">{feature.title}</h3>
              <p className="text-gray-400 text-[11px] leading-snug">{feature.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
