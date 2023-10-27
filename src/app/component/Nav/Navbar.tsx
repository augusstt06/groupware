"use client";

import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { TbLogin2 } from "react-icons/tb";
import Dropdown from "./dropdown";
import Link from "next/link";
import DarkmodeBtn from "./darkmodeBtn";

export default function Navbar() {
  const [nav, setNav] = useState(false);

  // 임시로 잠시 로그인 대용 변수 => 추후에 로그인 상태값으로 변경
  const login = true;

  const menu = [
    { name: "Home", url: "/" },
    {
      name: "about",
      url: "/",
      dropdown: [
        { name: "test Service1", url: "/" },
        { name: "test Service2", url: "/" },
      ],
    },
    { name: "others", url: "/" },
  ];
  return (
    <nav className="w-full">
      <div className="justify-between px-4 mx-auto">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center justify-between py-3 md:py-5">
            {login ? (
              <div>
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNav(!nav)}
                >
                  {nav ? (
                    <RxCross1 className="text-indigo-500 w-10 h-6 hover:text-stone-800" />
                  ) : (
                    <AiOutlineMenu className="text-indigo-500 w-10 h-6 hover:text-stone-800" />
                  )}
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNav(!nav)}
                >
                  <TbLogin2 className="text-indigo-500 w-10 h-6 hover:text-stone-800" />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-center py-3 md:py-5 w-2/5">
            <Link href="/">
              <div className="avatar">
                <div className="w-16 rounded">
                  <h3 className="text-3xl text-indigo-500 font-bold">Logo</h3>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-center text-2xl text-indigo-500 font-bold py-3 md:py-5">
            <DarkmodeBtn />
          </div>
        </div>
      </div>
    </nav>
  );
}
