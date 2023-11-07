import React, { SetStateAction } from "react";

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

export type SignupBtnProps = BtnProps & {
  isKeyInfoComplete: boolean;
};

export type ConditionBtnProps = {
  isKeyInfoComplete: boolean;
  isNext: boolean;
  handleStep: () => void;
};

export type ConditionBtnElementProps = {
  title: string;
  isKeyInfoComplete: boolean;
  handleStep: () => void;
  tailwindClass: string;
};

// input
export type InfoInputProps = {
  title: string;
  placeholder: string;
  checkValid: boolean;
  icon: React.ReactNode;
};

export type PwdInfoProps = {
  placeholder: string;
  checkValid: boolean;
  isPwdView: boolean;
  setIsPwdView: React.Dispatch<SetStateAction<boolean>>;
  isPwdConfirmView: boolean;
  setIsPwdConfirmView: React.Dispatch<SetStateAction<boolean>>;
};

export type PwdInputProps = InfoInputProps & {
  icon: React.ReactNode;
  isPwdView: boolean;
  setIsPwdView: React.Dispatch<SetStateAction<boolean>>;
};

export type PwdConfirmInput = {
  title: string;
  placeholder: string;
  icon: React.ReactNode;
  isPwdConfirmView: boolean;
  setIsPwdConfirmView: React.Dispatch<SetStateAction<boolean>>;
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

// Stepper
export type StepperProps = {};

//// page
export type KeyInfoTypeProps = {
  isPwdView: boolean;
  setIsPwdView: React.Dispatch<SetStateAction<boolean>>;
  isPwdConfirmView: boolean;
  setIsPwdConfirmView: React.Dispatch<SetStateAction<boolean>>;
};

/// module
// utils
export type ModuleGetFetchProps = {
  data: string;
  fetchUrl?: string;
};
export type ModulePostFetchProps = {
  data: object;
  fetchUrl?: string;
};

export type InputValidateProps = {
  inputData: string;
  dataType: string;
};
