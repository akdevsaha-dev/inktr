import { easeIn, motion } from "motion/react";
import Link from "next/link";
export const AfterHero = () => {
  return (
    <div className="h-screen w-full mt-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.5,
          ease: easeIn,
        }}
        className="md:text-6xl text-5xl text-bold md:w-[500px] ml-7 md:ml-24"
      >
        Built for thoughtful publishing
      </motion.div>
      <div className="w-full min-h-[45%] gap-10 flex flex-col md:flex-row py-12 px-7 lg:px-24 md:px-18">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1  items-center"
        >
          <div className="text-neutral-500">01</div>
          <div className="font-serif text-2xl mt-8">
            Distraction free writing
          </div>
          <div className="mt-4 text-neutral-400  font-extralight">
            A clean canvas that lets your word breathe. No clutter, no noise.
            Just you and your thoughts
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex-1  items-center"
        >
          <div className="text-neutral-500">02</div>
          <div className="font-serif text-2xl mt-8">Beautiful typography</div>
          <div className="mt-4 text-neutral-400  font-extralight">
            Every post is rendered with meticulous attention to type. Your words
            deserve to look as good as they read.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex-1 items-center"
        >
          <div className="text-neutral-500">03</div>
          <div className="font-serif text-2xl mt-8">Publish instantly</div>
          <div className="mt-4 text-neutral-400  font-extralight">
            From draft to published in seconds. Share your ideas with the world
            when the moment is right.
          </div>
        </motion.div>
      </div>
      <div className="w-full min-h-[60%] px-7 lg:px-24 md:px-18 bg-black/10 border-y-4 border-y-neutral-900 pb-10">
        <div className="text-neutral-600 mt-12">TESTIMONIALS</div>
        <div className="text-5xl mt-4 font-serif text-neutral-200">
          Trusted by writers
        </div>
        <div className="flex  flex-col md:flex-row mt-24 w-full justify-center gap-18 ">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            className="flex-1 h-full flex flex-col justify-center"
          >
            <div className="lg:text-xl italic  font-serif text-neutral-300 leading-relaxed">
              "Chronicle changed how I think about writing online. It's not just
              a tool—it's a mindset shift toward simplicity and intention."
            </div>
            <div className="mt-4 font-bold">Elena Rossi</div>
            <div className="text-sm text-neutral-400">TECH ETHICIST</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            className="flex-1 h-full flex flex-col justify-center"
          >
            <div className="lg:text-xl italic text-neutral-300 font-serif leading-relaxed">
              "Finally, a platform that respects the craft. No gimmicks, no
              distractions. Just beautiful writing, beautifully presented."
            </div>
            <div className="mt-4 font-bold">Julian Vane</div>
            <div className="text-sm text-neutral-400">DESIGN CRITIC</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
            className="flex-1 h-full flex flex-col justify-center"
          >
            <div className="lg:text-xl italic text-neutral-300 font-serif leading-relaxed">
              "The attention to typography alone sets Chronicle apart. Every
              piece I publish feels considered, polished, professional."
            </div>
            <div className="mt-4 font-bold">Sarah Chen</div>
            <div className="text-sm text-neutral-400">NOVELIST</div>
          </motion.div>
        </div>
      </div>
      <div className="w-full flex items-center flex-col justify-center min-h-[500px] ">
        <div className="text-5xl md:text-7xl font-serif">Ready to write?</div>
        <div className="md:text-xl px-7 md:w-[600px] text-center md:px-0 mt-10 text-neutral-400">
          Join thousands of writers who've found their voice on Chronicle. Your
          first post is just a thought away.
        </div>
        <Link href="/signup">
          <div
            className="bg-white text-black mt-8 px-8 py-3 md:py-4 rounded-full md:text-xl  cursor-pointer
           hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
          >
            Create your blog
          </div>
        </Link>
      </div>
      <div className="min-h-[350px] px-18 md:px-28 py-20 w-full border-t border-neutral-600">
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          <div className="md:flex-1">
            <div className="text-2xl font-bold">Inkter</div>
            <div className="mt-3 text-neutral-300">Where ideas take form.</div>
          </div>

          <div className="flex flex-row gap-28 md:gap-10 md:flex-1 md:justify-between">
            <div className="flex flex-col text-neutral-400 text-sm space-y-4">
              <div className="font-bold text-white mb-7">PLATFORM</div>
              <Link href="/">Features</Link>
              <Link href="/">Testimonials</Link>
              <Link href="/">Network</Link>
            </div>

            <div className="flex flex-col text-neutral-400 text-sm space-y-4 md:mr-28 lg:mr-40">
              <div className="font-bold text-white mb-7">CONNECT</div>
              <Link href="/">Twitter</Link>
              <Link href="/">GitHub</Link>
              <Link href="/">LinkedIn</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="h-20  flex flex-col md:flex-row items-center justify-center md:justify-between mx-18  md:mx-28 text-neutral-400 text-sm border-t border-t-neutral-700">
        <div className="tracking-wide">
          {" "}
          © {new Date().getFullYear()} Inkter. All rights reserved.
        </div>
        <div className="flex items-center gap-2 md:gap-10 font-thin tracking-wider text-xs">
          <div>TERMS</div>
          <div>PRIVACY</div>
        </div>
      </div>
    </div>
  );
};
