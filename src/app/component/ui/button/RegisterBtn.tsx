import { SignupBtn } from './LoginBtn'

import { type RegisterBtnElementProps, type RegisterBtnProps } from '@/app/types/ui/btnTypes'
export default function RegisterBtn(props: RegisterBtnProps) {
  const btnClass = 'flex flex-col justify-center items-center p 1'

  return (
    <>
      <RegisterBtnElement title="Sign In" handleStep={props.handleStep} tailwindClass={btnClass} />
    </>
  )
}

function RegisterBtnElement(props: RegisterBtnElementProps) {
  return (
    <div className={props.tailwindClass} onClick={props.handleStep}>
      <SignupBtn title={props.title} />
    </div>
  )
}
