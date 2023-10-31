import { AiOutlineMail } from "react-icons/ai";
import SignInput from "../../ui/input/SignInput";
import SignHideInput from "../../ui/input/SignHideInput";
import { RiLockPasswordFill } from "react-icons/ri";
import { StepComponentTypeProps } from "@/app/types";

export default function FirstStep(props: StepComponentTypeProps) {
  return (
    <>
      <SignInput
        title="Email"
        placeholder="abc12@sample.com"
        icon={<AiOutlineMail />}
        checkBox_dup={true}
      />
      <SignHideInput
        title="Password (6글자 이상, 숫자, 특수문자,영대문자 포함)"
        placeholder="Asd12!!"
        icon={<RiLockPasswordFill />}
        view={props.isView}
        setView={props.setIsView}
        checkBox_dup={true}
      />
    </>
  );
}
