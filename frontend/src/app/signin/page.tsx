"use client";
import { InputBox } from "@/components/InputBox";
import { useAuthStore } from "@/store/authStore";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signin = useAuthStore((state) => state.signin);
  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("All fields required");
      return;
    }
    const success = await signin({ email, password });
    if (success) {
      router.push("/blogs");
    }
    toast.error("Error signing in");
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
          <InputBox
            ref={passwordRef}
            value={password}
            label="Password"
            type="password"
            placeholder="••••••• •••••• •••••"
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                //   submitHandler();
              }
            }}
          />

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
            Continue
            <ChevronRight size={15} />
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
