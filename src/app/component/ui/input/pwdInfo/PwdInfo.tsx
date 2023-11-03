import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/module/hooks/reduxHooks";
import { pwdCheckReducer } from "@/app/store/reducers/validReducer";
import { useInput } from "@/app/module/hooks/reactHooks/useInput";
import { moduleFetch } from "@/app/module/utils/moduleFetch";
import inputValidate from "@/app/module/utils/inputValidate";
import { PwdInfoProps } from "@/app/types";
import PwdInput from "@/app/component/ui/input/pwdInfo/pwd/PwdInput";
import PwdVerifyInput from "@/app/component/ui/input/pwdInfo/pwdVerify/PwdVerifyInput";
import { RiLockPasswordFill } from "react-icons/ri";
import { Si1Password } from "react-icons/si";

export default function PwdInfo(props: PwdInfoProps) {
  const dispatch = useAppDispatch();
  const pwdInputData = useInput("");
  const pwdVetifyInputData = useInput("");

  // const anotherPwdValue = useAppSelector((state) => {
  //   switch (props.title) {
  //     case "Password":
  //       return state.verifyPassword.controlValue.verifyPwd;
  //     case "Verify Password":
  //       return state.verifyPassword.controlValue.pwd;
  //     default:
  //       return state.verifyPassword.controlValue.default;
  //   }
  // });
  // const isPwdMatch = useAppSelector((state) => {
  //   return state.verifyPassword.isVerify;
  // });
  // const controlValue = () => {
  //   switch (props.title) {
  //     case "Password":
  //       dispatch(
  //         verifyPwdReducer({
  //           pwd: pwdInputData.value,
  //           verifyPwd: anotherPwdValue,
  //         })
  //       );
  //     case "Verify":
  //       dispatch(
  //         verifyPwdReducer({
  //           pwd: anotherPwdValue,
  //           verifyPwd: pwdVetifyInputData.value,
  //         })
  //       );
  //   }
  // };

  const isCheck = useAppSelector((state) => {
    return state.isLoginInfoInputValid.isPwdCheck.check;
  });
  const fetchProps = {
    inputData: pwdInputData.value,
    fetchUrl: "process.env.CHECK_EMAIL_AVAILABLE_API_URL",
  };

  const inputValidateProps = {
    inputData: pwdInputData.value,
    dataType: "pwd",
  };

  const fetchInputAvailable = async () => {
    const isValid = inputValidate(inputValidateProps);
    if (!isValid) return;
    try {
      const fetchData = await moduleFetch(fetchProps);
      console.log(fetchData);
      dispatch(pwdCheckReducer());
    } catch (err) {
      console.log(err);
    }
  };

  const testClick = () => {
    dispatch(pwdCheckReducer());
  };
  return (
    <>
      <PwdInput
        title="Password"
        placeholder="At least 6 characters, A-Z a-z 0-9 !@$%^"
        icon={<RiLockPasswordFill />}
        checkValid={props.checkValid}
        isPwdView={props.isPwdView}
        setIsPwdView={props.setIsPwdView}
        checked={isCheck}
        testClick={testClick}
      />
      <PwdVerifyInput
        title="Verify Password"
        placeholder="Please Re-enter your password"
        icon={<Si1Password />}
        checkValid={props.checkValid}
        isPwdVerifyView={props.isPwdVerifyView}
        setIsPwdVerifyView={props.setIsPwdVerifyView}
        checked={isCheck}
        testClick={testClick}
      />
    </>
  );
}
