'use client';

import { Button } from '@/components/ui/button';
import { faGoogle, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn } from 'next-auth/react';

export const SocialAuthAction = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Button
        type="button"
        variant="outline"
        className="h-10"
        onClick={() => signIn('google')}
      >
        <FontAwesomeIcon icon={faGoogle} />
        <span>Login with Google</span>
      </Button>
      <Button type="button" variant="outline" className="h-10">
        <FontAwesomeIcon icon={faXTwitter} />
        <span>Login with X</span>
      </Button>
    </div>
  );
};
