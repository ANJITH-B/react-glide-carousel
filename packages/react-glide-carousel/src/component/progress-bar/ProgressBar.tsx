import { useRef, useLayoutEffect } from "react";
import { useCarousel } from "../../context/carouselContext";
import { cn } from "../../lib/utils";

const Progress = ({ className }: { className?: string }) => {
    const { currentIndex: index, totalItems: length, interval } = useCarousel();
    const fillRefs = useRef<(HTMLDivElement | null)[]>([]);
    const animRef = useRef<Animation | null>(null);

    useLayoutEffect(() => {
        // Cancel the previous fill animation and reset all fills
        if (animRef.current) {
            animRef.current.cancel();
            animRef.current = null;
        }
        fillRefs.current.forEach(el => {
            if (el) el.style.width = "0%";
        });

        const activeFill = fillRefs.current[index];
        if (!activeFill) return;

        animRef.current = activeFill.animate(
            [{ width: "0%" }, { width: "100%" }],
            { duration: interval, easing: "ease-in-out", fill: "forwards" }
        );

        return () => {
            if (animRef.current) {
                animRef.current.cancel();
                animRef.current = null;
            }
        };
    }, [index, interval]);

    return (
        <div className={cn("flex flex-row gap-2 w-[300px] h-[5px]", className)}>
            {Array.from({ length }).map((_, i) => (
                <div
                    key={i}
                    className="h-full bg-gray-400 overflow-hidden rounded-full transition-[width] duration-300 ease-in-out"
                    style={{ width: i === index ? "100%" : "40%" }}
                >
                    <div
                        ref={el => { fillRefs.current[i] = el; }}
                        className="h-full bg-white"
                    />
                </div>
            ))}
        </div>
    );
};

export default Progress;
