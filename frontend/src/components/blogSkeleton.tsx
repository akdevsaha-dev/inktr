export const BlogSkeleton = () => {
  return (
    <div className="p-4 flex animate-pulse">
      <div className="w-[75%] cursor-pointer pt-8 pb-2 ">
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 rounded-full bg-neutral-800"></div>
          <div className=" w-40 bg-neutral-800 h-2"></div>
        </div>
        <div className="mt-4 w-96 h-4 bg-neutral-800"></div>
        <div className=" mt-3 w-80 h-5 bg-neutral-800"></div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-40 h-28 bg-neutral-800 mt-5"></div>
      </div>
    </div>
  );
};
