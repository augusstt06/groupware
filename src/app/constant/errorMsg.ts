// FIXME: 함수면 camel case로

export const ERR_DEFAULT = (description: string) => {
  return `${description}에 실패했습니다.`
}
export const ERR_DUPLICATE = (description: string) => {
  return `이미 ${description}을/를 완료했습니다.`
}
export const ERR_NOT_FOUND = (description: string) => {
  return `${description}을/를 확인할수 없습니다.`
}
export const ERR_NOT_ENTERED = (description: string) => {
  return `${description}이/가 입력되지 않았습니다.`
}

// FIXME: 에러 변수명 수정
export const ERR_400 = '입력값이 잘못되었습니다.'
export const ERR_500 = '통신오류가 발생했습니다. 다시 시도해 주세요'
export const ERR_COOKIE_NOT_FOUND = 'cookies not found'
export const ERR_TOKEN_NOT_FOUND = 'token not found'
