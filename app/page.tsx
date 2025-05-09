'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkGoServiceHealth } from "@/app/api/health";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    checkGoServiceHealth();
    router.push("/home"); // Redirect to /home
  }, [router]);

  return null; // Render nothing while redirecting
}