"use client";

import { usePathname } from "next/navigation";
import { IntroductionSelf } from "./_components/introduction-self";
import { ProfileImage } from "./_components/profile-section";
import { ProfileText } from "./_components/profile-section";

export default function Home() {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="min-h-screen flex flex-col pt-[72px] md:pt-[112px] bg-white"
    >

      {/* Gunakan flex-row agar teks di kiri dan gambar di kanan berbagi ruang */}
      <div className="flex-1 flex flex-col md:flex-row w-full relative">

        {/* Sisi Kiri: Teks */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ProfileImage mobileOnly />
          <ProfileText />
        </div>

        {/* Sisi Kanan: Gambar Desktop (Sticky) */}
        {/* w-[40%] memastikan gambar tidak akan pernah menutupi teks karena mereka berbagi kolom */}
        <div className="hidden md:block md:w-[40%] lg:w-[45%] sticky top-[112px] h-[calc(100vh-112px)] border-l border-gray-100">
          <ProfileImage />
        </div>

      </div>

      <IntroductionSelf />

    </div>
  );
}