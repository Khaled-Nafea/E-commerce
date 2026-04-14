"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      router.replace(`/allorders/${userId}`);
    }
  }, [router]);

  return <div>Loading...</div>;
}