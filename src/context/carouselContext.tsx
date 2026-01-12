import { createContext, useContext } from "react";

export type CarouselContextType = {
    currentIndex: number;
    totalItems: number;
    goTo: (newDirection: "next" | "prev") => void;
    items: string[];
    direction: number;
    interval: number;
};

export const CarouselContext = createContext<CarouselContextType | null>(null);

export const useCarousel = () => {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error("useCarousel must be used within a Carousel");
    }
    return context;
};
