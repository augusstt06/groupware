import { AiOutlineMail } from 'react-icons/ai'

import InfoInput from '../../ui/input/info/infoInput'
import PwdInfoInputs from '../../ui/input/pwdInfo/PwdInfoInputs'

import { type KeyInfoTypeProps } from '@/app/types'

export default function KeyInfo(props: KeyInfoTypeProps) {
  return (
    <>
      <InfoInput
        icon={<AiOutlineMail />}
        title="Email"
        placeholder="abc12@sample.com"
        checkValid={true}
      />
      <PwdInfoInputs
        checkValid={true}
        isPwdView={props.isPwdView}
        setIsPwdView={props.setIsPwdView}
        isPwdConfirmView={props.isPwdConfirmView}
        setIsPwdConfirmView={props.setIsPwdConfirmView}
      />
    </>
  )
}
