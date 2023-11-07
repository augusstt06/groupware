import { ModuleGetFetchProps, ModulePostFetchProps } from "@/app/types";
import axios from "axios";

axios.defaults.withCredentials = true;

export const moduleGetFetch = (props: ModuleGetFetchProps) => {
  const urlParams = { email: props.data };
  const res = axios.get(`${props.fetchUrl}`, { params: urlParams });
  return res;
};

export const modulePostFetch = (props: ModulePostFetchProps) => {
  const res = axios.post(`${props.fetchUrl}`, props.data);

  return res;
};
