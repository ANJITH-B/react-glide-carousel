import { cn } from "../../lib/utils";
import { useCarousel } from "../../context/carouselContext";

interface NavButtonProps {
    direction: "next" | "prev";
    className?: string;
}

export const NavButton = ({ direction, className }: NavButtonProps) => {
    const { goTo } = useCarousel();

    return (
        <button
            onClick={() => goTo(direction)}
            aria-label={direction === "next" ? "Next slide" : "Previous slide"}
            className={cn(
                "cursor-pointer rounded-full p-2",
                "backdrop-blur-sm bg-black/30 hover:bg-black/50",
                "border border-white/20",
                "text-white transition-colors duration-200",
                "w-9 h-9",
                className
            )}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
                {direction === "next"
                    ? <path fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                    : <path fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
                }
            </svg>
        </button>
    );
};
