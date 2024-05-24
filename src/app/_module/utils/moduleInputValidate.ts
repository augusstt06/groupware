import { type InputValidateProps } from '@/_types/module'

const inputValidate = (props: InputValidateProps) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
  const phoneNumeRegex = /^\d{3}-\d{4}-\d{4}$/

  switch (props.dataType) {
    case 'email':
      return props.inputData != null && emailRegex.test(props.inputData)
    case 'pwd':
      return props.inputData != null && pwdRegex.test(props.inputData)
    case 'phoneNumber':
      return props.inputData != null && phoneNumeRegex.test(props.inputData)
    default:
      return false
  }
}
export default inputValidate
