import { ModuleFetchProps } from "@/app/types";
import { InputValidateProps } from "@/app/types";
import axios from "axios";

export const moduleFetch = (props: ModuleFetchProps) => {
  const res = axios.post(`${props.fetchUrl}`, {
    data: props.inputData,
  });

  return res;
};

export const inputValidate = (props: InputValidateProps) => {
  if (props.dataType === "email") {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!emailRegex.test(props.inputData)) {
      alert("이메일 형식이 잘못되었습니다.");
      return false;
    }
  } else if (props.dataType === "pwd") {
    const pwdRegex =
      /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/;
    if (!pwdRegex.test(props.inputData)) {
      alert("8-20사이의 영어대소문자, 특수문자, 숫자를 포함해주세요.");
      return false;
    }
  }
  alert(
    `사용가능한 ${props.dataType === "email" ? "이메일" : "비밀번호"}입니다.`
  );
  return true;
};
