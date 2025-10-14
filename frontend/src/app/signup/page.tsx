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
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const signup = useAuthStore((state) => state.signup);
  const handleSubmit = async () => {
    if (!username || !username || !password) {
      toast.error("All fields are required.");
      return;
    }
    const success = await signup({ username, email, password });

    if (success) {
      router.push("/blogs");
    }
    toast.error("Error signing up");
  };
  return (
    <div className="h-screen w-full text-white">
      <div className="flex h-[90vh] w-full flex-col items-center justify-center">
        <div className="h-[70vh] mt-14 w-[420px]">
          <div className="mb-2 text-3xl/9 font-medium tracking-tight text-zinc-300">
            Create an account
          </div>
          <div className="flex flex-col">
            <InputBox
              label="Username"
              type="text"
              value={username}
              placeholder="John doe"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  emailRef.current?.focus();
                }
              }}
            />
            <InputBox
              label="Email address"
              type="email"
              value={email}
              placeholder="example@email.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onKeyDown={(e) => {
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                }
              }}
            />

            <div className="mt-5 flex w-full items-center gap-4">
              <input
                className="h-4 w-4"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                onClick={handleSubmit}
              />
              <label className="text-sm font-light text-white">
                I agree to the{" "}
                <Link className="px-1 underline underline-offset-2" href={""}>
                  Terms of Service
                </Link>{" "}
                and
                <Link href={""} className="px-1 underline underline-offset-2">
                  {" "}
                  Privacy Policy.
                </Link>
              </label>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!agree}
              className={`mt-6 flex h-10 w-full items-center justify-center gap-2 border-[1px] text-center text-sm font-semibold text-neutral-700 ${
                agree
                  ? "bg-cyan-300 hover:bg-cyan-200"
                  : "cursor-not-allowed border-cyan-300 bg-[#b0e4ed]"
              }`}
            >
              Continue
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="mt-10 text-center">
            <span className="mr-1 text-sm font-light text-neutral-300">
              Already have an account?
            </span>
            <Link
              href={"/signin"}
              className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Sign in.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
