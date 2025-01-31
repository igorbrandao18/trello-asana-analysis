/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for better performance
  output: 'standalone',

  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Configure redirects
  async redirects() {
    return [
      {
        source: '/',
        destination: '/migracao',
        permanent: false,
      },
      {
        source: '/health',
        destination: '/api/health',
        permanent: true,
      },
    ];
  },

  // Configure headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 