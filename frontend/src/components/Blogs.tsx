"use client";
import { usePostStore } from "@/store/postStore";
import { BlogsCard } from "./BlogsCard";
import { LogNav } from "./LogNav";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { BlogSkeleton } from "./blogSkeleton";

export const Blogs = () => {
  const fetchPosts = usePostStore((state) => state.fetchPosts);
  const isFetchingPosts = usePostStore((state) => state.isFetchingPosts);
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);
  const posts = usePostStore((state) => state.posts);

  return (
    <div className="min-h-screen w-full text-white">
      <LogNav />
      <div className="flex justify-center w-full mt-4 px-4 gap-8">
        <div className="w-[75%] flex justify-center">
          <div className="w-[65%]">
            <div className="h-14 flex items-center border-b bg-[#11110a] border-neutral-800 sticky top-18 z-10">
              For You
            </div>
            {posts.map((post) =>
              isFetchingPosts ? (
                <BlogSkeleton key={post.id} />
              ) : (
                <BlogsCard
                  key={post.id}
                  authorName={post.author.username}
                  postId={post.id}
                  title={post.title}
                  content={post.content}
                  date={post.created_at}
                  avatar_url={post.author.avatar_url}
                  total_likes={post.total_likes}
                />
              )
            )}
          </div>
        </div>

        <div className="w-[25%] border-l  relative">
          <div
            className="sticky top-16"
            style={{
              maxHeight: "calc(100vh - 4rem)",
              overflowY: "auto",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
