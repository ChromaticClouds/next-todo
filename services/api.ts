import ky from 'ky';

export const api = ky.create({
  prefixUrl: '/api',
  timeout: 60_000,
  retry: {
    limit: 1,
    methods: ['get', 'post', 'put', 'patch', 'delete'],
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        request.headers.set('Accept', 'application/json');
      },
    ],
  },
});
