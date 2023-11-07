import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/module/hooks/reduxHooks";
import {
  emailCheckReducer,
  phoneNumCheckReducer,
} from "@/app/store/reducers/checkReducer";
import { InputLabel } from "../../label/Inputlabel";
import { InputIconlabel } from "../../label/InputIconlabel";
import { InfoInputProps } from "@/app/types";
import { useInput } from "@/app/module/hooks/reactHooks/useInput";
import { moduleGetFetch } from "@/app/module/utils/moduleFetch";
import inputValidate from "@/app/module/utils/inputValidate";

export default function InfoInput(props: InfoInputProps) {
  const dispatch = useAppDispatch();
  const inputData = useInput("");
  const isCheck = useAppSelector((state) => {
    switch (props.title) {
      case "Email":
        return state.isLoginInfoCheck.isEmailCheck.check;
      case "Name":
        return state.isLoginInfoCheck.isNameCheck.check;
      case "Teams":
        return state.isLoginInfoCheck.isTeamCheck.check;
      case "PhoneNumber":
        return state.isLoginInfoCheck.isPhoneNumCheck.check;
    }
  });

  const fetchProps = {
    data: inputData.value,
    fetchUrl: process.env.NEXT_PUBLIC_EMAIL_REQ_SOURCE,
  };

  const inputValidateProps = {
    inputData: inputData.value,
    dataType: "email",
  };

  const fetchInputAvaiable = async () => {
    const isValid = inputValidate(inputValidateProps);
    if (!isValid) return;
    try {
      const res = await moduleGetFetch(fetchProps);
      console.log(res);
      if (props.title === "Email") {
        dispatch(emailCheckReducer({ check: true, value: inputData.value }));
      }
      alert("이메일 확인이 완료되었습니다.");
    } catch (err) {
      console.log(err);
      alert("다른 이메일을 사용해 주세요.");
    }
  };

  return (
    <>
      <InputLabel title={props.title} />
      <div className="flex relative mt-2 mb-6">
        <InputIconlabel icon={props.icon} />
        <input
          type="text"
          {...inputData}
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />

        {props.checkValid ? (
          <div className="absolute inset-y-0 right-4 flex items-center pl-3.5">
            <input
              type="checkbox"
              className="cursor-pointer w-5 h-5"
              checked={isCheck}
              onChange={() => fetchInputAvaiable()}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
