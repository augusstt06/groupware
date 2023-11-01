import React, { useState } from "react";
import { useAppDispatch } from "../reduxHooks";
import {
  emailCheckReducer,
  pwdCheckReducer,
} from "@/app/store/reducers/validReducer";
import { useFetchProps } from "@/app/types";
import axios from "axios";

export const useInput = (state: string) => {
  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };

  return { value, onChange };
};
