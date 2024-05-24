const projectPath = [
  {
    source: process.env.NEXT_PUBLIC_PROJECT_SOURCE,
    destination: process.env.NEXT_PUBLIC_PROJECT_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_PROJECT_LIST_SOURCE,
    destination: process.env.NEXT_PUBLIC_PROJECT_LIST_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_PROJECT_LIST_INCLUDED_SOURCE,
    destination: process.env.NEXT_PUBLIC_PROJECT_LIST_INCLUDED_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_PROJECT_LIST_STARRED_SOURCE,
    destination: process.env.NEXT_PUBLIC_PROJECT_LIST_STARRED_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_PROJECT_STAR_SOURCE,
    destination: process.env.NEXT_PUBLIC_PROJECT_STAR_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_PROJECT_UNSTAR_SOURCE,
    destination: process.env.NEXT_PUBLIC_PROJECT_UNSTAR_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_PROJECT_INVITE_SOURCE,
    destination: process.env.NEXT_PUBLIC_PROJECT_INVITE_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_PROJECT_JOIN_SOURCE,
    destination: process.env.NEXT_PUBLIC_PROJECT_JOIN_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_PROJECT_ISSUE_SOURCE,
    destination: process.env.NEXT_PUBLIC_PROJECT_ISSUE_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_PROJECT_ISSUE_LIST_SOURCE,
    destination: process.env.NEXT_PUBLIC_PROJECT_ISSUE_LIST_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_PROJECT_ISSUE_LIST_PINNED_SOURCE,
    destination: process.env.NEXT_PUBLIC_PROJECT_ISSUE_LIST_PINNED_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_PROJECT_ISSUE_REARRANGE_SOURCE,
    destination: process.env.NEXT_PUBLIC_PROJECT_ISSUE_REARRANGE_DESTINATION,
  },
]

export default projectPath
