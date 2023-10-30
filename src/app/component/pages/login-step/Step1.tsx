import { AiOutlineMail } from "react-icons/ai";
import { SigninHideInput, SigninInput } from "../../ui/input/SignInput";
import { RiLockPasswordFill } from "react-icons/ri";

type Props = {
  isView: boolean;
  setIsView: (view: boolean) => void;
};
export default function Step1(props: Props) {
  return (
    <>
      <SigninInput
        title="Email"
        placeholder="abc12@sample.com"
        icon={<AiOutlineMail />}
        checkBox_dup={true}
      />
      <SigninHideInput
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
