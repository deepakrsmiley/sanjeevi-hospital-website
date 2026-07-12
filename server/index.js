import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import {
  Doctor, Service, Appointment, BlogPost,
  Testimonial, GalleryItem, Advertisement, Contact
} from "./models.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/sri_sanjeevi";

app.use(cors({ origin: ["https://www.srisanjeeviihospital.com", "https://srisanjeeviihospital.com"] }));
// Higher limit so base64 photo/image data (stored directly in MongoDB) can be uploaded
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// ── DB ──────────────────────────────────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ── DOCTORS ────────────────────────────────────────────────────────
app.get("/api/doctors", async (req, res) => {
  try {
    const { department, search } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (search) filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { specialization: { $regex: search, $options: "i" } }
    ];
    const doctors = await Doctor.find(filter).sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/doctors", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put("/api/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doctor);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete("/api/doctors/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Delete ALL doctors (admin bulk action)
app.delete("/api/doctors", async (req, res) => {
  try {
    const result = await Doctor.deleteMany({});
    res.json({ message: "All doctors deleted", deletedCount: result.deletedCount });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── SERVICES ───────────────────────────────────────────────────────
app.get("/api/services", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.json(services);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/services", async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put("/api/services/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete("/api/services/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── APPOINTMENTS ───────────────────────────────────────────────────
app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/appointments", async (req, res) => {
  try {
    const appointment = new Appointment({ ...req.body, status: "pending" });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put("/api/appointments/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(appointment);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete("/api/appointments/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── BLOG ───────────────────────────────────────────────────────────
app.get("/api/blog", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const posts = await BlogPost.find(filter).sort({ publishedAt: -1 });
    res.json(posts);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/blog/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/blog", async (req, res) => {
  try {
    const post = new BlogPost({ ...req.body, publishedAt: new Date() });
    await post.save();
    res.status(201).json(post);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put("/api/blog/:id", async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete("/api/blog/:id", async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Delete ALL blog posts (admin bulk action)
app.delete("/api/blog", async (req, res) => {
  try {
    const result = await BlogPost.deleteMany({});
    res.json({ message: "All blog posts deleted", deletedCount: result.deletedCount });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── TESTIMONIALS ───────────────────────────────────────────────────
app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── GALLERY ────────────────────────────────────────────────────────
app.get("/api/gallery", async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── ADVERTISEMENTS ─────────────────────────────────────────────────
app.get("/api/advertisements", async (req, res) => {
  try {
    const ads = await Advertisement.find({ active: true }).sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/advertisements", async (req, res) => {
  try {
    const ad = new Advertisement(req.body);
    await ad.save();
    res.status(201).json(ad);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put("/api/advertisements/:id", async (req, res) => {
  try {
    const ad = await Advertisement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ad);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete("/api/advertisements/:id", async (req, res) => {
  try {
    await Advertisement.findByIdAndDelete(req.params.id);
    res.json({ message: "Advertisement deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Delete ALL advertisements (admin bulk action)
app.delete("/api/advertisements", async (req, res) => {
  try {
    const result = await Advertisement.deleteMany({});
    res.json({ message: "All advertisements deleted", deletedCount: result.deletedCount });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── CONTACT ────────────────────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Message received. We'll contact you shortly." });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── DASHBOARD STATS ────────────────────────────────────────────────
app.get("/api/stats", async (req, res) => {
  try {
    const [doctors, appointments, blogPosts, ads] = await Promise.all([
      Doctor.countDocuments(),
      Appointment.countDocuments(),
      BlogPost.countDocuments(),
      Advertisement.countDocuments({ active: true }),
    ]);
    res.json({ doctors, appointments, blogPosts, advertisements: ads });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── SERVE FRONTEND IN PRODUCTION ───────────────────────────────────
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "../client/dist");
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`🏥 Sri Sanjeevi Hospital API running on http://localhost:${PORT}`);
});
