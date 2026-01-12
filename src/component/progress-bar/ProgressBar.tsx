"use client";
import { motion } from "framer-motion";
import { useCarousel } from "../../context/carouselContext";
import { cn } from "../../lib/utils";



const Progress = ({ className }: { className?: string }) => {
    const { currentIndex: index, totalItems: length, interval } = useCarousel();

    return (
        <div className={cn("flex flex-row gap-2 w-[300px] h-[5px]", className)}  >
            {Array.from({ length }).map((_, i) => (
                <motion.div key={i}
                    animate={{ width: i === index ? "100%" : "40%" }}
                    className="h-full w-full bg-gray-400 overflow-hidden rounded-full"
                >
                    <motion.div
                        className="h-full w-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: i === index ? "100%" : "0%" }}
                        transition={{
                            duration: i === index ? interval / 1000 : 0,
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default Progress;
