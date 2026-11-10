import { createContext, useContext, type ReactNode } from "react";
import { cn } from "../../lib/utils";

export type BottomAlign = "left" | "center" | "right";

export const BottomContext = createContext<BottomAlign | null>(null);
export const useBottomAlign = () => useContext(BottomContext);

const ALIGN_CLASSES: Record<BottomAlign, string> = {
    left:   "items-start",
    center: "items-center",
    right:  "items-end",
};

export interface BottomProps {
    children: ReactNode;
    align?: BottomAlign;
    /** Pass null to disable the gradient entirely */
    gradient?: string | null;
    className?: string;
}

const Bottom = ({
    children,
    align = "left",
    gradient = "bg-gradient-to-t from-black/40 to-transparent",
    className,
}: BottomProps) => {
    return (
        <BottomContext.Provider value={align}>
            <div className={cn("absolute bottom-0 left-0 right-0 pt-16 pb-7 px-7", gradient ?? undefined, className)}>
                <div className={cn("flex flex-col gap-3", ALIGN_CLASSES[align])}>
                    {children}
                </div>
            </div>
        </BottomContext.Provider>
    );
};

export default Bottom;
