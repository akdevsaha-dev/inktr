"use client";
import { AfterHero } from "@/components/AfterHero";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-[300vh] scroll-smooth w-full ">
      <Hero />
      <AfterHero />
    </div>
  );
}
