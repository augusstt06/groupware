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

export const ERR_INPUT_ERROR = '입력값이 잘못되었습니다.'
export const ERR_INTERNAL_SERVER = '통신오류가 발생했습니다. 다시 시도해 주세요'
export const ERR_COOKIE_NOT_FOUND = 'cookies not found'
