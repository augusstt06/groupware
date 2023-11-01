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
  checkBox_dup: boolean;
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

/// hooks
export type useFetchProps = {
  inputData: string;
  fetchUrl: string;
};
