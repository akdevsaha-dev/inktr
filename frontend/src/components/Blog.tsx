"use client";
import { motion } from "motion/react";
import { usePostStore } from "@/store/postStore";
import { useEffect } from "react";
import { LogNav } from "./LogNav";
import Image from "next/image";
import { getReadingTime } from "@/utils/readingTime";
import { getFormattedDate } from "@/utils/formatDate";
import { Dot, Heart } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";

export const Blog = ({ post_id }: { post_id: number }) => {
  const liked = usePostStore((state) => state.liked);
  const updateLikes = usePostStore((state) => state.updateLikes);
  const isUpdatingLikes = usePostStore((state) => state.isUpdatingLikes);
  const post = usePostStore((state) => state.post);
  const isFetchingSinglePost = usePostStore(
    (state) => state.isFetchingSinglePost
  );
  const fetchSinglePost = usePostStore((state) => state.fetchSinglePost);
  const likeCount = usePostStore((state) => state.total_likes);

  const editor = useEditor({
    extensions: [StarterKit, Highlight],
    editable: false,
    immediatelyRender: false,
    content: post?.content ?? "", // Initialize with post content if available
    injectCSS: true, // Ensure default styling is applied
    editorProps: {
      attributes: {
        class: "prose prose-invert prose-lg max-w-none",
      },
    },
  });

  useEffect(() => {
    if (editor && post?.content) {
      // Only set content if editor exists and content has changed
      editor.commands.setContent(post.content);
    }
  }, [editor, post?.content]);

  useEffect(() => {
    fetchSinglePost({ post_id });
  }, [post_id, fetchSinglePost]);

  if (isFetchingSinglePost)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 3, transition: { duration: 0.8 } }}
        className="h-screen w-full flex items-center justify-center"
      >
        Loading
      </motion.div>
    );

  if (!post) return null;

  const readTime = getReadingTime(post.content);
  const time = getFormattedDate(post.created_at);

  return (
    <div className="min-h-screen">
      <LogNav />
      <div className="w-full min-h-screen flex items-center justify-center ">
        <div className="w-[50%] min-h-screen py-18">
          <div className="text-5xl font-extrabold">{post.title}</div>
          <div className="h-16 mt-6 flex items-center gap-4">
            <div>
              <Image
                src={post.author.avatar_url ?? "/noprofile.png"}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </div>

            <div className="text-neutral-300">{post.author.username}</div>
            <div className="px-4 cursor-pointer text-neutral-300 py-1 border rounded-full text-sm border-neutral-600">
              Follow
            </div>
            <div className="text-neutral-500 text-sm">{readTime}</div>
            <Dot className="text-neutral-600" />
            <div className="text-neutral-500 text-sm">{time}</div>
          </div>
          <div className="h-12 w-full border-y border-neutral-800 mt-5 flex items-center px-2">
            <Heart
              onClick={async () => {
                if (isUpdatingLikes) return;
                await updateLikes({ post_id });
              }}
              className={`cursor-pointer transition ${
                liked ? "fill-red-500 text-red-500" : "text-neutral-500"
              } ${isUpdatingLikes ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            <div className="pl-3  text-neutral-400">{likeCount}</div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none mt-16">
            {editor && post?.content ? (
              <EditorContent editor={editor} />
            ) : (
              <div className="text-neutral-500">Loading content…</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
