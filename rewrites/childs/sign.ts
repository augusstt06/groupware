const signPath = [
  {
    source: process.env.NEXT_PUBLIC_EMAIL_REQ_SOURCE,
    destination: process.env.NEXT_PUBLIC_EMAIL_REQ_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_REGISTER_SOURCE,
    destination: process.env.NEXT_PUBLIC_REGISTER_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_RESET_PWD_SOURCE,
    destination: process.env.NEXT_PUBLIC_RESET_PWD_DESTINATION,
  },
]

export default signPath
