const BASE = import.meta.env.VITE_API_URL || "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Doctors
  getDoctors: (params?: { department?: string; search?: string }) => {
    const qs = new URLSearchParams(params as any).toString();
    return request<any[]>(`/doctors${qs ? `?${qs}` : ""}`);
  },
  getDoctor: (id: string) => request<any>(`/doctors/${id}`),
  createDoctor: (data: any) => request<any>("/doctors", { method: "POST", body: JSON.stringify(data) }),
  updateDoctor: (id: string, data: any) => request<any>(`/doctors/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteDoctor: (id: string) => request<any>(`/doctors/${id}`, { method: "DELETE" }),
  deleteAllDoctors: () => request<any>("/doctors", { method: "DELETE" }),

  // Services
  getServices: () => request<any[]>("/services"),
  createService: (data: any) => request<any>("/services", { method: "POST", body: JSON.stringify(data) }),
  updateService: (id: string, data: any) => request<any>(`/services/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteService: (id: string) => request<any>(`/services/${id}`, { method: "DELETE" }),

  // Appointments
  getAppointments: () => request<any[]>("/appointments"),
  createAppointment: (data: any) => request<any>("/appointments", { method: "POST", body: JSON.stringify(data) }),
  updateAppointment: (id: string, data: any) => request<any>(`/appointments/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteAppointment: (id: string) => request<any>(`/appointments/${id}`, { method: "DELETE" }),

  // Blog
  getBlogPosts: (params?: { category?: string }) => {
    const qs = new URLSearchParams(params as any).toString();
    return request<any[]>(`/blog${qs ? `?${qs}` : ""}`);
  },
  getBlogPost: (id: string) => request<any>(`/blog/${id}`),
  createBlogPost: (data: any) => request<any>("/blog", { method: "POST", body: JSON.stringify(data) }),
  updateBlogPost: (id: string, data: any) => request<any>(`/blog/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteBlogPost: (id: string) => request<any>(`/blog/${id}`, { method: "DELETE" }),
  deleteAllBlogPosts: () => request<any>("/blog", { method: "DELETE" }),

  // Testimonials
  getTestimonials: () => request<any[]>("/testimonials"),

  // Gallery
  getGallery: () => request<any[]>("/gallery"),

  // Advertisements
  getAdvertisements: () => request<any[]>("/advertisements"),
  createAd: (data: any) => request<any>("/advertisements", { method: "POST", body: JSON.stringify(data) }),
  updateAd: (id: string, data: any) => request<any>(`/advertisements/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteAd: (id: string) => request<any>(`/advertisements/${id}`, { method: "DELETE" }),
  deleteAllAds: () => request<any>("/advertisements", { method: "DELETE" }),

  // Contact
  submitContact: (data: any) => request<any>("/contact", { method: "POST", body: JSON.stringify(data) }),
  getContacts: () => request<any[]>("/contact"),

  // Stats
  getStats: () => request<any>("/stats"),
};
