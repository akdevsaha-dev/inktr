import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart } from "lucide-react";
import { getFormattedDate } from "@/utils/formatDate";
import { generateText, type JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
interface BlogsProp {
  authorName: string;
  title: string;
  content: JSONContent;
  date: string;
  avatar_url?: string;
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
  total_likes,
}: BlogsProp) => {
  const router = useRouter();
  const prettyDate = getFormattedDate(date);

  const plainText = generateText(content, [StarterKit, Highlight]);

  const preview =
    plainText.length > 130 ? plainText.slice(0, 130) + "..." : plainText;

  return (
    <div className="p-4 flex border-b border-neutral-800">
      <div
        onClick={() => router.push(`/blogs/blog/${postId}`)}
        className="w-[75%] cursor-pointer pt-8 pb-2"
      >
        <div className="flex gap-2 items-center">
          <Image
            src={avatar_url ?? "/noprofile.png"}
            alt="avatar"
            width={24}
            height={24}
          />
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
        <div className="w-40 h-28 bg-green-200" />
      </div>
    </div>
  );
};
