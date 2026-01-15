"use client";
import { useAuthStore } from "@/store/authStore";
import { usePostStore } from "@/store/postStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";

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
        <SimpleEditor />
    </div>
  );
};
