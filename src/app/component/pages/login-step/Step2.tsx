import { BsFillPersonVcardFill, BsMicrosoftTeams } from "react-icons/bs";
import { SigninInput } from "../../ui/input/SignInput";
import { AiFillPhone } from "react-icons/ai";

export default function Step2() {
  return (
    <>
      <SigninInput
        title="Name"
        placeholder="Min Yeon Kim"
        icon={<BsFillPersonVcardFill />}
        checkBox_dup={false}
      />
      <SigninInput
        title="Teams"
        placeholder="프론트엔드 개발"
        icon={<BsMicrosoftTeams />}
        checkBox_dup={false}
      />
      <SigninInput
        title="Phone Number"
        placeholder="010-0000-0000"
        icon={<AiFillPhone />}
        checkBox_dup={true}
      />
    </>
  );
}
