import { AiFillPhone, AiOutlineMail } from 'react-icons/ai'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { RiLockPasswordFill, RiTeamLine } from 'react-icons/ri'
import { Si1Password } from 'react-icons/si'

import InfoInput from '../../ui/input/registerInfo/InfoInput'
import PwdInput from '../../ui/input/registerInfo/PwdInput'

import {
  REGISTER_CONFIRM_PWD,
  REGISTER_EMAIL,
  REGISTER_NAME,
  REGISTER_PHONENUMBER,
  REGISTER_POSITION,
  REGISTER_PWD,
} from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { type RegisterInfoTypeProps } from '@/app/types/pageTypes'

export default function RegisterInfo(props: RegisterInfoTypeProps) {
  const dynamicInput = (isPersist: boolean, title: string, limit: number) => {
    const storedValue = isPersist ? localStorage.getItem(title) : ''

    return useInput(storedValue as string, isPersist, title, limit)
  }

  const emailInput = dynamicInput(true, REGISTER_EMAIL, 100)
  const pwdInput = dynamicInput(false, REGISTER_PWD, 20)
  const pwdConfirmInput = dynamicInput(false, REGISTER_CONFIRM_PWD, 20)
  const nameInput = dynamicInput(true, REGISTER_NAME, 10)
  const positionInput = dynamicInput(true, REGISTER_POSITION, 10)
  const phoneNumberInput = dynamicInput(true, REGISTER_PHONENUMBER, 13)

  return (
    <>
      <InfoInput
        icon={<AiOutlineMail />}
        title={REGISTER_EMAIL}
        placeholder="이메일을 입력해주세요."
        checkValid={true}
        useInput={emailInput}
        setErrMsg={props.setErrMsg}
      />
      <PwdInput
        title={REGISTER_PWD}
        placeholder="비밀번호를 입력해주세요."
        icon={<RiLockPasswordFill />}
        isInputValueView={props.isPwdView}
        setIsInputValueView={props.setIsPwdView}
        useInput={pwdInput}
      />
      <PwdInput
        title={REGISTER_CONFIRM_PWD}
        placeholder="비밀번호를 입력해주세요."
        icon={<Si1Password />}
        isInputValueView={props.isPwdConfirmView}
        setIsInputValueView={props.setIsPwdConfirmView}
        useInput={pwdConfirmInput}
      />
      <InfoInput
        title={REGISTER_NAME}
        placeholder="이름을 입력해주세요."
        icon={<BsFillPersonVcardFill />}
        checkValid={false}
        useInput={nameInput}
        setErrMsg={props.setErrMsg}
      />
      <InfoInput
        title={REGISTER_POSITION}
        placeholder="직무를 입력해주세요."
        icon={<RiTeamLine />}
        checkValid={false}
        useInput={positionInput}
        setErrMsg={props.setErrMsg}
      />
      <InfoInput
        title={REGISTER_PHONENUMBER}
        placeholder="휴대폰 번호를 입력해주세요."
        icon={<AiFillPhone />}
        checkValid={false}
        useInput={phoneNumberInput}
        setErrMsg={props.setErrMsg}
      />
    </>
  )
}
