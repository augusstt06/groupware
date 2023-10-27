import Link from "next/link";
import React from "react";

type Props = {
  nav: boolean;
};
export default function Sidebar(props: Props) {
  return (
    <aside
      className={` ${
        props.nav ? " md:block" : "hidden"
      } w-64  bg-indigo-500 dark:bg-[#24292F]/90`}
    >
      <div className="p-6">
        <a
          href=""
          className="flex items-center text-white text-3xl font-semibold hover:text-gray-300"
        >
          Menu
        </a>
      </div>
      <nav
        className={`block text-base text-white font-semibold pt-3 dark:hover:text-bold `}
      >
        <a
          href=""
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 dark:hover:text-indigo-500"
        >
          menu 1
        </a>
        <a
          href=""
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 dark:hover:text-indigo-500"
        >
          menu 2
        </a>
        <a
          href=""
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 dark:hover:text-indigo-500"
        >
          menu 3
        </a>
        <a
          href=""
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 dark:hover:text-indigo-500"
        >
          menu 4
        </a>
        <a
          href=""
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 dark:hover:text-indigo-500"
        >
          menu 5
        </a>
        <a
          href=""
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 dark:hover:text-indigo-500"
        >
          menu 6
        </a>
      </nav>
    </aside>
  );
}
