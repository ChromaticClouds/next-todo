import { Separator } from "@/components/ui/separator";

type AppTitleProps = {
  title: React.ReactNode;
  description?: string;
};

export const AppTitle = ({ title, description }: AppTitleProps) => {
  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col gap-3 items-center">
        <h1 className="text-3xl">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      <Separator className="my-6" />
    </div>
  );
};
