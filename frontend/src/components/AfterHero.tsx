import {easeIn, easeInOut, motion} from "motion/react"
export const AfterHero = () => {
  return (
    <div className="h-screen w-full mt-20">
      <motion.div 
      initial={{opacity:0}}
      whileInView={{opacity:1}}
      transition={{
        delay:0.2,
        duration:0.5,
        ease: easeIn
      }}
      className="text-6xl text-bold w-[500px] ml-24">
        Built for thoughtful publishing
      </motion.div>
      <div className="w-full h-[50%] flex items-center justify-center ">
        <div className="w-[70%] h-[50vh] mt-30 border-y-[1px] border-neutral-700 border-dashed "></div>
      </div>
    </div>
  );
};
