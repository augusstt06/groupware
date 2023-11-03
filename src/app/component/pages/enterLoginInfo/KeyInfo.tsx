import { AiOutlineMail } from "react-icons/ai";
import { Si1Password } from "react-icons/si";
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
      {/* 비번 안보일떄 마지막글자 보이게 할수있나? */}
      <SignHideInput
        title="Password"
        placeholder="At least 6 characters, A-Z a-z 0-9 !@$%^"
        icon={<RiLockPasswordFill />}
        isView={props.isView}
        setIsView={props.setIsView}
        checkValid={true}
      />
      <SignHideInput
        title="Verify Password"
        placeholder="Enter Password again"
        icon={<Si1Password />}
        isView={props.isView}
        setIsView={props.setIsView}
        checkValid={true}
      />
    </>
  );
}
