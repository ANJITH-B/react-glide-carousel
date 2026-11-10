import { useState, useEffect, type ReactNode, type CSSProperties, useRef, useCallback } from "react";
import { CarouselContext } from "./context/carouselContext";
import ImageSlider from "./component/image-slider/ImageSlider";
import ScaleSlider from "./component/image-slider/ScaleSlider";
import Progress from "./component/progress-bar/ProgressBar";
import Caption from "./component/caption/Caption";
import Bottom from "./component/bottom/Bottom";
import { NavButton } from "./component/nav-buttons/NavButton";
import "./style.css";
import { cn } from "./lib/utils";

export type AnimationVariant = "slide" | "scale";

interface CarouselProps {
    children?: ReactNode;
    items: string[];
    alts?: string[];
    autoPlay?: boolean;
    interval?: number;
    /** Applied to the root wrapper div — use for width/height/border-radius/overflow */
    className?: string;
    /** Inline styles for the root wrapper div */
    style?: CSSProperties;
    defaultSlider?: boolean;
    animation?: AnimationVariant;
    /** When true, takes precedence over autoPlay — carousel plays only while hovered */
    hoverToSlide?: boolean;
    navigation?: boolean;
}

export const Carousel = ({
    children,
    items,
    alts,
    autoPlay = false,
    interval = 3000,
    className,
    style,
    defaultSlider = true,
    animation = "slide",
    hoverToSlide = false,
    navigation = false,
}: CarouselProps) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const isNavigatingRef = useRef(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pendingDirectionRef = useRef<"next" | "prev" | null>(null);

    useEffect(() => {
        // Reset navigation state and index when the items array changes
        setCurrentIndex(0);
        setAllImagesLoaded(false);
        isNavigatingRef.current = false;
        pendingDirectionRef.current = null;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        const preloadImages = async () => {
            const promises = items.map((src) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            });
            await Promise.all(promises);
            setAllImagesLoaded(true);
        };

        preloadImages();
    }, [items]);

    // Fix #4: clean up navigation timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const goTo = useCallback((newDirection: "next" | "prev") => {
        if (items.length <= 1) return;
        if (isNavigatingRef.current) {
            pendingDirectionRef.current = newDirection;
            return;
        }
        const dir = newDirection === "prev" ? -1 : 1;
        setDirection(dir);
        isNavigatingRef.current = true;

        setCurrentIndex((prev) =>
            newDirection === "next"
                ? (prev + 1) % items.length
                : (prev - 1 + items.length) % items.length
        );

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            isNavigatingRef.current = false;
            if (pendingDirectionRef.current) {
                const nav = pendingDirectionRef.current;
                pendingDirectionRef.current = null;
                goTo(nav);
            }
        }, 800);
    }, [items.length]);

    const effectiveAutoPlay = hoverToSlide ? isHovering : autoPlay;

    useEffect(() => {
        if (!effectiveAutoPlay || !allImagesLoaded) return;
        const timer = setTimeout(() => goTo("next"), interval);
        return () => clearTimeout(timer);
    }, [effectiveAutoPlay, interval, items.length, allImagesLoaded, goTo, currentIndex]);

    const handleMouseEnter = useCallback(() => {
        if (hoverToSlide) setIsHovering(true);
    }, [hoverToSlide]);

    const handleMouseLeave = useCallback(() => {
        if (hoverToSlide) setIsHovering(false);
    }, [hoverToSlide]);

    return (
        <CarouselContext.Provider
            value={{ currentIndex, totalItems: items.length, goTo, items, alts: alts ?? items.map((_, i) => `Slide ${i + 1}`), direction, interval, isPlaying: effectiveAutoPlay }}
        >
            {/* Fix #5: removed duplicate re-exports (they live in index.ts) */}
            {/* Fix #6: removed redundant hidden preload <img> tags           */}
            <div
                className={cn("relative w-full h-full overflow-hidden ", className)}
                style={style}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={cn("absolute z-10 w-full h-full")}>
                    {children}
                    {navigation && (
                        <>
                            <NavButton direction="prev" className="absolute left-3 top-1/2 -translate-y-1/2" />
                            <NavButton direction="next" className="absolute right-3 top-1/2 -translate-y-1/2" />
                        </>
                    )}
                </div>
                {defaultSlider && (
                    animation === "scale" ? <ScaleSlider /> : <ImageSlider />
                )}
            </div>
        </CarouselContext.Provider>
    );
};

Carousel.ImageSlider = ImageSlider;
Carousel.ScaleSlider = ScaleSlider;
Carousel.Progress = Progress;
Carousel.Caption = Caption;
Carousel.Bottom = Bottom;
