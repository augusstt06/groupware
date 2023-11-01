import { AiOutlineMail } from "react-icons/ai";
import SignInput from "../../ui/input/SignInput";
import SignHideInput from "../../ui/input/SignHideInput";
import { RiLockPasswordFill } from "react-icons/ri";
import { StepComponentTypeProps } from "@/app/types";

export default function FirstStep(props: StepComponentTypeProps) {
  // 이메일, 비밀번호 유효성 체크
  return (
    <>
      <SignInput
        title="Email"
        placeholder="abc12@sample.com"
        icon={<AiOutlineMail />}
        checkValid={true}
      />
      <SignHideInput
        title="Password (6글자 이상, 숫자, 특수문자,영대문자 포함)"
        placeholder="Asd12!!"
        icon={<RiLockPasswordFill />}
        view={props.isView}
        setView={props.setIsView}
        checkValid={true}
      />
    </>
  );
}
