import { PwdInputProps } from "@/app/types";
import { InputLabel, InputlabelAdd } from "../../../label/Inputlabel";
import { InputIconlabel } from "../../../label/InputIconlabel";
import { useInput } from "@/app/module/hooks/reactHooks/useInput";
import { useAppDispatch, useAppSelector } from "@/app/module/hooks/reduxHooks";
import inputValidate from "@/app/module/utils/inputValidate";
import { pwdCheckReducer } from "@/app/store/reducers/checkReducer";
import { pwdStateReducer } from "@/app/store/reducers/pwdReducer";

export default function PwdInput(props: PwdInputProps) {
  const dispatch = useAppDispatch();
  const pwdInputData = useInput("");

  const isCheck = useAppSelector((state) => {
    return state.isLoginInfoCheck.isPwdCheck.check;
  });

  const inputValidateProps = {
    inputData: pwdInputData.value,
    dataType: "pwd",
  };

  const handlePwdInput = () => {
    const isValid = inputValidate(inputValidateProps);
    if (!isValid) return;
    dispatch(pwdCheckReducer({ check: true, value: pwdInputData.value }));
    dispatch(pwdStateReducer({ pwd: pwdInputData.value }));
  };
  return (
    <>
      <InputLabel title={props.title} />
      <InputlabelAdd title="입력문자 보기" />
      <input
        type="checkbox"
        className="ml-2"
        defaultChecked={props.isPwdView}
        onChange={() => props.setIsPwdView(!props.isPwdView)}
      />

      <div className="flex relative mt-2 mb-3">
        <InputIconlabel icon={props.icon} />
        <input
          type={props.isPwdView ? "text" : "password"}
          {...pwdInputData}
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
              onChange={handlePwdInput}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
