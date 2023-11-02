import { ModuleFetchProps } from "@/app/types";
import axios from "axios";

export const moduleFetch = (props: ModuleFetchProps) => {
  const res = axios.post(`${props.fetchUrl}`, {
    data: props.inputData,
  });

  return res;
};
