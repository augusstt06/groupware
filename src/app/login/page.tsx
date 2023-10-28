"use client";

import { useState } from "react";
import { SigninBtn } from "../component/button/SignBtn";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineMail, AiFillPhone } from "react-icons/ai";
import { BsFillPersonVcardFill, BsMicrosoftTeams } from "react-icons/bs";
import { SigninInput, SigninHideInput } from "../component/input/SignInput";

export default function Sign() {
  const [viewPwd, setViewPwd] = useState(false);
  // 추가적으로 넣을것 생각하기
  return (
    <div className="flex flex-col justify-center items-center p 1">
      <div className="mt-10 mb-5 w-3/5">
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
          view={viewPwd}
          setView={setViewPwd}
          checkBox_dup={true}
        />
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

        <div className="flex flex-col justify-center items-center p 1 mt-5">
          <SigninBtn />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center font-sm">
        {/* <a className="mb-5">If you already have account,</a> */}
        <div className="flex flex-col justify-center items-center font-sm">
          {/* <GitSignin />
          <GoogleSignin /> */}
        </div>
      </div>
    </div>
  );
}
