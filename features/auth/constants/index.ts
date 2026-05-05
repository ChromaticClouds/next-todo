import { ArrowRightIcon, LogInIcon } from 'lucide-react';

export const AUTH_FORM_ELEMENTS = {
  login: {
    title: 'Welcome back',
    description: 'Login with your account',
    ActionIcon: LogInIcon,
    buttonText: 'Login',
    footerText: 'Don\'t have an account? ',
    link: '/register',
    linkText: 'Sign up',
  },
  register: {
    title: "Don't you have an account?",
    description: 'Sign up with email and password',
    ActionIcon: ArrowRightIcon,
    buttonText: 'Sign up',
    footerText: 'Already have an account? ',
    link: '/login',
    linkText: 'Login',
  },
};
