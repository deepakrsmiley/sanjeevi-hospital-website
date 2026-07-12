import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, AlertCircle } from "lucide-react";
import { api } from "@/api";
import { openWhatsApp } from "@/lib/whatsapp";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone is required"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [isPending, setIsPending] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const onSubmit = async (values: FormData) => {
    setIsPending(true);
    try {
      await api.submitContact(values);
      setToast({ type: "success", msg: "Message sent! We will get back to you shortly." });

      const message =
        `*New Contact Message*\n` +
        `Name: ${values.name}\n` +
        `Email: ${values.email}\n` +
        `Phone: ${values.phone}\n` +
        `Subject: ${values.subject || "-"}\n` +
        `Message: ${values.message}`;
      openWhatsApp(message);

      reset();
    } catch {
      setToast({ type: "error", msg: "Could not send message. Please try again." });
    } finally {
      setIsPending(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const field = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A1B9A]/30";
  const label = "block text-sm font-semibold text-gray-700 mb-1";
  const err = "text-xs text-red-500 mt-1";

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-[#6A1B9A] to-[#E91E63] text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto px-4">We are here to help. Reach out for any queries or emergency assistance.</p>
      </div>

      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl text-white font-semibold text-sm ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {toast.msg}
        </div>
      )}

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-6">
              {[
                { icon: <MapPin />, title: "Our Location", text: "Near Kalaimaigal School, Uthangai Main Road, Mathur", color: "bg-[#6A1B9A]/10 text-[#6A1B9A]" },
                { icon: <Phone />, title: "Phone Number", text: "99944 72774\n93634 34021", color: "bg-[#E91E63]/10 text-[#E91E63]" },
                { icon: <Mail />, title: "Email Address", text: "info@srisanjeevihospital.com", color: "bg-[#FF4081]/10 text-[#FF4081]" },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center shrink-0`}>{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm whitespace-pre-line">{item.text}</p>
                  </div>
                </div>
              ))}
              <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                <div className="flex items-center gap-3 text-red-600 font-bold text-lg mb-2"><AlertCircle /> Emergency 24/7</div>
                <p className="text-red-800 text-sm mb-4">Our emergency department is open 24/7. In case of emergency, call us immediately.</p>
                <a href="tel:9994472774" className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold rounded-full py-2.5 text-sm transition-colors">Call Ambulance</a>
              </div>
            </div>
            <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-[#6A1B9A]/10">
              <h2 className="text-2xl font-bold text-[#6A1B9A] mb-8 border-b pb-4">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className={label}>Full Name *</label><input {...register("name")} placeholder="Your Name" className={field} />{errors.name && <p className={err}>{errors.name.message}</p>}</div>
                  <div><label className={label}>Email Address *</label><input {...register("email")} placeholder="Your Email" className={field} />{errors.email && <p className={err}>{errors.email.message}</p>}</div>
                  <div><label className={label}>Phone Number *</label><input {...register("phone")} placeholder="Your Phone" className={field} />{errors.phone && <p className={err}>{errors.phone.message}</p>}</div>
                  <div><label className={label}>Subject</label><input {...register("subject")} placeholder="Subject" className={field} /></div>
                </div>
                <div><label className={label}>Message *</label><textarea {...register("message")} placeholder="How can we help you?" rows={6} className={field} />{errors.message && <p className={err}>{errors.message.message}</p>}</div>
                <button type="submit" disabled={isPending} className="px-12 text-lg h-14 rounded-full bg-[#6A1B9A] hover:bg-[#7B1FA2] text-white font-bold transition-colors disabled:opacity-60">
                  {isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="h-[400px] w-full">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15665.91892837311!2d78.36195655!3d11.0006242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAwJzAyLjIiTiA3OMKwMjEnNDMuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="grayscale opacity-90" />
      </section>
    </div>
  );
}