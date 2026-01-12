
import { useState, useEffect, type ReactNode, useRef, useCallback } from "react";
import { CarouselContext } from "./context/carouselContext";
import ImageSlider from "./component/image-slider/ImageSlider";
import "./style.css";
import { cn } from "./lib/utils";

export { default as ImageSlider } from "./component/image-slider/ImageSlider";
export { default as Progress } from "./component/progress-bar/ProgressBar";
export { NextIcon } from "./component/nav-buttons/NextIcon";
export { PrevIcon } from "./component/nav-buttons/PrevIcon";
export * from "./context/carouselContext";

interface CarouselProps {
    children?: ReactNode;
    items: string[];
    autoPlay?: boolean;
    interval?: number;
    className?: string;
    defaultSlider?: boolean;
}

export const Carousel = ({
    children,
    items,
    autoPlay = false,
    interval = 3000,
    className,
    defaultSlider = true,
}: CarouselProps) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);

    const isNavigatingRef = useRef(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
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

    const goTo = useCallback((newDirection: "next" | "prev") => {
        if (isNavigatingRef.current) return;
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
        }, 800);

    }, [items.length]);

    useEffect(() => {
        if (!autoPlay && !allImagesLoaded) return;

        const timer = setInterval(() => goTo('next'), interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, items.length, allImagesLoaded, goTo]);



    return (
        <CarouselContext.Provider
            value={{ currentIndex, totalItems: items.length, goTo, items, direction, interval }}
        >
            <div className={`relative w-full h-full overflow-hidden`}>
                <div className={cn(`absolute z-10 w-full h-full `, className)}>
                    {children}
                </div>
                {defaultSlider && <ImageSlider />}
                <div className="hidden">
                    {items.map((src, i) => (
                        <img key={i} src={src} alt="..." loading="eager" decoding="sync" />
                    ))}
                </div>
            </div>
        </CarouselContext.Provider>
    );
};