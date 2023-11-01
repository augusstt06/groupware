import React, { useState } from "react";
import { useAppDispatch } from "@/app/module/hooks/reduxHooks";
import { pwdCheckReducer } from "@/app/store/reducers/validReducer";
import { InputLabel, InputlabelAdd } from "../label/Inputlabel";
import { InputIconlabel } from "../label/InputIconlabel";
import { SignHideInputProps } from "@/app/types";
import { useInput } from "@/app/module/hooks/reactHooks";
import { moduleFetch } from "@/app/module/utils";
import { inputValidate } from "@/app/module/utils";

export default function SignHideInput(props: SignHideInputProps) {
  const dispatch = useAppDispatch();
  const inputData = useInput("");
  const [isAvailable, setIsAvailable] = useState(false);
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
      setIsAvailable(true);
    } catch (err) {
      console.log(err);
    }
  };

  const testClick = () => {
    dispatch(pwdCheckReducer());
    setIsAvailable(true);
  };
  return (
    <>
      <InputLabel title={props.title} />
      <InputlabelAdd title="입력문자 보기" />
      <input
        type="checkbox"
        className="ml-2"
        defaultChecked={props.view}
        onChange={() => props.setView!(!props.view)}
      />

      <div className="flex relative mt-2 mb-3">
        <InputIconlabel icon={props.icon} />
        <input
          type={`${props.view ? "text" : "password"}`}
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
              checked={isAvailable}
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
