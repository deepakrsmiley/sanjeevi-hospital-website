import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  Doctor, Service, Appointment, BlogPost,
  Testimonial, GalleryItem, Advertisement
} from "./models.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/sri_sanjeevi";

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB — seeding data...");

  await Promise.all([
    Doctor.deleteMany({}),
    Service.deleteMany({}),
    Appointment.deleteMany({}),
    BlogPost.deleteMany({}),
    Testimonial.deleteMany({}),
    GalleryItem.deleteMany({}),
    Advertisement.deleteMany({}),
  ]);

  await Doctor.insertMany([
    {
      name: "Dr. Priya Sharma",
      qualification: "MBBS, MD (OBG)",
      specialization: "Obstetrician & Gynaecologist",
      department: "Obstetrics & Gynaecology",
      experience: "12 Years",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      available: true,
    },
    {
      name: "Dr. Karthik Reddy",
      qualification: "MBBS, MS (Surgery)",
      specialization: "General Surgeon",
      department: "General Surgery",
      experience: "10 Years",
      photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
      available: true,
    },
    {
      name: "Dr. Anjali Patel",
      qualification: "MBBS, DCH, DNB",
      specialization: "Paediatrician",
      department: "Paediatrics",
      experience: "8 Years",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      available: true,
    },
    {
      name: "Dr. Suresh Kumar",
      qualification: "MBBS, MD",
      specialization: "Physician",
      department: "Internal Medicine",
      experience: "15 Years",
      photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      available: true,
    },
  ]);

  await Service.insertMany([
    {
      name: "Ante Natal Check-up",
      description: "Complete pregnancy care and monitoring for expectant mothers from conception to delivery.",
      icon: "antenatal",
      category: "Maternal",
      features: ["Regular monitoring", "Nutritional advice", "Foetal monitoring"],
    },
    {
      name: "Delivery Services",
      description: "Safe and compassionate delivery services including normal delivery and C-section.",
      icon: "delivery",
      category: "Maternal",
      features: ["Normal Delivery", "Caesarean Section", "Post-delivery care"],
    },
    {
      name: "Family Planning",
      description: "Safe & Effective Planning Services and expert counseling for couples.",
      icon: "family",
      category: "Reproductive",
      features: ["Contraception advice", "Fertility planning", "Counseling"],
    },
    {
      name: "ICU Services",
      description: "Intensive Care Unit equipped with advanced life-support and monitoring systems.",
      icon: "icu",
      category: "Critical Care",
      features: ["24/7 monitoring", "Life support", "Specialist care"],
    },
    {
      name: "Accident & Emergency Care",
      description: "Immediate Care, Swift Response — 24/7 trauma and emergency services.",
      icon: "emergency",
      category: "Emergency",
      features: ["24/7 emergency", "Trauma care", "Rapid response"],
    },
    {
      name: "Poison & Snake Bite Treatment",
      description: "Quick Care and specialized antivenom treatment for emergency poisoning cases.",
      icon: "poison",
      category: "Emergency",
      features: ["Antivenom therapy", "Toxicology support", "Emergency response"],
    },
  ]);

  await Testimonial.insertMany([
    {
      patientName: "Meena Krishnan",
      rating: 5,
      comment: "Sri Sanjeevi Hospital provided exceptional care during my pregnancy. Dr. Priya Sharma was attentive and professional throughout. I felt completely safe and supported. Highly recommend!",
      photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop",
    },
    {
      patientName: "Ranjitha Bose",
      rating: 5,
      comment: "Outstanding emergency care! The staff responded swiftly and the treatment was top-notch. The ICU facilities are world-class. Forever grateful.",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      patientName: "Lakshmi Devi",
      rating: 5,
      comment: "I delivered my baby here and the experience was wonderful. The nursing staff is extremely caring and the operation theatre is state-of-the-art.",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    {
      patientName: "Kavitha Sundaram",
      rating: 5,
      comment: "Excellent family planning counseling. The doctors are knowledgeable and empathetic. Truly a hospital that cares for women.",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
    {
      patientName: "Priya Ramesh",
      rating: 4,
      comment: "Very clean facilities and caring doctors. I came here for an emergency and they handled it very professionally. The 24/7 service is a blessing.",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    },
  ]);

  await BlogPost.insertMany([
    {
      title: "Healthy Diet During Pregnancy",
      excerpt: "Essential nutritional guidelines for expectant mothers to ensure optimal health for both mother and baby throughout pregnancy.",
      content: "Pregnancy is a critical time for nutrition...",
      category: "Pregnancy",
      author: "Dr. Priya Sharma",
      coverImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
      readTime: "5 min read",
    },
    {
      title: "Importance of Regular Check-ups",
      excerpt: "Why regular health screenings are vital for women at every stage of life — from prevention to early detection.",
      content: "Regular health check-ups are essential...",
      category: "Women's Health",
      author: "Dr. Anjali Patel",
      coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
      readTime: "4 min read",
    },
    {
      title: "Tips for a Healthy Lifestyle",
      excerpt: "Simple but effective lifestyle changes that can dramatically improve your overall health and quality of life.",
      content: "A healthy lifestyle starts with small changes...",
      category: "Lifestyle",
      author: "Dr. Suresh Kumar",
      coverImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800",
      readTime: "6 min read",
    },
    {
      title: "Understanding Maternity Care",
      excerpt: "A comprehensive guide to antenatal, intrapartum, and postnatal care for expecting mothers.",
      content: "Maternity care encompasses all aspects...",
      category: "Maternity",
      author: "Dr. Priya Sharma",
      coverImage: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800",
      readTime: "7 min read",
    },
    {
      title: "Child Vaccination Guide",
      excerpt: "Everything parents need to know about the childhood vaccination schedule and why it matters.",
      content: "Vaccines are one of the most important...",
      category: "Pediatrics",
      author: "Dr. Anjali Patel",
      coverImage: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800",
      readTime: "5 min read",
    },
  ]);

  await GalleryItem.insertMany([
    { title: "Operation Theatre", imageUrl: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600", category: "Facilities" },
    { title: "ICU Ward", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600", category: "Facilities" },
    { title: "Delivery Room", imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600", category: "Maternity" },
    { title: "Ambulance Service", imageUrl: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=600", category: "Emergency" },
    { title: "Pharmacy", imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600", category: "Services" },
    { title: "Reception Area", imageUrl: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600", category: "General" },
    { title: "Consultation Room", imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600", category: "General" },
    { title: "Laboratory", imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600", category: "Facilities" },
    { title: "Neonatal Care", imageUrl: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600", category: "Maternity" },
  ]);

  await Advertisement.insertMany([
    {
      title: "FREE Health Check-up Camp Every Sunday",
      description: "BP Check • Sugar Check • BMI Consultation & More",
      ctaText: "Book Now",
      ctaLink: "/appointment",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=340&fit=crop",
      active: true,
      bg: "from-[#7B1FA2] to-[#E91E63]",
      rightText: "Your Health, Our Priority",
      rightSub: "Stay Healthy, Stay Happy",
      type: "free",
    },
    {
      title: "Women's Health Screening Camp",
      description: "Comprehensive check-up for women of all ages. Free consultations with specialists.",
      ctaText: "Register Now",
      ctaLink: "/appointment",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=340&fit=crop",
      active: true,
      bg: "from-[#6A1B9A] to-[#AD1457]",
      rightText: "Empowering Women's Health",
      rightSub: "Register Today — Limited Slots!",
      type: "camp",
    },
    {
      title: "Maternity Package — Special Offer",
      description: "Complete antenatal care + delivery package at affordable rates.",
      ctaText: "Learn More",
      ctaLink: "/services",
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=340&fit=crop",
      active: true,
      bg: "from-[#880E4F] to-[#4A148C]",
      rightText: "Care for Every Mother",
      rightSub: "Compassionate Maternity Care",
      type: "camp",
    },
  ]);

  await Appointment.insertMany([
    {
      patientName: "Meena R",
      mobile: "9994472774",
      email: "meena@example.com",
      age: 28,
      gender: "Female",
      department: "Maternity",
      date: "2024-07-10",
      message: "Regular check-up",
      status: "confirmed",
    },
  ]);

  console.log("✅ Database seeded successfully!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
