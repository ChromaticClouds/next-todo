import { Noto_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const notoSans = Noto_Sans({variable:'--font-sans'});


export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html className={cn("font-sans", notoSans.variable)}>
      <body>
        {children}
      </body>
    </html>
  );
}
