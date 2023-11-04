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

export type ConditionBtnProps = {
  isKeyInfoComplete: boolean;
  isNext: boolean;
  handleStep: () => void;
};

export type ConditionBtnElementProps = {
  title: string;
  handleStep: () => void;
  tailwindClass: string;
};

// input
export type EmailInfoProps = {
  title: string;
  placeholder: string;
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

export type PwdInputProps = EmailInfoProps & {
  icon: React.ReactNode;
  isPwdView: boolean;
  setIsPwdView: React.Dispatch<SetStateAction<boolean>>;
};

export type PwdVerifyInput = {
  title: string;
  placeholder: string;
  icon: React.ReactNode;
  isPwdVerifyView: boolean;
  setIsPwdVerifyView: React.Dispatch<SetStateAction<boolean>>;
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
