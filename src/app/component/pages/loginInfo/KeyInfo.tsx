import { KeyInfoTypeProps } from "@/app/types";
import PwdInfoInputs from "../../ui/input/pwdInfo/PwdInfoInputs";
import InfoInput from "../../ui/input/info/infoInput";
import { AiOutlineMail } from "react-icons/ai";

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
