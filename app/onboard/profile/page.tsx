import { Background } from '@/components/common/background';
import { OnboardContainer } from '@/features/auth/components/onboard/onboard-container';
import { OnboardForm } from '@/features/auth/components/onboard/onboard-form';

export default function Profile() {
  return (
    <Background variant="center">
      <OnboardContainer>
        <OnboardForm />
      </OnboardContainer>
    </Background>
  );
}
