import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/module/hooks/reduxHooks";
import {
  emailCheckReducer,
  phoneNumCheckReducer,
} from "@/app/store/reducers/validReducer";
import { InputLabel } from "../../label/Inputlabel";
import { InputIconlabel } from "../../label/InputIconlabel";
import { SignInputProps } from "@/app/types";
import { useInput } from "@/app/module/hooks/reactHooks/useInput";
import { moduleFetch } from "@/app/module/utils/moduleFetch";
import inputValidate from "@/app/module/utils/inputValidate";

export default function EmailInfo(props: SignInputProps) {
  // 근데 생각해보니까 중복체크 하는거 말고는 체크를 따로 안하는데 입력 완료를 어케 구분해야 할까.....
  const dispatch = useAppDispatch();
  const inputData = useInput("");
  const isCheck = useAppSelector((state) => {
    switch (props.title) {
      case "Email":
        return state.isLoginInfoInputValid.isEmailCheck.check;
      case "Name":
        return state.isLoginInfoInputValid.isNameCheck.check;
      case "Teams":
        return state.isLoginInfoInputValid.isTeamCheck.check;
      case "PhoneNumber":
        return state.isLoginInfoInputValid.isPhoneNumCheck.check;
    }
  });

  const fetchProps = {
    inputData: inputData.value,
    // 추후에 환경변수로 변경
    fetchUrl: "process.env.CHECK_EMAIL_AVAILABLE_API_URL",
  };
  const inputValidateProps = {
    inputData: inputData.value,
    dataType: "email",
  };

  const fetchInputAvaiable = async () => {
    const isValid = inputValidate(inputValidateProps);
    if (!isValid) return;
    try {
      const fetchData = await moduleFetch(fetchProps);
      // 추후에 프로퍼티 수정하기
      console.log(fetchData);
      if (props.title === "Email") {
        dispatch(emailCheckReducer());
      } else {
        dispatch(phoneNumCheckReducer());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const testClick = () => {
    if (props.title === "Email") {
      dispatch(emailCheckReducer());
    } else {
      dispatch(phoneNumCheckReducer());
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
