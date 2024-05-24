const postPath = [
  {
    source: process.env.NEXT_PUBLIC_POSTINGS_SOURCE,
    destination: process.env.NEXT_PUBLIC_POSTINGS_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_POSTINGS_MY_SOURCE,
    destination: process.env.NEXT_PUBLIC_POSTINGS_MY_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_POSTINGS_MY_ALL_SOURCE,
    destination: process.env.NEXT_PUBLIC_POSTINGS_MY_ALL_DESTINATION,
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
    source: process.env.NEXT_PUBLIC_POSTINGS_LIKE_SOURCE,
    destination: process.env.NEXT_PUBLIC_POSTINGS_LIKE_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_POSTINGS_UNLIKE_SOURCE,
    destination: process.env.NEXT_PUBLIC_POSTINGS_UNLIKE_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_POSTINGS_PENDING_SOURCE,
    destination: process.env.NEXT_PUBLIC_POSTINGS_PENDING_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_POSTINGS_LIST_SOURCE,
    destination: process.env.NEXT_PUBLIC_POSTINGS_LIST_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_UPLOAD_IMAGE_SOURCE,
    destination: process.env.NEXT_PUBLIC_UPLOAD_IMAGE_DESTINATION,
  },
]

export default postPath
