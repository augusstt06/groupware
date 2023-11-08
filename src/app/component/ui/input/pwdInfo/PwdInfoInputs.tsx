import React from 'react'

import { RiLockPasswordFill } from 'react-icons/ri'
import { Si1Password } from 'react-icons/si'

import PwdInput from '@/app/component/ui/input/pwdInfo/pwd/PwdInput'
import PwdConfirmInput from '@/app/component/ui/input/pwdInfo/pwdConfirm/PwdConfirmInput'
import { type PwdInfoProps } from '@/app/types'

export default function PwdInfoInputs(props: PwdInfoProps) {
  return (
    <>
      <PwdInput
        title="Password (A-Z a-z 0-9 !@$%^ 포함)"
        placeholder="At least 8 characters"
        icon={<RiLockPasswordFill />}
        checkValid={props.checkValid}
        isPwdView={props.isPwdView}
        setIsPwdView={props.setIsPwdView}
      />
      <PwdConfirmInput
        title="Confirm Password"
        placeholder="Please Re-enter your password"
        icon={<Si1Password />}
        isPwdConfirmView={props.isPwdConfirmView}
        setIsPwdConfirmView={props.setIsPwdConfirmView}
      />
    </>
  )
}
