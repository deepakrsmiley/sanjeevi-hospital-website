import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Doctors from "@/pages/Doctors";
import Services from "@/pages/Services";
import Facilities from "@/pages/Facilities";
import Gallery from "@/pages/Gallery";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Appointment from "@/pages/Appointment";
import Contact from "@/pages/Contact";
import PublicLayout from "@/components/layout/PublicLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import RequireAdminAuth from "@/components/layout/RequireAdminAuth";
import AdminLogin from "@/pages/admin/AdminLogin";
import Dashboard from "@/pages/admin/Dashboard";
import AdminAppointments from "@/pages/admin/AdminAppointments";
import AdminDoctors from "@/pages/admin/AdminDoctors";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminAdvertisements from "@/pages/admin/AdminAdvertisements";

function Router() {
  return (
    <Switch>
      <Route path="/"><PublicLayout><Home /></PublicLayout></Route>
      <Route path="/about"><PublicLayout><About /></PublicLayout></Route>
      <Route path="/doctors"><PublicLayout><Doctors /></PublicLayout></Route>
      <Route path="/services"><PublicLayout><Services /></PublicLayout></Route>
      <Route path="/facilities"><PublicLayout><Facilities /></PublicLayout></Route>
      <Route path="/gallery"><PublicLayout><Gallery /></PublicLayout></Route>
      <Route path="/blog"><PublicLayout><Blog /></PublicLayout></Route>
      <Route path="/blog/:id"><PublicLayout><BlogDetail /></PublicLayout></Route>
      <Route path="/contact"><PublicLayout><Contact /></PublicLayout></Route>
      <Route path="/appointment"><PublicLayout><Appointment /></PublicLayout></Route>
      <Route path="/admin/login"><AdminLogin /></Route>
      <Route path="/admin"><RequireAdminAuth><AdminLayout><Dashboard /></AdminLayout></RequireAdminAuth></Route>
      <Route path="/admin/appointments"><RequireAdminAuth><AdminLayout><AdminAppointments /></AdminLayout></RequireAdminAuth></Route>
      <Route path="/admin/doctors"><RequireAdminAuth><AdminLayout><AdminDoctors /></AdminLayout></RequireAdminAuth></Route>
      <Route path="/admin/blog"><RequireAdminAuth><AdminLayout><AdminBlog /></AdminLayout></RequireAdminAuth></Route>
      <Route path="/admin/advertisements"><RequireAdminAuth><AdminLayout><AdminAdvertisements /></AdminLayout></RequireAdminAuth></Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter>
      <Router />
      <Toaster />
    </WouterRouter>
  );
}