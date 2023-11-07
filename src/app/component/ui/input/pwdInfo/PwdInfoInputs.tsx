import React from "react";
import { PwdInfoProps } from "@/app/types";
import PwdInput from "@/app/component/ui/input/pwdInfo/pwd/PwdInput";
import PwdConfirmInput from "@/app/component/ui/input/pwdInfo/pwdConfirm/PwdConfirmInput";
import { RiLockPasswordFill } from "react-icons/ri";
import { Si1Password } from "react-icons/si";

export default function PwdInfoInputs(props: PwdInfoProps) {
  return (
    <>
      <PwdInput
        title="Password"
        placeholder="At least 6 characters, A-Z a-z 0-9 !@$%^"
        icon={<RiLockPasswordFill />}
        checkValid={props.checkValid}
        isPwdView={props.isPwdView}
        setIsPwdView={props.setIsPwdView}
      />
      <PwdConfirmInput
        title="Verify Password"
        placeholder="Please Re-enter your password"
        icon={<Si1Password />}
        isPwdConfirmView={props.isPwdConfirmView}
        setIsPwdConfirmView={props.setIsPwdConfirmView}
      />
    </>
  );
}
