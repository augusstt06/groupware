import { type InputValidateProps } from '@/app/types/moduleTypes'

const inputValidate = (props: InputValidateProps) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
  const phoneNumeRegex = /^\d{3}-\d{4}-\d{4}$/

  if (props.dataType === 'email') {
    return emailRegex.test(props.inputData)
  } else if (props.dataType === 'pwd') {
    return pwdRegex.test(props.inputData)
  } else {
    return phoneNumeRegex.test(props.inputData)
  }
}

export default inputValidate
