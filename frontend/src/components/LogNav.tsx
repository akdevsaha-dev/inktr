import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";

export const LogNav = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="h-18 z-1  bg-[#11110a] w-full sticky top-0 flex border-neutral-800 border-b-[1px]">
      <div className="flex-1 font-sans text-3xl font-bold flex pl-28 items-center">
        Inktr
      </div>
      <div className="flex-1 flex gap-10 justify-end items-center pr-10">
        <Link
          href={"/me/new-story"}
          className="gap-2 flex items-center hover:text-neutral-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="0.7"
            stroke="currentColor"
            className="size-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>

          <div>write</div>
        </Link>
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
  );
};
