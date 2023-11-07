import { useState } from "react";
import { InputIconlabel } from "../../../label/InputIconlabel";
import { InputLabel, InputlabelAdd } from "../../../label/Inputlabel";
import { PwdConfirmInput } from "@/app/types";

import { useAppDispatch, useAppSelector } from "@/app/module/hooks/reduxHooks";
import { useInput } from "@/app/module/hooks/reactHooks/useInput";
// import { pwdConfirmReducer } from "@/app/store/reducers/loginInfoReducer";
import { pwdReducer } from "@/app/store/reducers/loginInfoReducer";

export default function PwdConfirmInput(props: PwdConfirmInput) {
  const dispatch = useAppDispatch();
  const pwdConfirmInputData = useInput("");

  const [isPwdConfirm, setIsPwdConfirm] = useState(false);
  const pwdState = useAppSelector((state) => {
    return state.loginInfo.pwd.pwdValue;
  });

  const handlConfirmPwd = () => {
    if (pwdState === "") {
      alert("먼저 비밀번호 입력 및 사용가능한지 확인하세요.");
      return;
    }
    if (pwdState !== pwdConfirmInputData.value) {
      alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요");
      setIsPwdConfirm(false);
      return;
    } else {
      dispatch(
        pwdReducer({
          isCheck: true,
          pwdValue: pwdState,
          pwdConfirmValue: pwdConfirmInputData.value,
        })
      );

      setIsPwdConfirm(true);
    }
  };

  return (
    <>
      <InputLabel title={props.title} />
      <InputlabelAdd title="입력문자 보기" />
      <input
        type="checkbox"
        className="ml-2"
        defaultChecked={props.isPwdConfirmView}
        onChange={() => props.setIsPwdConfirmView(!props.isPwdConfirmView)}
      />

      <div className="flex relative mt-2 mb-3">
        <InputIconlabel icon={props.icon} />
        <input
          type={props.isPwdConfirmView ? "text" : "password"}
          {...pwdConfirmInputData}
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />

        <div className="absolute inset-y-0 right-4 flex items-center pl-3.5">
          <input
            type="checkbox"
            className="cursor-pointer w-5 h-5"
            checked={isPwdConfirm}
            onChange={handlConfirmPwd}
          />
        </div>
      </div>
    </>
  );
}
