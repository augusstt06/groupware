import { BsFillPersonVcardFill, BsMicrosoftTeams } from "react-icons/bs";
import SignInput from "../../ui/input/emailInfo/EmailInfo";
import { AiFillPhone } from "react-icons/ai";

export default function AdditionalInfo() {
  // Teams 부분은 input말고 드롭다운으로 바꾸기
  return (
    <>
      <SignInput
        title="Name"
        placeholder="Min Yeon Kim"
        icon={<BsFillPersonVcardFill />}
        checkValid={false}
      />
      {/*  */}
      <SignInput
        title="Teams"
        placeholder="프론트엔드 개발"
        icon={<BsMicrosoftTeams />}
        checkValid={false}
      />
      {/*  */}
      <SignInput
        title="PhoneNumber"
        placeholder="010-0000-0000"
        icon={<AiFillPhone />}
        checkValid={true}
      />
    </>
  );
}
