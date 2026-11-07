import { useState, useEffect, type ReactNode, type CSSProperties, useRef, useCallback } from "react";
import { CarouselContext } from "./context/carouselContext";
import ImageSlider from "./component/image-slider/ImageSlider";
import "./style.css";
import { cn } from "./lib/utils";

interface CarouselProps {
    children?: ReactNode;
    items: string[];
    autoPlay?: boolean;
    interval?: number;
    /** Applied to the children overlay div */
    className?: string;
    /** Applied to the root container div — use for width/height/border-radius */
    style?: CSSProperties;
    defaultSlider?: boolean;
}

export const Carousel = ({
    children,
    items,
    autoPlay = false,
    interval = 3000,
    className,
    style,
    defaultSlider = true,
}: CarouselProps) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);

    const isNavigatingRef = useRef(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pendingDirectionRef = useRef<"next" | "prev" | null>(null);

    // Fix #3: reset allImagesLoaded before each new preload batch
    useEffect(() => {
        setAllImagesLoaded(false);
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

    useEffect(() => {
        if (!autoPlay || !allImagesLoaded) return;
        // setTimeout + currentIndex dep: any navigation (manual or auto) resets
        // the full countdown, preventing autoPlay from firing right after a click
        const timer = setTimeout(() => goTo("next"), interval);
        return () => clearTimeout(timer);
    }, [autoPlay, interval, items.length, allImagesLoaded, goTo, currentIndex]);

    return (
        <CarouselContext.Provider
            value={{ currentIndex, totalItems: items.length, goTo, items, direction, interval }}
        >
            {/* Fix #5: removed duplicate re-exports (they live in index.ts) */}
            {/* Fix #6: removed redundant hidden preload <img> tags           */}
            <div className={cn("relative w-full h-full overflow-hidden", className)} style={style}>
                <div className={cn("absolute z-10 w-full h-full")}>
                    {children}
                </div>
                {defaultSlider && <ImageSlider />}
            </div>
        </CarouselContext.Provider>
    );
};
