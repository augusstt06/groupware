import React, { useState } from "react";
import { useAppDispatch } from "@/app/module/hooks/reduxHooks";
import { emailCheckReducer } from "@/app/store/reducers/validReducer";
import { InputLabel } from "../label/Inputlabel";
import { InputIconlabel } from "../label/InputIconlabel";
import { SignInputProps } from "@/app/types";
import { useInput } from "@/app/module/hooks/reactHooks";
import { moduleFetch } from "@/app/module/utils";

export default function SignInput(props: SignInputProps) {
  const inputData = useInput("");

  const dispatch = useAppDispatch();
  const [isAvailable, setIsAvailable] = useState(false);

  const fetchProps = {
    inputData: inputData.value,
    // 추후에 환경변수로 변경
    fetchUrl: "process.env.CHECK_EMAIL_AVAILABLE_API_URL",
  };

  // 중복체크 api요청 => 응답값으로 체크할지 말지를 handle함수에 넘긴다
  const fetchEmailAvaiable = async () => {
    try {
      const fetchData = await moduleFetch(fetchProps);
      // 추후에 프로퍼티 수정하기
      switch (fetchData.data) {
        case false:
          alert(`사용가능한 ${inputData.value}입니다.`);
          dispatch(emailCheckReducer());
          setIsAvailable(true);
        case true:
          alert(`유효하지 않은 형식입니다. 다시 입력해주세요`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const testClick = () => {
    dispatch(emailCheckReducer());
    setIsAvailable(true);
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
        {/* 비밀번호 중복체크 => 서버에 api 요청 */}
        {props.checkBox_dup ? (
          <div className="absolute inset-y-0 right-4 flex items-center pl-3.5">
            <input
              type="checkbox"
              className="cursor-pointer w-5 h-5"
              checked={isAvailable}
              // onChange={() => fetchEmailAvaiable()}
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
