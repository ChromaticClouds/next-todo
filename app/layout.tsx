import { Noto_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const notoSans = Noto_Sans({ variable: "--font-sans" });

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      className={cn("font-sans", notoSans.variable)}
      suppressHydrationWarning
    >
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
