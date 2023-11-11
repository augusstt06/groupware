import { type InputValidateProps } from '@/app/types/moduleTypes'

const inputValidate = (props: InputValidateProps) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
  // FIXME: 앞의 세자리 010 고정 => 그냥 입력을 고정시켜도 됨
  const phoneNumeRegex = /^\d{3}-\d{4}-\d{4}$/

  // switch (props.dataType) {
  //   case 'email':
  //     return emailRegex.test(props.inputData)
  //   case 'pwd':
  //     return pwdRegex.test(props.inputData)
  //   case 'phoneNumber':
  //     return phoneNumeRegex.test(props.inputData)
  //   default:
  //     return
  // }
  if (props.dataType === 'email') {
    return emailRegex.test(props.inputData)
  } else if (props.dataType === 'pwd') {
    return pwdRegex.test(props.inputData)
  } else {
    return phoneNumeRegex.test(props.inputData)
  }
}

export default inputValidate
