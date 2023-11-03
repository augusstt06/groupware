import React, { Dispatch, SetStateAction } from "react";

////// basic
export type ReactProps = {
  children: React.ReactNode;
};

////// component
//// ui
// button
export type HamburgerProps = {
  nav: boolean;
  setNav: (nav: boolean) => void;
};

export type BtnProps = {
  title: string;
};

// input
export type SignInputProps = {
  title: string;
  placeholder: string;
  icon: React.ReactNode;
  checkValid: boolean;
};
export type PwdInfoProps = {
  placeholder: string;
  checkValid: boolean;
  isPwdView: boolean;
  setIsPwdView: React.Dispatch<SetStateAction<boolean>>;
  isPwdVerifyView: boolean;
  setIsPwdVerifyView: React.Dispatch<SetStateAction<boolean>>;
};

/////
export type PwdInputProps = SignInputProps & {
  inputData: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  isPwdView: boolean;
  setIsPwdView: React.Dispatch<SetStateAction<boolean>>;
  checked: boolean;
  testClick: () => void;
};

export type PwdVerifyInput = SignInputProps & {
  inputData: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  isPwdVerifyView: boolean;
  setIsPwdVerifyView: React.Dispatch<SetStateAction<boolean>>;
  checked: boolean;
  testClick: () => void;
};
////
export type InputPwdProps = {
  title: string;
  inputData: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  isView: boolean;
  placeholder: string;
};

// label
export type InputIconLabelProps = {
  icon: React.ReactNode;
};

// progressbar
export type ProgressbarProps = {
  allItems: number;
  completedItems: number;
};

// sidebar
export type SidebarProps = {
  nav: boolean;
};
//// page
export type KeyInfoTypeProps = {
  isPwdView: boolean;
  setIsPwdView: React.Dispatch<SetStateAction<boolean>>;
  isPwdVerifyView: boolean;
  setIsPwdVerifyView: React.Dispatch<SetStateAction<boolean>>;
};

/// module
// utils
export type ModuleFetchProps = {
  inputData: string;
  fetchUrl: string;
};

export type InputValidateProps = {
  inputData: string;
  dataType: string;
};
