const boardPath = [
  {
    source: process.env.NEXT_PUBLIC_GET_MY_BOARD_SOURCE,
    destination: process.env.NEXT_PUBLIC_GET_MY_BOARD_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_COMMENT_SOURCE,
    destination: process.env.NEXT_PUBLIC_COMMENT_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_COMMENT_POSTING_SOURCE,
    destination: process.env.NEXT_PUBLIC_COMMENT_POSTING_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_COMMENT_LIKE_SOURCE,
    destination: process.env.NEXT_PUBLIC_COMMENT_LIKE_SOURCE,
  },
  {
    source: process.env.NEXT_PUBLIC_COMMENT_ISSUE_SOURCE,
    destination: process.env.NEXT_PUBLIC_COMMENT_ISSUE_DESTINATION,
  },
]

export default boardPath
