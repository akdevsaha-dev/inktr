"use client";
import { InputBox } from "@/components/InputBox";
import { useAuthStore } from "@/store/authStore";
import { ChevronRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signin = useAuthStore((state) => state.signin);
  const loading = useAuthStore((state) => state.isSigningIn);
  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("All fields required");
      return;
    }
    const success = await signin({ email, password });
    if (success) {
      router.push("/blogs");
    }
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mt-20 h-[70vh] w-[420px]">
        <div className="mb-2 text-3xl/9 font-medium tracking-tight text-zinc-300">
          Welcome to Inktr
        </div>
        <div className="flex flex-col">
          <InputBox
            label="Email address"
            type="email"
            value={email}
            placeholder="example@gmail.com"
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                passwordRef.current?.focus();
              }
            }}
          />
          <div className="relative">
            <InputBox
              ref={passwordRef}
              value={password}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••• •••••• •••••"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[74px] text-zinc-400 hover:text-zinc-200"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="mt-5 flex w-full items-center gap-4">
            <input
              className="h-4 w-4"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label className="text-sm font-light text-white">Remember me</label>
          </div>
          <button
            onClick={handleSubmit}
            className={
              "mt-6 flex h-10 w-full items-center justify-center gap-2 border-[1px] bg-cyan-300 text-center text-sm font-semibold text-neutral-700 hover:bg-cyan-200"
            }
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <div className="flex items-center">
                Continue <ChevronRight size={15} />
              </div>
            )}
          </button>
        </div>

        <div className="mt-10 text-center">
          <span className="mr-1 text-sm font-light text-neutral-300">
            Not using trackly yet?
          </span>
          <Link
            href={"/signup"}
            className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Create an account now.
          </Link>
        </div>
      </div>
    </div>
  );
}
