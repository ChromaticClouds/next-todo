import { Background } from '@/components/common/background';
import { Spinner } from '@/components/ui/spinner';

export const AppLoading = () => {
  return (
    <Background variant="center">
      <div className="flex flex-col gap-3 justify-center items-center">
        <Spinner />
        <p className="text-muted-foreground">Loading</p>
      </div>
    </Background>
  );
};
