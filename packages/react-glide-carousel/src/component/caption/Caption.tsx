import { useRef, useLayoutEffect, type CSSProperties } from "react";
import { useCarousel } from "../../context/carouselContext";
import { useBottomAlign } from "../bottom/Bottom";
import { cn } from "../../lib/utils";

export type CaptionVariant = "blur" | "slide-up" | "random";

interface VariantConfig {
    keyframes: Keyframe[];
    duration: number;
    stagger: number | ((i: number) => number);
    easing: string;
}

// Add new variants here — the component logic stays untouched.
const VARIANTS: Record<CaptionVariant, VariantConfig> = {
    blur: {
        keyframes: [
            { opacity: 0, filter: "blur(10px)" },
            { opacity: 1, filter: "blur(0px)" },
        ],
        duration: 800,
        stagger: (i) => i * 80,
        easing: "cubic-bezier(0.43, 0.13, 0.23, 0.96)",
    },
    random: {
        keyframes: [
            { opacity: 0, filter: "blur(10px)" },
            { opacity: 1, filter: "blur(0px)" },
        ],
        duration: 800,
        stagger: () => Math.random() * 400,
        easing: "cubic-bezier(0.43, 0.13, 0.23, 0.96)",
    },
    "slide-up": {
        keyframes: [
            { opacity: 0, transform: "translateY(16px)" },
            { opacity: 1, transform: "translateY(0px)" },
        ],
        duration: 600,
        stagger: (i) => i * 60,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
};

export type CaptionAlign = "left" | "right" | "center";

const ALIGN_CLASSES: Record<CaptionAlign, string> = {
    left:   "absolute bottom-7 left-7 justify-start",
    right:  "absolute bottom-7 right-7 justify-end",
    center: "absolute bottom-7 left-1/2 -translate-x-1/2 justify-center",
};

const JUSTIFY_CLASSES: Record<CaptionAlign, string> = {
    left:   "justify-start",
    center: "justify-center",
    right:  "justify-end",
};

export interface CaptionProps {
    titles: string[];
    variant?: CaptionVariant;
    align?: CaptionAlign;
    className?: string;
    style?: CSSProperties;
    maxWords?: number;
    shadow?: string;
}

const Caption = ({
    titles,
    align,
    variant = "blur",
    className,
    style,
    maxWords = 18,
    shadow = "[text-shadow:_0px_0px_26px_rgba(0,0,0,0.6)]",
}: CaptionProps) => {
    const { currentIndex } = useCarousel();
    const bottomAlign = useBottomAlign();
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const animsRef = useRef<Animation[]>([]);

    const title = titles[currentIndex] ?? "";
    const words = title.split(" ").slice(0, maxWords);
    const truncated = title.split(" ").length > maxWords;

    useLayoutEffect(() => {
        animsRef.current.forEach(a => a.cancel());
        animsRef.current = [];
        // Trim stale refs from a previous title that had more words
        wordRefs.current = wordRefs.current.slice(0, words.length);

        const config = VARIANTS[variant];

        wordRefs.current.forEach((el, i) => {
            if (!el) return;
            const delay = typeof config.stagger === "function"
                ? config.stagger(i)
                : i * config.stagger;

            const anim = el.animate(config.keyframes, {
                duration: config.duration,
                delay,
                easing: config.easing,
                fill: "both",
            });
            animsRef.current.push(anim);
        });

        return () => {
            animsRef.current.forEach(a => a.cancel());
            animsRef.current = [];
        };
    }, [currentIndex, variant, words.length]);

    return (
        <div
            className={cn(
                "flex flex-wrap gap-x-2 gap-y-1 text-white text-[1.5cqw] font-extralight w-2/3",
                align ? ALIGN_CLASSES[align] : bottomAlign && JUSTIFY_CLASSES[bottomAlign],
                className
            )}
            style={style}
        >
            {words.map((word, i) => (
                <span key={i} ref={el => { wordRefs.current[i] = el; }} className={shadow}>
                    {word}
                </span>
            ))}
            {truncated && <span>…</span>}
        </div>
    );
};

export default Caption;
