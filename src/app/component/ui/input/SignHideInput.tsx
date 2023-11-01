import React, { useState } from "react";
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import { pwdCheckReducer } from "@/app/store/reducers/validReducer";
import axios from "axios";
import { InputLabel, InputlabelAdd } from "../label/Inputlabel";
import { InputIconlabel } from "../label/InputIconlabel";
import { SignHideInputProps } from "@/app/types";
import { useInput } from "@/app/hooks/reactHooks";

export default function SignHideInput(props: SignHideInputProps) {
  const inputData = useInput("");

  // 비밀번호 유효성은 서버에서?클라이언트에서 체크?
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useAppDispatch();
  const fetchPwdAvailable = async (inputData: string) => {
    try {
      const res = await axios.get(
        `${process.env.CHECK_PWD_AVAILABLE_API_URL}`,
        {
          data: inputData,
        }
      );
      // 추후에 프로퍼티 수정하기
      switch (res.data.isDuplicate) {
        case false:
          alert(`사용가능한 ${inputData}입니다.`);
          dispatch(pwdCheckReducer());
          setIsAvailable(true);
        case true:
          alert(`유효하지 않은 형식입니다. 다시 입력해주세요`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    fetchPwdAvailable("");
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
        {/* 비밀번호 중복체크 => 서버에 api 요청 */}
        {props.checkBox_dup ? (
          <div className="absolute inset-y-0 right-4 flex items-center pl-3.5">
            <input
              type="checkbox"
              className="cursor-pointer w-5 h-5"
              checked={isAvailable}
              // onChange={handleClickCheckbox}
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
