import { AiFillPhone, AiOutlineMail } from 'react-icons/ai'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { RiLockPasswordFill } from 'react-icons/ri'
import { Si1Password } from 'react-icons/si'

import InfoInput from '../../ui/input/info/infoInput'
import PwdInput from '../../ui/input/pwdInfo/PwdInput'

import { type KeyInfoTypeProps } from '@/app/types'

export default function KeyInfo(props: KeyInfoTypeProps) {
  return (
    <>
      <InfoInput
        icon={<AiOutlineMail />}
        title="email"
        placeholder="abc12@sample.com"
        checkValid={true}
      />
      <PwdInput
        title="password (A-Z a-z 0-9 !@#$%^*&*? 포함)"
        placeholder="At least 8 characters"
        icon={<RiLockPasswordFill />}
        isInputValueView={props.isPwdView}
        setIsInputValueView={props.setIsPwdView}
      />
      <PwdInput
        title="confirm Password"
        placeholder="Please Re-enter your password"
        icon={<Si1Password />}
        isInputValueView={props.isPwdConfirmView}
        setIsInputValueView={props.setIsPwdConfirmView}
      />
      <InfoInput
        title="name"
        placeholder="Min Yeon Kim"
        icon={<BsFillPersonVcardFill />}
        checkValid={false}
      />
      <InfoInput
        title="phoneNumber"
        placeholder="010-0000-0000"
        icon={<AiFillPhone />}
        checkValid={false}
      />
    </>
  )
}
