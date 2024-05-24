const authPath = [
  {
    source: process.env.NEXT_PUBLIC_LOGIN_SOURCE,
    destination: process.env.NEXT_PUBLIC_LOGIN_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_LOGOUT_SOURCE,
    destination: process.env.NEXT_PUBLIC_LOGOUT_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_REFRESH_TOKEN_SOURCE,
    destination: process.env.NEXT_PUBLIC_REFRESH_TOKEN_DESTINATION,
  },
]

export default authPath
