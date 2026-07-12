import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/api";
import { openWhatsApp } from "@/lib/whatsapp";

const schema = z.object({
  patientName: z.string().min(2, "Name is required"),
  mobile: z.string().min(10, "Valid mobile number is required"),
  email: z.string().email("Valid email is required"),
  age: z.coerce.number().min(1, "Valid age is required"),
  gender: z.string().min(1, "Gender is required"),
  department: z.string().min(1, "Department is required"),
  date: z.string().min(1, "Date is required"),
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export default function Appointment() {
  const [isPending, setIsPending] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { patientName: "", mobile: "", email: "", age: 0, gender: "", department: "", date: "", message: "" },
  });

  const onSubmit = async (values: FormData) => {
    setIsPending(true);
    try {
      await api.createAppointment(values);
      setToast({ type: "success", msg: "Appointment booked! We will contact you shortly." });

      const message =
        `*New Appointment Request*\n` +
        `Name: ${values.patientName}\n` +
        `Mobile: ${values.mobile}\n` +
        `Email: ${values.email}\n` +
        `Age: ${values.age}\n` +
        `Gender: ${values.gender}\n` +
        `Department: ${values.department}\n` +
        `Preferred Date: ${values.date}\n` +
        `Message: ${values.message || "-"}`;
      openWhatsApp(message);

      reset();
    } catch {
      setToast({ type: "error", msg: "Something went wrong. Please try again." });
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Book an Appointment</h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto px-4">Schedule your visit with our expert doctors today.</p>
      </div>

      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl text-white font-semibold text-sm ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {toast.msg}
        </div>
      )}

      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-[#6A1B9A]/10">
            <h2 className="text-2xl font-bold text-[#6A1B9A] mb-8 border-b pb-4">Patient Information</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={label}>Full Name *</label>
                  <input {...register("patientName")} placeholder="Jane Doe" className={field} />
                  {errors.patientName && <p className={err}>{errors.patientName.message}</p>}
                </div>
                <div>
                  <label className={label}>Mobile Number *</label>
                  <input {...register("mobile")} placeholder="99999 99999" className={field} />
                  {errors.mobile && <p className={err}>{errors.mobile.message}</p>}
                </div>
                <div>
                  <label className={label}>Email Address *</label>
                  <input {...register("email")} type="email" placeholder="jane@example.com" className={field} />
                  {errors.email && <p className={err}>{errors.email.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={label}>Age *</label>
                    <input {...register("age")} type="number" placeholder="28" className={field} />
                    {errors.age && <p className={err}>{errors.age.message}</p>}
                  </div>
                  <div>
                    <label className={label}>Gender *</label>
                    <select {...register("gender")} className={field}>
                      <option value="">Select</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className={err}>{errors.gender.message}</p>}
                  </div>
                </div>
                <div>
                  <label className={label}>Department *</label>
                  <select {...register("department")} className={field}>
                    <option value="">Select Department</option>
                    <option value="Maternity">Maternity</option>
                    <option value="Paediatrics">Paediatrics</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Emergency">Emergency</option>
                    <option value="General Surgery">General Surgery</option>
                  </select>
                  {errors.department && <p className={err}>{errors.department.message}</p>}
                </div>
                <div>
                  <label className={label}>Preferred Date *</label>
                  <input {...register("date")} type="date" className={field} />
                  {errors.date && <p className={err}>{errors.date.message}</p>}
                </div>
              </div>
              <div>
                <label className={label}>Any specific problem or message?</label>
                <textarea {...register("message")} placeholder="Describe your symptoms briefly..." rows={4} className={field} />
              </div>
              <button type="submit" disabled={isPending} className="w-full text-lg h-14 rounded-full bg-gradient-to-r from-[#6A1B9A] to-[#E91E63] text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-60">
                {isPending ? "Booking..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}