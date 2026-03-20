"use client";

type BackgroundProps = {
  variant?: "default" | "center";
} & React.PropsWithChildren;

export const Background = ({
  variant = "default",
  children,
}: BackgroundProps) => {
  return (
    <div
      className={`
        w-screen h-screen flex flex-col 
        ${variant === "center" ? "justify-center items-center" : ""}
      `}
    >
      {children}
    </div>
  );
};
