import React from "react";

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
  return (
    <>
      <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.title}
      </label>
      <div className="flex relative mt-2 mb-6">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          {props.icon}
        </span>
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
      <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.title}
      </label>

      <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
        입력문자 보기
      </label>
      <input
        type="checkbox"
        className="ml-2"
        defaultChecked={props.view}
        onChange={() => props.setView!(!props.view)}
      />

      <div className="flex relative mt-2 mb-6">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          {props.icon}
        </span>
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
