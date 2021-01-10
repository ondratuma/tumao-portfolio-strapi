module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '6763406e0177c5b2acb7163a87c8bdea'),
    },
  },
  cron: {
    enabled: true
  }
});
