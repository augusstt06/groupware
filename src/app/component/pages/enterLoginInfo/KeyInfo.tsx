import { KeyInfoTypeProps } from "@/app/types";
import PwdInfo from "../../ui/input/pwdInfo/PwdInfo";
import EmailInfo from "../../ui/input/emailInfo/EmailInfo";

export default function KeyInfo(props: KeyInfoTypeProps) {
  return (
    <>
      <EmailInfo
        title="Email"
        placeholder="abc12@sample.com"
        checkValid={true}
      />
      <PwdInfo
        placeholder="abc12@sample.com"
        checkValid={true}
        isPwdView={props.isPwdView}
        setIsPwdView={props.setIsPwdView}
        isPwdVerifyView={props.isPwdVerifyView}
        setIsPwdVerifyView={props.setIsPwdVerifyView}
      />
    </>
  );
}
