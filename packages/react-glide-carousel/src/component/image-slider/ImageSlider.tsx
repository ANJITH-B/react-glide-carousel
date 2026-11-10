import { useState, useRef, useLayoutEffect } from "react";
import { useCarousel } from "../../context/carouselContext";
import { cn } from "../../lib/utils";

const DURATION = 1000;
const EASING = "cubic-bezier(0.43, 0.13, 0.23, 0.96)";

type Props = { className?: string };

const ImageSlider = ({ className }: Props) => {
    const { items: images, alts, currentIndex, direction } = useCarousel();
    const [prevIndex, setPrevIndex] = useState<number | null>(null);
    const prevCurrentRef = useRef(currentIndex);
    const outRef = useRef<HTMLDivElement>(null);
    const outInnerRef = useRef<HTMLDivElement>(null);
    const inRef = useRef<HTMLDivElement>(null);
    const inInnerRef = useRef<HTMLDivElement>(null);
    const animsRef = useRef<Animation[]>([]);

    // Detect index change and record previous slide
    useLayoutEffect(() => {
        if (currentIndex === prevCurrentRef.current) return;
        const prev = prevCurrentRef.current;
        prevCurrentRef.current = currentIndex;
        setPrevIndex(prev);
    }, [currentIndex]);

    // Run WAAPI animations whenever a transition is queued
    useLayoutEffect(() => {
        if (prevIndex === null) return;

        const out = outRef.current;
        const outInner = outInnerRef.current;
        const inEl = inRef.current;
        const inInner = inInnerRef.current;
        if (!out || !outInner || !inEl || !inInner) return;

        // Cancel any in-progress animations before starting new ones
        animsRef.current.forEach(a => a.cancel());

        const dir = direction;

        const a1 = out.animate(
            [{ transform: "translateX(0%)" }, { transform: `translateX(${dir > 0 ? "-100%" : "100%"})` }],
            { duration: DURATION, easing: EASING, fill: "forwards" }
        );
        const a2 = outInner.animate(
            [{ transform: "translateX(0%)" }, { transform: `translateX(${dir > 0 ? "30%" : "-30%"})` }],
            { duration: DURATION, easing: "ease-in-out", fill: "forwards" }
        );
        // fill: "both" applies the first keyframe before the first paint — prevents flash
        const a3 = inEl.animate(
            [{ transform: `translateX(${dir > 0 ? "100%" : "-100%"})` }, { transform: "translateX(0%)" }],
            { duration: DURATION, easing: EASING, fill: "both" }
        );
        const a4 = inInner.animate(
            [{ transform: `translateX(${dir > 0 ? "-30%" : "30%"})` }, { transform: "translateX(0%)" }],
            { duration: DURATION, easing: "ease-in-out", fill: "both" }
        );

        const thisSet = [a1, a2, a3, a4];
        animsRef.current = thisSet;

        a3.onfinish = () => {
            if (animsRef.current !== thisSet) return;
            thisSet.forEach(a => a.cancel());
            animsRef.current = [];
            setPrevIndex(null);
        };

        return () => {
            animsRef.current.forEach(a => a.cancel());
            animsRef.current = [];
        };
    }, [prevIndex, direction]);

    return (
        <div className={cn("relative w-full h-full overflow-hidden", className)}>
            {prevIndex !== null && (
                <div ref={outRef} className="absolute inset-0 overflow-hidden">
                    <div ref={outInnerRef} className="absolute inset-0">
                        <img
                            src={images[prevIndex]}
                            alt={alts[prevIndex] ?? `Slide ${prevIndex + 1}`}
                            className="object-cover w-full h-full"
                            loading="eager"
                            decoding="sync"
                        />
                    </div>
                </div>
            )}
            <div ref={inRef} className="absolute inset-0 overflow-hidden">
                <div ref={inInnerRef} className="absolute inset-0">
                    <img
                        src={images[currentIndex]}
                        alt={alts[currentIndex] ?? `Slide ${currentIndex + 1}`}
                        className="object-cover w-full h-full"
                        loading="eager"
                        decoding="sync"
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
