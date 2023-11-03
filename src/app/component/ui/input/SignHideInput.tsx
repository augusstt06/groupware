import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/module/hooks/reduxHooks";
import { pwdCheckReducer } from "@/app/store/reducers/validReducer";
import { verifyPwdReducer } from "@/app/store/reducers/verifyPwdReducer";
import { InputLabel, InputlabelAdd } from "../label/Inputlabel";
import { InputIconlabel } from "../label/InputIconlabel";
import { SignHideInputProps } from "@/app/types";
import { useInput } from "@/app/module/hooks/reactHooks/useInput";
import { moduleFetch } from "@/app/module/utils/moduleFetch";
import inputValidate from "@/app/module/utils/inputValidate";

export default function SignHideInput(props: SignHideInputProps) {
  const dispatch = useAppDispatch();
  const inputData = useInput("");
  const anotherPwdValue = useAppSelector((state) => {
    switch (props.title) {
      case "Password":
        return state.verifyPassword.controlValue.verifyPwd;
      case "Verify Password":
        return state.verifyPassword.controlValue.pwd;
      default:
        return state.verifyPassword.controlValue.default;
    }
  });
  const controlValue = () => {
    switch (props.title) {
      case "Password":
        dispatch(
          verifyPwdReducer({ pwd: inputData.value, verifyPwd: anotherPwdValue })
        );
    }
  };

  const isCheck = useAppSelector((state) => {
    return state.isLoginInfoInputValid.isPwdCheck.check;
  });
  const fetchProps = {
    inputData: inputData.value,
    fetchUrl: "process.env.CHECK_EMAIL_AVAILABLE_API_URL",
  };
  const inputValidateProps = {
    inputData: inputData.value,
    dataType: "email",
  };

  const fetchInputAvailable = async () => {
    const isValid = inputValidate(inputValidateProps);
    if (!isValid) return;
    try {
      const fetchData = await moduleFetch(fetchProps);
      console.log(fetchData);
      dispatch(pwdCheckReducer());
      // dispatch(verifyPwdReducer());
    } catch (err) {
      console.log(err);
    }
  };

  const testClick = () => {
    dispatch(pwdCheckReducer());
  };
  return (
    <>
      <InputLabel title={props.title} />
      <InputlabelAdd title="입력문자 보기" />
      <input
        type="checkbox"
        className="ml-2"
        defaultChecked={props.isView}
        onChange={() => props.setIsView!(!props.isView)}
      />

      <div className="flex relative mt-2 mb-3">
        <InputIconlabel icon={props.icon} />
        <input
          type={`${props.isView ? "text" : "password"}`}
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
              // onChange={() => fetchPwdAvailable()}
              // 상태값 테스트 코드
              onChange={testClick}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
