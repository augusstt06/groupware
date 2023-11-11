import { type InputValidateProps } from '@/app/types'

const inputValidate = (props: InputValidateProps) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/

  if (props.dataType === 'email') {
    return emailRegex.test(props.inputData)
  } else if (props.dataType === 'pwd') {
    return pwdRegex.test(props.inputData)
  }

  return true
}

export default inputValidate
