/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: process.env.NEXT_PUBLIC_EMAIL_REQ_SOURCE,
        destination: process.env.NEXT_PUBLIC_EMAIL_REQ_DESTINATION,
      },
    ];
  },
};

module.exports = nextConfig;
