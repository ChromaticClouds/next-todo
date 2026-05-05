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
  },
});
