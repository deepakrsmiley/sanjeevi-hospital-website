import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { isAdminAuthed } from "@/lib/adminAuth";

interface RequireAdminAuthProps {
  children: React.ReactNode;
}

export default function RequireAdminAuth({ children }: RequireAdminAuthProps) {
  const [, setLocation] = useLocation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAdminAuthed()) {
      setLocation("/admin/login");
    } else {
      setChecked(true);
    }
  }, []);

  if (!checked) return null;

  return <>{children}</>;
}