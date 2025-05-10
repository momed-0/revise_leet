'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home"); // Redirect to /home
  }, [router]);

  return null; // Render nothing while redirecting
}