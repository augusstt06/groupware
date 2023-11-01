import { useFetchProps } from "@/app/types";
import axios from "axios";

export const moduleFetch = (props: useFetchProps) => {
  const res = axios.post(`${props.fetchUrl}`, {
    data: props.inputData,
  });

  return res;
};
