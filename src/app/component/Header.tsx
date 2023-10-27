import React from "react";
import Navbar from "./Nav/Navbar";

type Props = {
  children: React.ReactNode;
};
export default function Header(props: Props) {
  return (
    <div>
      <Navbar>{props.children}</Navbar>
    </div>
  );
}
