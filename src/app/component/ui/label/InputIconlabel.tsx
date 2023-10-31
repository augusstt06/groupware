import React from "react";
import { InputIconLabelProps } from "@/app/types";

export function InputIconlabel(props: InputIconLabelProps) {
  return (
    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
      {props.icon}
    </span>
  );
}
