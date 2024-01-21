/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_IMG_DOMAIN],
  },
  reactStrictMode: false,
  async redirects() {
    return []
  },
  async rewrites() {
    return [
      {
        source: process.env.NEXT_PUBLIC_PROJECT_STAR_SOURCE,
        destination: process.env.NEXT_PUBLIC_PROJECT_STAR_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_PROJECT_LIST_STARRED_SOURCE,
        destination: process.env.NEXT_PUBLIC_PROJECT_LIST_STARRED_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_PROJECT_LIST_INCLUDED_SOURCE,
        destination: process.env.NEXT_PUBLIC_PROJECT_LIST_INCLUDED_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_PROJECT_LIST_SOURCE,
        destination: process.env.NEXT_PUBLIC_PROJECT_LIST_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_PROJECT_SOURCE,
        destination: process.env.NEXT_PUBLIC_PROJECT_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_COMMENT_LIKE_SOURCE,
        destination: process.env.NEXT_PUBLIC_COMMENT_LIKE_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_COMMENT_SOURCE,
        destination: process.env.NEXT_PUBLIC_COMMENT_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_GET_MY_BOARD_SOURCE,
        destination: process.env.NEXT_PUBLIC_GET_MY_BOARD_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_POSTINGS_LIST_SOURCE,
        destination: process.env.NEXT_PUBLIC_POSTINGS_LIST_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_COMMENT_POSTING_SOURCE,
        destination: process.env.NEXT_PUBLIC_COMMENT_POSTING_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_POSTINGS_MY_TEAM_SOURCE,
        destination: process.env.NEXT_PUBLIC_POSTINGS_MY_TEAM_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_POSTINGS_MY_PROJECT_SOURCE,
        destination: process.env.NEXT_PUBLIC_POSTINGS_MY_PROJECT_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_POSTINGS_MY_ALL_SOURCE,
        destination: process.env.NEXT_PUBLIC_POSTINGS_MY_ALL_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_POSTINGS_MY_SOURCE,
        destination: process.env.NEXT_PUBLIC_POSTINGS_MY_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_UPLOAD_IMAGE_SOURCE,
        destination: process.env.NEXT_PUBLIC_UPLOAD_IMAGE_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_POSTINGS_PENDING_SOURCE,
        destination: process.env.NEXT_PUBLIC_POSTINGS_PENDING_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_POSTINGS_UNLIKE_SOURCE,
        destination: process.env.NEXT_PUBLIC_POSTINGS_UNLIKE_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_POSTINGS_LIKE_SOURCE,
        destination: process.env.NEXT_PUBLIC_POSTINGS_LIKE_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_POSTINGS_SOURCE,
        destination: process.env.NEXT_PUBLIC_POSTINGS_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_USERS_SOURCE,
        destination: process.env.NEXT_PUBLIC_USERS_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_ATTENDANCES_VACATION_SOURCE,
        destination: process.env.NEXT_PUBLIC_ATTENDANCES_VACATION_DESTINATION,
      },
      {
        source: process.env.NEXT_PUBLIC_ATTENDANCES_HISTORY_SOURCE,
        destination: process.env.NEXT_PUBLIC_ATTENDANCES_HISTORY_DESTINATION,
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
        source: process.env.NEXT_PUBLIC_REFRESH_TOKEN_SOURCE,
        destination: process.env.NEXT_PUBLIC_REFRESH_TOKEN_DESTINATION,
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
