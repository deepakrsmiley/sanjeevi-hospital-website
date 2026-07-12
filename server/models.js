import mongoose from "mongoose";

const { Schema } = mongoose;

// ── DOCTOR ─────────────────────────────────────────────────────────
const DoctorSchema = new Schema({
  name:           { type: String, required: true },
  qualification:  { type: String, required: true },
  specialization: { type: String, required: true },
  department:     { type: String, required: true },
  experience:     { type: String, default: "" },
  photo:          { type: String, default: "" },
  available:      { type: Boolean, default: true },
}, { timestamps: true });

// ── SERVICE ────────────────────────────────────────────────────────
const ServiceSchema = new Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  icon:        { type: String, default: "heart" },
  category:    { type: String, default: "General" },
  features:    [{ type: String }],
}, { timestamps: true });

// ── APPOINTMENT ────────────────────────────────────────────────────
const AppointmentSchema = new Schema({
  patientName: { type: String, required: true },
  mobile:      { type: String, required: true },
  email:       { type: String, required: true },
  age:         { type: Number, required: true },
  gender:      { type: String, required: true },
  department:  { type: String, required: true },
  date:        { type: String, required: true },
  message:     { type: String, default: "" },
  status:      { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
}, { timestamps: true });

// ── BLOG POST ──────────────────────────────────────────────────────
const BlogPostSchema = new Schema({
  title:       { type: String, required: true },
  excerpt:     { type: String, required: true },
  content:     { type: String, default: "" },
  category:    { type: String, required: true },
  author:      { type: String, default: "Sri Sanjeevi Hospital" },
  coverImage:  { type: String, default: "" },
  readTime:    { type: String, default: "5 min read" },
  publishedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// ── TESTIMONIAL ────────────────────────────────────────────────────
const TestimonialSchema = new Schema({
  patientName: { type: String, required: true },
  rating:      { type: Number, min: 1, max: 5, default: 5 },
  comment:     { type: String, required: true },
  photo:       { type: String, default: "" },
}, { timestamps: true });

// ── GALLERY ITEM ───────────────────────────────────────────────────
const GalleryItemSchema = new Schema({
  title:    { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, default: "General" },
}, { timestamps: true });

// ── ADVERTISEMENT ──────────────────────────────────────────────────
const AdvertisementSchema = new Schema({
  title:       { type: String, required: true },
  description: { type: String, default: "" },
  imageUrl:    { type: String, default: "" },
  ctaText:     { type: String, default: "Book Now" },
  ctaLink:     { type: String, default: "/appointment" },
  active:      { type: Boolean, default: true },
  bg:          { type: String, default: "from-[#7B1FA2] to-[#E91E63]" },
  rightText:   { type: String, default: "Your Health, Our Priority" },
  rightSub:    { type: String, default: "Stay Healthy, Stay Happy" },
  type:        { type: String, default: "camp" },
}, { timestamps: true });

// ── CONTACT ────────────────────────────────────────────────────────
const ContactSchema = new Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  phone:   { type: String, required: true },
  subject: { type: String, default: "" },
  message: { type: String, required: true },
  read:    { type: Boolean, default: false },
}, { timestamps: true });

export const Doctor       = mongoose.model("Doctor",       DoctorSchema);
export const Service      = mongoose.model("Service",      ServiceSchema);
export const Appointment  = mongoose.model("Appointment",  AppointmentSchema);
export const BlogPost     = mongoose.model("BlogPost",     BlogPostSchema);
export const Testimonial  = mongoose.model("Testimonial",  TestimonialSchema);
export const GalleryItem  = mongoose.model("GalleryItem",  GalleryItemSchema);
export const Advertisement = mongoose.model("Advertisement", AdvertisementSchema);
export const Contact      = mongoose.model("Contact",      ContactSchema);
