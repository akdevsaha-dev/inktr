"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50  ">
      <div className="flex items-center justify-between px-6 md:px-28 h-16">

        <div className="font-sans text-2xl md:text-3xl font-bold">
          Inktr
        </div>

        <div className="hidden lg:flex items-center gap-14 text-sm text-white">
          <div className="hover:text-white/45 cursor-pointer">Our story</div>
          <div className="hover:text-white/45 cursor-pointer">Membership</div>
          <div className="hover:text-white/45 cursor-pointer">Write</div>
          <div className="hover:text-white/45 cursor-pointer">Sign in</div>

          <div className="px-6 h-7 bg-white/15 transition hover:bg-white/45 hover:text-black/70 rounded-full flex items-center cursor-pointer">
            Get Started
          </div>
        </div>

        <div className="lg:hidden flex items-center gap-4">
          <div className="px-4 py-1 bg-white/15 rounded-full text-sm hover:bg-white/45 hover:text-black/70 transition cursor-pointer">
            Get Started
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="text-white"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden px-6 py-6 space-y-6 text-sm text-white border-t border-white/10 bg-black">
          <div className="hover:text-white/45">Our story</div>
          <div className="hover:text-white/45">Membership</div>
          <div className="hover:text-white/45">Write</div>
          <div className="hover:text-white/45">Sign in</div>
        </div>
      )}
    </nav>
  );
};