import { useState, useRef, useLayoutEffect } from "react";
import { useCarousel } from "../../context/carouselContext";
import { cn } from "../../lib/utils";

const DURATION = 700;
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

type Props = { className?: string };

const ScaleSlider = ({ className }: Props) => {
    const { items: images, alts, currentIndex } = useCarousel();
    const [prevIndex, setPrevIndex] = useState<number | null>(null);
    const prevCurrentRef = useRef(currentIndex);
    const outRef = useRef<HTMLDivElement>(null);
    const inRef = useRef<HTMLDivElement>(null);
    const animsRef = useRef<Animation[]>([]);

    useLayoutEffect(() => {
        if (currentIndex === prevCurrentRef.current) return;
        const prev = prevCurrentRef.current;
        prevCurrentRef.current = currentIndex;
        setPrevIndex(prev);
    }, [currentIndex]);

    useLayoutEffect(() => {
        if (prevIndex === null) return;

        const out = outRef.current;
        const inEl = inRef.current;
        if (!out || !inEl) return;

        animsRef.current.forEach(a => a.cancel());

        const a1 = out.animate(
            [
                { transform: "scale(1)",    filter: "blur(0px)",  opacity: "1" }, // 1
                { transform: "scale(1.08)", filter: "blur(6px)",  opacity: "0" }, // 0.92
            ],
            { duration: DURATION, easing: EASING, fill: "forwards" }
        );
        const a2 = inEl.animate(
            [
                { transform: "scale(1.08)", filter: "blur(6px)",  opacity: "0" }, // 1.08
                { transform: "scale(1)",    filter: "blur(0px)",  opacity: "1" }, // 1
            ],
            { duration: DURATION, easing: EASING, fill: "both" }
        );

        const thisSet = [a1, a2];
        animsRef.current = thisSet;

        a2.onfinish = () => {
            if (animsRef.current !== thisSet) return;
            thisSet.forEach(a => a.cancel());
            animsRef.current = [];
            setPrevIndex(null);
        };

        return () => {
            animsRef.current.forEach(a => a.cancel());
            animsRef.current = [];
        };
    }, [prevIndex]);

    return (
        <div className={cn("relative w-full h-full overflow-hidden", className)}>
            {prevIndex !== null && (
                <div ref={outRef} className="absolute inset-0">
                    <img
                        src={images[prevIndex]}
                        alt={alts[prevIndex] ?? `Slide ${prevIndex + 1}`}
                        className="object-cover w-full h-full"
                        loading="eager"
                        decoding="sync"
                    />
                </div>
            )}
            <div ref={inRef} className="absolute inset-0">
                <img
                    src={images[currentIndex]}
                    alt={alts[currentIndex] ?? `Slide ${currentIndex + 1}`}
                    className="object-cover w-full h-full"
                    loading="eager"
                    decoding="sync"
                />
            </div>
        </div>
    );
};

export default ScaleSlider;
