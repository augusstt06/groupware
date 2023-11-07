import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillPersonVcardFill, BsMicrosoftTeams } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { useAppSelector } from "@/app/module/hooks/reduxHooks";
import { createSelector } from "@reduxjs/toolkit";

export default function Stepper() {
  // useSelector => createSelector 최적화하기
  const isMailComplete = useAppSelector((state) => {
    return state.loginInfo.email.isCheck;
  });
  const isPwdComplete = useAppSelector((state) => {
    const pwdCheck = state.loginInfo.pwd.isCheck;
    const pwdConfirmCheck = state.loginInfo.pwdConfirm.isCheck;
    if (pwdCheck && pwdConfirmCheck) {
      return true;
    }
    return false;
  });
  const isNameComplete = useAppSelector((state) => {
    return state.loginInfo.name.isCheck;
  });
  const isTeamComplete = useAppSelector((state) => {
    return state.loginInfo.team.isCheck;
  });
  const isPhoneNumComplete = useAppSelector((state) => {
    return state.loginInfo.phoneNumber.isCheck;
  });

  const tailwindLi = (title: string, complete: boolean) => {
    const completeColor = complete
      ? "text-indigo-500 font-bold"
      : "text-indigo-200";
    const completeAfter = complete
      ? "after:border-indigo-500 dark:after:border-indigo-600"
      : "after:border-gray-100 dark:after:border-gray-700";

    if (title === "mail") {
      const className = `flex w-full ${completeColor} items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${completeAfter}`;
      return className;
    }
    const className = `flex w-full ${completeColor} items-center after:content-[''] after:w-full after:h-1 after:border-b ${completeAfter} after:border-4 after:inline-block `;
    return className;
  };

  const tailwindSpan = () => {
    if (
      isMailComplete &&
      isNameComplete &&
      isPhoneNumComplete &&
      isPwdComplete &&
      isTeamComplete
    ) {
      const className =
        "flex items-center text-indigo-500 font-bold justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0";
      return className;
    }
    const className =
      "flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0";
    return className;
  };

  const checkList = [
    {
      title: "mail",
      icon: <AiOutlineMail />,
      isComplete: isMailComplete,
    },
    {
      title: "pwd",
      icon: <RiLockPasswordFill />,
      isComplete: isPwdComplete,
    },
    {
      title: "name",
      icon: <BsFillPersonVcardFill />,
      isComplete: isNameComplete,
    },
    {
      title: "team",
      icon: <BsMicrosoftTeams />,
      isComplete: isTeamComplete,
    },
    {
      title: "phoneNum",
      icon: <AiFillPhone />,
      isComplete: isPhoneNumComplete,
    },
  ];

  return (
    <ul className="flex flex-row items-center judtify-center w-full">
      {checkList.map((data) => (
        <li
          className={tailwindLi(data.title, data.isComplete)}
          key={data.title}
        >
          <span className={tailwindSpan()}>{data.icon}</span>
        </li>
      ))}
      <li className="flex items-center">
        <span className={tailwindSpan()}>
          <FaCheck className="text-white" />
        </span>
      </li>
    </ul>
  );
}
