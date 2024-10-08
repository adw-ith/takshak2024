"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Events() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const events = Array.from({ length: 12 }, (_, i) => ({
    id: `event${i + 1}`,
    src: "/images/event1.jpg",
  }));

  // State to store the screen width
  const [screenWidth, setScreenWidth] = useState<number | null>(null);

  // Update the screen width after the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);

      // Add event listener for resize
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Transformation hooks for each set of images
  const translateXSet0 = [
    useTransform(scrollYProgress, [0.1, 0.237, 0.375], ["-200px", "0px", "-200px"]),
    useTransform(scrollYProgress, [0.1, 0.237, 0.375], ["200px", "0px", "200px"]),
  ];

  const translateXSet1 = [
    useTransform(scrollYProgress, [0.375, 0.512, 0.65], ["-200px", "0px", "-200px"]),
    useTransform(scrollYProgress, [0.375, 0.512, 0.65], ["200px", "0px", "200px"]),
  ];

  const translateXSet2 = [
    useTransform(scrollYProgress, [0.65, 0.787, 0.925], ["-200px", "0px", "-200px"]),
    useTransform(scrollYProgress, [0.65, 0.787, 0.925], ["200px", "0px", "200px"]),
  ];

  const translateYSet = [
    useTransform(scrollYProgress, [0.1, 0.237, 0.375], ["150px", "0px", "-150px"]),
    useTransform(scrollYProgress, [0.375, 0.512, 0.65], ["150px", "0px", "-150px"]),
    useTransform(scrollYProgress, [0.65, 0.787, 0.925], ["150px", "0px", "-150px"]),
  ];

  const opacitySet = [
    useTransform(scrollYProgress, [0.1, 0.237, 0.375], [0, 1, 0]),
    useTransform(scrollYProgress, [0.375, 0.512, 0.65], [0, 1, 0]),
    useTransform(scrollYProgress, [0.65, 0.787, 0.925], [0, 1, 0]),
  ];

  const displaySet = [
    useTransform(scrollYProgress, [0.1, 0.375], ["block", "none"]),
    useTransform(scrollYProgress, [0.375, 0.65], ["block", "none"]),
    useTransform(scrollYProgress, [0.65, 0.925], ["block", "none"]),
  ];

  // Function to get the appropriate translateX based on screen width
  const getTranslateX = (index: number, setIndex: number) => {
    if (screenWidth === null) return "0px"; // Default value instead of null

    const isLargeScreen = screenWidth > 1024;
    const isMediumScreen = screenWidth <= 1024 && screenWidth >= 768;

    if (isLargeScreen) {
      return index < 2
        ? [translateXSet0, translateXSet1, translateXSet2][setIndex][0]
        : [translateXSet0, translateXSet1, translateXSet2][setIndex][1];
    } else if (isMediumScreen) {
      return index % 2 === 0
        ? [translateXSet0, translateXSet1, translateXSet2][setIndex][0]
        : [translateXSet0, translateXSet1, translateXSet2][setIndex][1];
    } else {
      return index % 2 === 0
        ? [translateXSet0, translateXSet1, translateXSet2][setIndex][0]
        : [translateXSet0, translateXSet1, translateXSet2][setIndex][1];
    }
  };

  return (
    <motion.section ref={targetRef} className="h-[500vh] w-dvw bg-black flex flex-col justify-start items-center relative">
      <div className="sticky top-0 left-0 flex flex-col items-center justify-center gap-8 p-4 sm:p-8 w-full">
        <h2 className="text-5xl font-bold mb-8 text-white">Events</h2>

        {[0, 1, 2].map((setIndex) => (
          <motion.div key={setIndex} style={{ translateY: translateYSet[setIndex], opacity: opacitySet[setIndex], display: displaySet[setIndex] }}>
            <div className={`grid ${screenWidth && screenWidth < 768 ? "grid-cols-1" : screenWidth && screenWidth < 1024 ? "grid-cols-2" : "grid-cols-4"} gap-4 w-full`}>
              {events.slice(setIndex * 4, setIndex * 4 + 4).map((event, index) => (
                <motion.img
                  key={event.id}
                  src={event.src}
                  className={`object-cover ${screenWidth && screenWidth <= 768 ? "w-[200px] h-[auto]" : "w-[300px] h-[300px]"}`}
                  style={{
                    translateX: getTranslateX(index, setIndex),
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
