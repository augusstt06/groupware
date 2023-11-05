import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillPersonVcardFill, BsMicrosoftTeams } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

export default function Stepper() {
  // 각 항목 완료여부
  // 완료여부에따라 classname 변경,
  const tailwindLi = (title: string) => {
    if (title === "mail") {
      const className =
        "flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800";
      return className;
    }
    const className =
      "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700";
    return className;
  };

  const tailwindSpan =
    "flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0";

  const [checkList, setCheckList] = useState([
    {
      title: "mail",
      icon: <AiOutlineMail />,
      isCheck: false,
    },
    // 여기엔 비밀번호 입력/확인 둘다 포함
    {
      title: "pwd",
      icon: <RiLockPasswordFill />,
      isCheck: false,
    },
    {
      title: "name",
      icon: <BsFillPersonVcardFill />,
      isCheck: false,
    },
    {
      title: "team",
      icon: <BsMicrosoftTeams />,
      isCheck: false,
    },
    {
      title: "phoneNumber",
      icon: <AiFillPhone />,
      isCheck: false,
    },
  ]);
  return (
    <ul className="flex flex-row items-center judtify-center w-full">
      {checkList.map((data) => (
        <li className={tailwindLi(data.title)} key={data.title}>
          <span className={tailwindSpan}>{data.icon}</span>
        </li>
      ))}
      <li className="flex items-center">
        <span className={tailwindSpan}>
          <FaCheck className="text-white" />
        </span>
      </li>
    </ul>
  );
}
