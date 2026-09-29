import ky from 'ky';

export const api = ky.create({
  prefixUrl: '/api',
  timeout: 60_000,
  retry: 0,
  hooks: {
    beforeRequest: [
      async (request) => {
        request.headers.set('Accept', 'application/json');
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        if (
          response.status === 401 &&
          !request.url.includes('/api/auth/') &&
          typeof window !== 'undefined' &&
          window.location.pathname !== '/login'
        ) {
          window.location.assign('/login');
        }
      },
    ],
  },
});
