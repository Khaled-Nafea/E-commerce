"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/profile/address`);
  }, [router]);

  return <div>Loading...</div>;
}

