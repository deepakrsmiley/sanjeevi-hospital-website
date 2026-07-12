import { Trophy, Users, HeartPulse, Building2 } from "lucide-react";

export default function About() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto px-4">
          Discover the vision, mission, and the passionate team behind Sri Sanjeevi Hospital's exceptional healthcare services.
        </p>
      </div>

      {/* Overview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800" 
              alt="Hospital Building" 
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Sri Sanjeevi Hospital</h2>
            <h3 className="text-xl font-medium text-secondary">Care for Women. Care for Life.</h3>
            <p className="text-muted-foreground leading-relaxed">
              Established with a deep commitment to women's and maternity health, Sri Sanjeevi Hospital has been a beacon of hope and healing in the community. We combine the latest medical technology with compassionate care to ensure the well-being of every patient who walks through our doors.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our multidisciplinary team of expert doctors, dedicated nurses, and support staff work tirelessly round the clock to provide comprehensive healthcare services—ranging from routine check-ups to complex surgical procedures and intensive emergency care.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <Building2 size={40} className="mx-auto text-secondary mb-4" />
            <h4 className="text-4xl font-bold">10+</h4>
            <p className="text-white/80 font-medium">Years of Excellence</p>
          </div>
          <div className="space-y-2">
            <Users size={40} className="mx-auto text-secondary mb-4" />
            <h4 className="text-4xl font-bold">25+</h4>
            <p className="text-white/80 font-medium">Expert Doctors</p>
          </div>
          <div className="space-y-2">
            <HeartPulse size={40} className="mx-auto text-secondary mb-4" />
            <h4 className="text-4xl font-bold">15K+</h4>
            <p className="text-white/80 font-medium">Happy Patients</p>
          </div>
          <div className="space-y-2">
            <Trophy size={40} className="mx-auto text-secondary mb-4" />
            <h4 className="text-4xl font-bold">24/7</h4>
            <p className="text-white/80 font-medium">Emergency Services</p>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/10 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To be the most trusted and preferred healthcare provider for women and children, setting the highest standards of medical excellence and compassionate care in the region.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-secondary/10 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To deliver comprehensive, patient-centered healthcare through a team of expert medical professionals, advanced technology, and a healing environment, ensuring optimal health outcomes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-accent/10 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-accent mb-4">Our Values</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Compassion in every action</li>
                <li>• Excellence in clinical care</li>
                <li>• Integrity and transparency</li>
                <li>• Respect for patient dignity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
