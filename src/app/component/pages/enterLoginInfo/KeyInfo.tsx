import { AiOutlineMail } from "react-icons/ai";
import SignInput from "../../ui/input/SignInput";
import SignHideInput from "../../ui/input/SignHideInput";
import { RiLockPasswordFill } from "react-icons/ri";
import { StepComponentTypeProps } from "@/app/types";

export default function KeyInfo(props: StepComponentTypeProps) {
  return (
    <>
      <SignInput
        title="Email"
        placeholder="abc12@sample.com"
        icon={<AiOutlineMail />}
        checkValid={true}
      />
      {/* 여기 placeholder 수정 */}
      {/* 비번 안보일떄 마지막글자 보이게 할수있나? */}
      <SignHideInput
        title="Password"
        placeholder="At least 6 characters, including A-Z a-z 0-9 !@$%^"
        icon={<RiLockPasswordFill />}
        view={props.isView}
        setView={props.setIsView}
        checkValid={true}
      />
    </>
  );
}
