/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [];
  },
  async rewrites() {
    return [
      {
        source: process.env.NEXT_PUBLIC_REGISTER_SOURCE,
        destination: process.env.NEXT_PUBLIC_REGISTER_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_EMAIL_REQ_SOURCE,
        destination: process.env.NEXT_PUBLIC_EMAIL_REQ_DESTINATION,
      },
    ];
  },
};

module.exports = nextConfig;
