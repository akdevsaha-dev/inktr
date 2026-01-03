import { usePostStore } from "@/store/postStore";
import { getFormattedDate } from "@/utils/formatDate";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogsProp {
  authorName: string;
  title: string;
  content: string;
  date: string;
  avatar_url: string | undefined;
  postId: number;
  total_likes: number;
}
export const BlogsCard = ({
  authorName,
  title,
  content,
  date,
  avatar_url,
  postId,
  total_likes
}: BlogsProp) => {
  const preview =
    content.length > 100 ? content.slice(0, 130) + "..." : content;
  const router = useRouter();
  const prettyDate = getFormattedDate(date);
  return (
    <div className="p-4  flex border-b border-neutral-800">
      <div
        onClick={() => router.push(`/blogs/blog/${postId}`)}
        className="w-[75%] cursor-pointer pt-8 pb-2"
      >
        <div className="flex gap-2 items-center">
          <div className="">
            <Image
              src={avatar_url ?? "/noprofile.png"}
              alt="avatar"
              width={24}
              height={24}
            />
          </div>
          <div className="text-sm font-thin text-neutral-400">{authorName}</div>
        </div>
        <div className="font-bold mt-4 text-white/90 text-2xl">{title}</div>
        <div className="text-white/70 mt-3">{preview}</div>
        <div className="mt-4 text-sm flex items-center text-neutral-400">
          <div className="pr-6">{prettyDate}</div>
          <Heart size={15} />
          <div className="pl-2 pt-[1px]">{total_likes}</div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-40 h-28 bg-green-200"></div>
      </div>
    </div>
  );
};
