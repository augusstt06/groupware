export const GET = 'GET'
export const POST = 'POST'
export const PATCH = 'PATCH'
export const DELETE = 'DELETE'
export const FETCH_CONTENT_TYPE = 'application/json'

export const TRUE = 'TRUE'
export const FALSE = 'FALSE'
export const PUBLIC = 'Public'
export const PRIVATE = 'Private'
export const COMPLETE = 'complete'

export const ORG_CREATE = 'create'
export const ORG_JOIN = 'join'
export const ORG_NEXT = 'Create Team'
export const ORG_CRAETE_NOTEAM = 'Create Organization without team'
export const ORG_SELECTBOX = 'selectbox'
export const ORG_GRADES = 'grades'

export const ORG_CREATETEAM = 'createTeam'

export const REGISTER_EMAIL = '이메일'
export const REGISTER_PWD = '비밀번호'
export const REGISTER_CONFIRM_PWD = '비밀번호 확인'
export const REGISTER_NAME = '이름'
export const REGISTER_PHONENUMBER = '전화번호'
export const REGISTER_POSITION = '직무'
export const REGISTER_ORG_NAME = '조직 이름'
export const REGISTER_ORG_DESCRIPTION = '조직설명'
export const REGISTER_ORG_JOIN = '조직 코드'

export const KEY_ACCESS_TOKEN = 'access-token'
export const KEY_X_ORGANIZATION_CODE = 'X-ORGANIZATION-CODE'
export const KEY_UUID = 'uuid'
export const KEY_ORGANIZATION = 'organization-complete'
export const KEY_ATTENDANCE = 'attendance'

// route env
export const ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN = process.env
  .NEXT_PUBLIC_ERR_NOT_FOUND_ACCCESS_TOKEN as string
export const ROUTE_ERR_NOT_FOUND_ORG_TOKEN = process.env
  .NEXT_PUBLIC_ERR_NOT_FOUND_ORG_TOKEN as string

export const ROUTE_MAIN = process.env.NEXT_PUBLIC_MAIN as string
export const ROUTE_SIGNUP_ORG = process.env.NEXT_PUBLIC_SIGNUP_ORG as string
