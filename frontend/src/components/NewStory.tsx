"use client";
import { useAuthStore } from "@/store/authStore";
import { usePostStore } from "@/store/postStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const NewStory = () => {
  const user = useAuthStore((state) => state.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createPost = usePostStore((state) => state.createPost);
  const router = useRouter();
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    const post = await createPost({ title, content });
    if (!post?.id) return;
    router.push(`/blogs/blog/${post.id}`);
  };
  return (
    <div className="min-h-screen">
      <div className="h-20 flex justify-center">
        <div className="w-[65%] h-20 font-sans text-3xl font-bold flex items-center">
          Inktr
        </div>
        <div className="flex items-center justify-center gap-8">
          <div className="px-3 text-sm py-1 bg-gray-500 hover:bg-gray-600 rounded-full">
            Publish
          </div>
          <Link href={"/me/notifications"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="0.7"
              stroke="currentColor"
              className="size-6 hover:text-neutral-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </Link>
          {user ? (
            <Image
              src={user.avatar_url ?? "/noprofile.png"}
              alt="avatar"
              width={28}
              height={28}
              className="rounded-full object-cover"
            />
          ) : null}
        </div>
      </div>
      <div className="mx-52 h-screen flex flex-col gap-6">
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-12 border"
        />
        <input
          type="text"
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-12 border"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
