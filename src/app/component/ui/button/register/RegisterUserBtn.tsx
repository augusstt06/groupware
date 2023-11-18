import { SignupBtn } from '../LoginBtn'

import {
  type RegisterUserBtnElementProps,
  type RegisterUserBtnProps,
} from '@/app/types/ui/btnTypes'
export default function RegisterUserBtn(props: RegisterUserBtnProps) {
  const btnClass = 'flex flex-col justify-center items-center p 1'

  return (
    <>
      <RegisterUserBtnElement
        title="Sign In"
        handleStep={props.handleStep}
        tailwindClass={btnClass}
      />
    </>
  )
}

function RegisterUserBtnElement(props: RegisterUserBtnElementProps) {
  return (
    <div className={props.tailwindClass} onClick={props.handleStep}>
      <SignupBtn title={props.title} />
    </div>
  )
}
