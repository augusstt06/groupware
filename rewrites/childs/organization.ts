const orgPath = [
  {
    source: process.env.NEXT_PUBLIC_CREATE_ORGANIZATIONS_SOURCE,
    destination: process.env.NEXT_PUBLIC_CREATE_ORGANIZATIONS_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_JOIN_ORGANIZATIONS_SOURCE,
    destination: process.env.NEXT_PUBLIC_JOIN_ORGANIZATIONS_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_GET_ORG_CODE_SOURCE,
    destination: process.env.NEXT_PUBLIC_GET_ORG_CODE_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_GET_ORG_LIST_SOURCE,
    destination: process.env.NEXT_PUBLIC_GET_ORG_LIST_DESTINATION,
  },
]
export default orgPath
