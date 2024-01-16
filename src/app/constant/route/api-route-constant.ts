// auth
export const API_URL_CHECK_EMAIL = process.env.NEXT_PUBLIC_EMAIL_REQ_SOURCE as string
export const API_URL_REGISTER = process.env.NEXT_PUBLIC_REGISTER_SOURCE as string

export const API_URL_LOGIN = process.env.NEXT_PUBLIC_LOGIN_SOURCE as string
export const API_URL_LOGOUT = process.env.NEXT_PUBLIC_LOGOUT_SOURCE as string

export const API_URL_REFRESH = process.env.NEXT_PUBLIC_REFRESH_TOKEN_SOURCE as string

// organization
export const API_URL_CREATE_ORG = process.env.NEXT_PUBLIC_CREATE_ORGANIZATIONS_SOURCE as string
export const API_URL_JOIN_ORG = process.env.NEXT_PUBLIC_JOIN_ORGANIZATIONS_SOURCE as string

export const API_URL_GET_ORG_CODE = process.env.NEXT_PUBLIC_GET_ORG_CODE_SOURCE as string
export const API_URL_GET_ORG_LIST = process.env.NEXT_PUBLIC_GET_ORG_LIST_SOURCE as string

// attendance
export const API_URL_ATTENDANCE = process.env.NEXT_PUBLIC_ATTENDANCES_SOURCE as string
export const API_URL_GET_ATTENDANCE_HISTORY = process.env
  .NEXT_PUBLIC_ATTENDANCES_HISTORY_SOURCE as string

export const API_URL_VACATION = process.env.NEXT_PUBLIC_ATTENDANCES_VACATION_SOURCE as string
// user
export const API_URL_GET_USERS = process.env.NEXT_PUBLIC_USERS_SOURCE as string

// projects
export const API_URL_PROJECTS = process.env.NEXT_PUBLIC_CREATE_PROJECTS_SOURCE as string

// board
export const API_URL_UPLOAD_IMG = process.env.NEXT_PUBLIC_UPLOAD_IMAGE_SOURCE as string
export const API_URL_GET_MY_BOARD = process.env.NEXT_PUBLIC_GET_MY_BOARD_SOURCE as string

// postings
export const API_URL_POSTINGS = process.env.NEXT_PUBLIC_POSTINGS_SOURCE as string
export const API_URL_POSTINGS_MY = process.env.NEXT_PUBLIC_POSTINGS_MY_SOURCE as string
export const API_URL_POSTINGS_MY_ALL = process.env.NEXT_PUBLIC_POSTINGS_MY_ALL_SOURCE as string
export const API_URL_POSTINGS_MY_TEAM = process.env.NEXT_PUBLIC_POSTINGS_MY_TEAM_SOURCE
export const API_URL_POSTINGS_MY_PROJECT = process.env.NEXT_PUBLIC_POSTINGS_MY_PROJECT_SOURCE
export const API_URL_POSTINGS_LIKE = process.env.NEXT_PUBLIC_POSTINGS_LIKE_SOURCE as string
export const API_URL_POSTINGS_UNLIKE = process.env.NEXT_PUBLIC_POSTINGS_UNLIKE_SOURCE as string
export const API_URL_POSTINGS_PENDING = process.env.NEXT_PUBLIC_POSTINGS_PENDING_SOURCE as string
export const API_URL_POSTINGS_LIST = process.env.NEXT_PUBLIC_POSTINGS_LIST_SOURCE as string

// Comment
export const API_URL_COMMENT = process.env.NEXT_PUBLIC_COMMENT_SOURCE as string
export const API_URL_COMMENT_POSTING = process.env.NEXT_PUBLIC_COMMENT_POSTING_SOURCE as string
export const API_URL_COMMENT_LIKE = process.env.NEXT_PUBLIC_COMMENT_LIKE_SOURCE as string
