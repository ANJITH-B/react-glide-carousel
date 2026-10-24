import { motion, AnimatePresence } from "framer-motion";
import { useCarousel } from "../../context/carouselContext";
import { innerVariants, variants } from "./animation";
import { cn } from "../../lib/utils";

type Props = {
    className?: string;
};

const ImageSlider = ({ className }: Props) => {
    const { items: images, currentIndex: index, direction } = useCarousel();

    return (
        <div className={cn(`relative w-full h-full overflow-hidden`, className)}>
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                <motion.div
                    key={index + "-wrapper"}
                    className="absolute inset-0 overflow-hidden"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                    <motion.div
                        key={index + "-image"}
                        className="absolute inset-0"
                        custom={direction}
                        variants={innerVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        <img
                            src={images[index]}
                            alt={`Slide ${index}`}
                            className="object-cover w-full h-full"
                            loading="eager"
                            decoding="sync"
                        />
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ImageSlider;