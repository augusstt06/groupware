import { SignupBtn } from '../SignupBtn'

import { type RegisterUserBtnProps } from '@/app/types/ui/btnTypes'
export default function RegisterUserBtn(props: RegisterUserBtnProps) {
  const btnClass = 'flex flex-col justify-center items-center p 1'

  return (
    <div className={btnClass}>
      <SignupBtn title={'Sign In'} setErrMsg={props.setErrMsg} />
    </div>
  )
}
