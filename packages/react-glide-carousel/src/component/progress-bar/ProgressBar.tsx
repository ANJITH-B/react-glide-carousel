import { useRef, useLayoutEffect } from "react";
import { useCarousel } from "../../context/carouselContext";
import { cn } from "../../lib/utils";

export type ProgressAlign = "bottom" | "left" | "right";

const ALIGN_CLASSES: Record<ProgressAlign, string> = {
    bottom: "absolute bottom-7 left-1/2 -translate-x-1/2",
    left:   "absolute bottom-7 left-7",
    right:  "absolute bottom-7 right-7",
};

export interface ProgressProps {
    className?: string;
    align?: ProgressAlign;
    trackColor?: string;
    fillColor?: string;
}

const Progress = ({ className, align, trackColor, fillColor }: ProgressProps) => {
    const { currentIndex: index, totalItems: length, interval, isPlaying } = useCarousel();
    const fillRefs = useRef<(HTMLDivElement | null)[]>([]);
    const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
    const fillAnimRef = useRef<Animation | null>(null);
    const trackExpandRef = useRef<Animation | null>(null);
    const trackCollapseRef = useRef<Animation | null>(null);
    const prevIndexRef = useRef(index);

    useLayoutEffect(() => {
        // Cancel all running animations
        fillAnimRef.current?.cancel();
        fillAnimRef.current = null;
        trackExpandRef.current?.cancel();
        trackExpandRef.current = null;
        trackCollapseRef.current?.cancel();
        trackCollapseRef.current = null;

        // Reset all fills to empty
        fillRefs.current.forEach(el => { if (el) el.style.width = "0%"; });

        const prevIndex = prevIndexRef.current;
        prevIndexRef.current = index;

        // Animate previous track collapsing 100% → 40%
        const prevTrack = trackRefs.current[prevIndex];
        if (prevTrack && prevIndex !== index) {
            trackCollapseRef.current = prevTrack.animate(
                [{ width: "100%" }, { width: "40%" }],
                { duration: 200, easing: "cubic-bezier(0.43, 0.13, 0.23, 0.96)", fill: "forwards" }
            );
        }

        // Animate active track expanding 40% → 100%
        const activeTrack = trackRefs.current[index];
        if (activeTrack) {
            trackExpandRef.current = activeTrack.animate(
                [{ width: "40%" }, { width: "100%" }],
                { duration: 200, easing: "cubic-bezier(0.43, 0.13, 0.23, 0.96)", fill: "forwards" }
            );
        }

        // Fill animation
        if (!isPlaying) {
            const activeFill = fillRefs.current[index];
            if (activeFill) activeFill.style.width = "100%";
            return;
        }

        const activeFill = fillRefs.current[index];
        if (!activeFill) return;

        fillAnimRef.current = activeFill.animate(
            [{ width: "0%" }, { width: "100%" }],
            { duration: interval, easing: "ease-in-out", fill: "forwards" }
        );

        return () => {
            fillAnimRef.current?.cancel();
            fillAnimRef.current = null;
            trackExpandRef.current?.cancel();
            trackExpandRef.current = null;
            trackCollapseRef.current?.cancel();
            trackCollapseRef.current = null;
        };
    }, [index, interval, isPlaying]);

    return (
        <div
            style={{ minWidth: `${length * 36}px` }}
            className={cn("flex flex-row gap-2 max-w-full h-[5px]", align && ALIGN_CLASSES[align], className)}
        >
            {Array.from({ length }).map((_, i) => (
                <div
                    key={i}
                    ref={el => { trackRefs.current[i] = el; }}
                    className="h-full overflow-hidden rounded-full"
                    style={{
                        width: "40%",
                        backgroundColor: trackColor ?? "#9ca3af",
                    }}
                >
                    <div
                        ref={el => { fillRefs.current[i] = el; }}
                        className="h-full"
                        style={{ backgroundColor: fillColor ?? "#ffffff" }}
                    />
                </div>
            ))}
        </div>
    );
};

export default Progress;
