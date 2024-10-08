// custom Err Message
export const errDefault = (description: string) => {
  return `${description}에 실패했습니다.`
}
export const errDuplicate = (description: string) => {
  return `이미 ${description}을/를 완료했습니다.`
}
export const errNotFound = (description: string) => {
  return `${description}을/를 확인할수 없습니다.`
}
export const errNotEntered = (description: string) => {
  return `${description}이/가 입력되지 않았습니다.`
}
export const errExist = (description: string) => {
  return `이미 사용중인 ${description} 입니다.`
}
export const ERR_INPUT_ERROR = '입력값이 잘못되었습니다.'
export const ERR_INTERNAL_SERVER = '통신오류가 발생했습니다. 다시 시도해 주세요'
export const ERR_COOKIE_NOT_FOUND = 'cookies not found'

// Response Error Message
export const ERR_MESSAGE_USER_EXIST = 'user already exists'
export const ERR_MESSAGE_SIGNUP_USER_EXIST = 'user already exists: <nil>'
export const ERR_MESSAGE_LOGIN_NOT_FOUND = 'user not found: record not found'
export const ERR_MESSAGE_CHECK_MAIL = 'check mail'
export const ERR_MESSAGE_LOGIN_EMAIL_FAIL = 'user not found: record not found'
export const ERR_MESSAGE_LOGIN_PWD_FAIL = 'password does not match'
export const ERR_MESSAGE_JOIN_ORG_FAIL_EXIST = 'organization already joined'
export const ERR_MESSAGE_ORG_ALREADY_EXIST =
  "Error 1062 (23000): Duplicate entry 'test' for key 'organizations.name'"
export const ERR_MESSAGE_RECORD_NOT_FOUND = 'record not found'
export const ERR_ORG_NOT_FOUND = 'organization not found'
export const ERR_UNAUTHORIZED = 'unauthorized'

export const ERR_EMPTRY_POSTING_FIELD =
  "Key: 'CreatePostingRequest.Title' Error:Field validation for 'Title' failed on the 'required' tag\nKey: 'CreatePostingRequest.Content' Error:Field validation for 'Content' failed on the 'required' tag"
