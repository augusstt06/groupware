import React, { useState } from "react";
import { InputLabel, InputlabelAdd } from "../label/Inputlabel";
import { InputIconlabel } from "../label/InputIconlabel";

type Props = {
  title: string;
  placeholder: string;
  icon: React.ReactElement;
  checkBox_dup: boolean;
};

type HideProps = Props & {
  view?: boolean;
  setView?: (view: boolean) => void;
};

export function SigninInput(props: Props) {
  // 체크박스 상태
  const [isDuplicate, setIsDuplicate] = useState(false);

  // 중복체크 api요청 => 응답값으로 체크할지 말지를 handle함수에 넘긴다
  const fetchDuplicate = async () => {
    return;
  };

  // 체크박스 체크함수
  const handleCheckDuplicate = () => {};
  return (
    <>
      <InputLabel title={props.title} />
      <div className="flex relative mt-2 mb-6">
        <InputIconlabel icon={props.icon} />
        <input
          type="text"
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />
        {/* 비밀번호 중복체크 => 서버에 api 요청 */}
        {props.checkBox_dup ? (
          <div className="absolute inset-y-0 right-4 flex items-center pl-3.5">
            <input type="checkbox" className="cursor-pointer w-5 h-5" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export function SigninHideInput(props: HideProps) {
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

      <div className="flex relative mt-2 mb-6">
        <InputIconlabel icon={props.icon} />
        <input
          type={`${props.view ? "text" : "password"}`}
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />
        {/* 비밀번호 중복체크 => 서버에 api 요청 */}
        {props.checkBox_dup ? (
          <div className="absolute inset-y-0 right-4 flex items-center pl-3.5">
            <input type="checkbox" className="cursor-pointer w-5 h-5" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
