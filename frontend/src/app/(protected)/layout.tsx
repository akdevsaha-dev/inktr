"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (!isCheckingAuth && !user) {
      router.replace("/signin");
    }
  }, [user, isCheckingAuth, router]);

  if (isCheckingAuth || !user) return null;

  return <>{children}</>;
}
