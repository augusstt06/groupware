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
import { type UseInputProps } from '@/app/types/moduleTypes'
import { type KeyInfoTypeProps } from '@/app/types/pageTypes'

export default function RegisterInfo(props: KeyInfoTypeProps) {
  const [
    emailInput,
    pwdInput,
    pwdConfirmInput,
    nameInput,
    positionInput,
    phoneNumberInput,
  ]: UseInputProps[] = [
    REGISTER_EMAIL,
    REGISTER_PWD,
    REGISTER_CONFIRM_PWD,
    REGISTER_NAME,
    REGISTER_POSITION,
    REGISTER_PHONENUMBER,
  ].map((title: string) => useInput('', title))
  // 렌더링따로따로 할수 있도록 분리하기

  return (
    <>
      <InfoInput
        icon={<AiOutlineMail />}
        title={REGISTER_EMAIL}
        placeholder="abc12@sample.com"
        checkValid={true}
        useInput={emailInput}
      />
      {/* 여기 바꾸기 */}
      <PwdInput
        title={REGISTER_PWD}
        placeholder="At least 8 characters"
        icon={<RiLockPasswordFill />}
        isInputValueView={props.isPwdView}
        setIsInputValueView={props.setIsPwdView}
        useInput={pwdInput}
      />
      <PwdInput
        title={REGISTER_CONFIRM_PWD}
        placeholder="Please Re-enter your password"
        icon={<Si1Password />}
        isInputValueView={props.isPwdConfirmView}
        setIsInputValueView={props.setIsPwdConfirmView}
        useInput={pwdConfirmInput}
      />
      <InfoInput
        title={REGISTER_NAME}
        placeholder="Min Yeon Kim"
        icon={<BsFillPersonVcardFill />}
        checkValid={false}
        useInput={nameInput}
      />
      <InfoInput
        title={REGISTER_POSITION}
        placeholder="fe"
        icon={<RiTeamLine />}
        checkValid={false}
        useInput={positionInput}
      />
      <InfoInput
        title={REGISTER_PHONENUMBER}
        placeholder="010-0000-0000"
        icon={<AiFillPhone />}
        checkValid={false}
        useInput={phoneNumberInput}
      />
    </>
  )
}
