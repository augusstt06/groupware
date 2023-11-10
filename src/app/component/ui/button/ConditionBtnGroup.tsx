import { SignupBtn } from './LoginBtn'

import { type ConditionBtnElementProps, type ConditionBtnProps } from '@/app/types/ui/btnTypes'

export default function ConditionBtnGroup(props: ConditionBtnProps) {
  const btnClass = 'flex flex-col justify-center items-center p 1'

  return (
    <>
      <SigninBtnElement title="Sign In" handleStep={props.handleStep} tailwindClass={btnClass} />
    </>
  )
}

function SigninBtnElement(props: ConditionBtnElementProps) {
  return (
    <div className={props.tailwindClass} onClick={props.handleStep}>
      <SignupBtn title={props.title} />
    </div>
  )
}
