import React from "react";

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
export type SignHideInputProps = SignInputProps & {
  view?: boolean;
  setView?: (view: boolean) => void;
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
export type StepComponentTypeProps = {
  isView: boolean;
  setIsView: (view: boolean) => void;
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
