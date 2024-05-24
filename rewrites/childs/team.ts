const teamPath = [
  {
    source: process.env.NEXT_PUBLIC_TEAMS_SOURCE,
    destination: process.env.NET_PUBLIC_TEAMS_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_TEAMS_INVITE_SOURCE,
    destination: process.env.NEXT_PUBLIC_TEAMS_INVITE_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_TEAMS_JOIN_SOURCE,
    destination: process.env.NEXT_PUBLIC_TEAMS_JOIN_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_TEAMS_LIST_SOURCE,
    destination: process.env.NEXT_PUBLIC_TEAMS_LIST_DESTINATION,
  },
]

export default teamPath
