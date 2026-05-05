"use client";

import { cn } from "@/lib/utils";

type BackgroundProps = {
  variant?: "default" | "center";
  className?: string;
} & React.PropsWithChildren;

export const Background = ({
  variant = "default",
  className,
  children,
}: BackgroundProps) => {
  return (
    <div
      className={cn(`
        w-screen h-screen flex flex-col 
        ${variant === "center" ? "justify-center items-center" : ""}
        ${className}
      `)}
    >
      {children}
    </div>
  );
};
