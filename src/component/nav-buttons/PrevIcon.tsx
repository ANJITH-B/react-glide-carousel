import { cn } from "../../lib/utils";
import { useCarousel } from "../../context/carouselContext";

export const PrevIcon = ({ className }: { className?: string }) => {
  const { goTo } = useCarousel();
  return (
    <button
      onClick={() => goTo("prev")}
      className={cn("cursor-pointer backdrop-blur-sm bg-[#8e8e8e78] border-[#a7a7a7] rounded-full w-[35px] h-[35px] p-1.5 pt-2 border", className)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%" height="100%"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          d="M17 2L7 12l10 10"
        />
      </svg>
    </button>
  );
};
