export const Navbar = () => {
  return (
    <div className="h-18 w-full flex sticky top-0 z-1">
      <div className="w-[30%] font-sans text-3xl font-bold flex pl-28 items-center">
        Inktr
      </div>
      <div className="w-[70%] flex items-center justify-end">
        <div className="w-[60%]  text-sm text-white flex flex-row  justify-end gap-14">
          <div className="hover:text-white/45">Our story</div>
          <div className="hover:text-white/45">Membership</div>
          <div className="hover:text-white/45">Write</div>
          <div className="hover:text-white/45">Sign in</div>
        </div>
        <div className="px-6 h-7 bg-white/15 delay-125 transition ease-in-out flex items-center mr-20 hover:bg-white/45 text-sm hover:text-black/70 ml-14 rounded-full">
          Get Started
        </div>
      </div>
    </div>
  );
};
