/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return []
  },
  async rewrites() {
    return [
      {
        source: process.env.NEXT_PUBLIC_USERS_SOURCE,
        destination: process.env.NEXT_PUBLIC_USERS_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_ATTENDANCES_SOURCE,
        destination: process.env.NEXT_PUBLIC_ATTENDANCES_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_GET_ORG_LIST_SOURCE,
        destination: process.env.NEXT_PUBLIC_GET_ORG_LIST_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_GET_ORG_CODE_SOURCE,
        destination: process.env.NEXT_PUBLIC_GET_ORG_CODE_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_JOIN_ORGANIZATIONS_SOURCE,
        destination: process.env.NEXT_PUBLIC_JOIN_ORGANIZATIONS_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_CREATE_ORGANIZATIONS_SOURCE,
        destination: process.env.NEXT_PUBLIC_CREATE_ORGANIZATIONS_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_LOGOUT_SOURCE,
        destination: process.env.NEXT_PUBLIC_LOGOUT_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_LOGIN_SOURCE,
        destination: process.env.NEXT_PUBLIC_LOGIN_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_REGISTER_SOURCE,
        destination: process.env.NEXT_PUBLIC_REGISTER_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_EMAIL_REQ_SOURCE,
        destination: process.env.NEXT_PUBLIC_EMAIL_REQ_DESTINATION,
      },
    ]
  },
}

module.exports = nextConfig
