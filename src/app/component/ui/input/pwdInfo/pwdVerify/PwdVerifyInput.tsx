import { InputIconlabel } from "../../../label/InputIconlabel";
import { InputLabel, InputlabelAdd } from "../../../label/Inputlabel";
import { PwdVerifyInput } from "@/app/types";

export default function PwdVerifyInput(props: PwdVerifyInput) {
  return (
    <>
      <InputLabel title={props.title} />
      <InputlabelAdd title="입력문자 보기" />
      <input
        type="checkbox"
        className="ml-2"
        defaultChecked={props.isPwdVerifyView}
        onChange={() => props.setIsPwdVerifyView(!props.isPwdVerifyView)}
      />

      <div className="flex relative mt-2 mb-3">
        <InputIconlabel icon={props.icon} />
        <input
          type={props.isPwdVerifyView ? "text" : "password"}
          {...props.inputData}
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />
        {props.checkValid ? (
          <div className="absolute inset-y-0 right-4 flex items-center pl-3.5">
            <input
              type="checkbox"
              className="cursor-pointer w-5 h-5"
              checked={props.checked}
              // onChange={() => fetchPwdAvailable()}
              // 상태값 테스트 코드
              onChange={props.testClick}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
