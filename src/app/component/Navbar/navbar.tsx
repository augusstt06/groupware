"use client";

import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Dropdown from "./dropdown";
import Link from "next/link";
import DarkmodeBtn from "./darkmodeBtn";

export default function Navbar() {
  const [nav, setNav] = useState(false);

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
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <div className="md:hidden">
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

            <a href="#" className="">
              <div className="avatar">
                {/*  bg-indigo-500 shadow */}
                <div className="w-16 rounded">
                  <h3 className="text-3xl text-indigo-500 font-bold">
                    Test nab
                  </h3>
                </div>
              </div>
            </a>
            <div className="justify-between w-10 h-6 hover:bg-gray  md:hidden">
              <h3 className="text-2xl text-indigo-500 font-bold">
                <DarkmodeBtn />
              </h3>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              nav ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li
                className={`text-2xl text-indigo-500 font-bold ${
                  nav ? "hidden" : "block"
                }`}
              >
                <DarkmodeBtn />
              </li>
              {menu.map(({ name, url, dropdown }, index) => (
                <li key={index} className="text-indigo-500">
                  {dropdown && nav ? (
                    <Dropdown name={name} dropdownItems={dropdown} />
                  ) : (
                    <Link href={url}>{name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
