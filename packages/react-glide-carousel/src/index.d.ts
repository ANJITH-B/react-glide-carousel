import { ReactNode, Context } from "react";
import * as React from "react";

export interface CarouselProps {
    children?: ReactNode;
    items: string[];
    autoPlay?: boolean;
    interval?: number;
    className?: string;
    defaultSlider?: boolean;
}

export declare const Carousel: (props: CarouselProps) => React.JSX.Element;

export interface CarouselContextType {
    currentIndex: number;
    totalItems: number;
    goTo: (newDirection: "next" | "prev") => void;
    items: string[];
    direction: number;
    interval: number;
}

export declare const CarouselContext: Context<CarouselContextType | null>;

export declare const useCarousel: () => CarouselContextType;

export declare const ImageSlider: (props: { className?: string }) => React.JSX.Element;

export declare const Progress: (props: { className?: string }) => React.JSX.Element;

export declare const NextIcon: (props: { className?: string }) => React.JSX.Element;

export declare const PrevIcon: (props: { className?: string }) => React.JSX.Element;
