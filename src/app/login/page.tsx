"use client";

import { useState } from "react";
import { useAppSelector } from "../module/hooks/reduxHooks";
import Progressbar from "../component/ui/progressbar/Progressbar";
import KeyInfo from "../component/pages/loginInfo/KeyInfo";
import AdditionalInfo from "../component/pages/loginInfo/AdditionalInfo";
import ConditionBtnGroup from "../component/ui/button/condition/ConditionBtnGroup";

export default function Sign() {
  const [isPwdView, setIsPwdView] = useState(false);
  const [isPwdVerifyView, setIsPwdVerifyView] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const isKeyInfoComplete = useAppSelector((state) => {
    const isEmailComplete = state.isLoginInfoCheck.isEmailCheck.check;
    const isPwdComplete = state.isLoginInfoCheck.isPwdCheck.check;
    const isPwdVerifyComplete = state.isLoginInfoCheck.isPwdVerifyCheck.check;
    if (isEmailComplete && isPwdComplete && isPwdVerifyComplete) {
      return true;
    } else return false;
  });

  const handleStep = () => {
    if (isKeyInfoComplete === false) {
      alert("중복/유효성 체크를 완료해주세요");
    } else {
      setIsNext(!isNext);
    }
  };

  const [items, setItems] = useState({
    allItems: 5,
    completedItems: 0,
  });

  const itemCompleted = () => {
    if (items.completedItems === items.allItems) return;
    setItems({
      allItems: 5,
      completedItems: items.completedItems + 1,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center p 1">
      <div className="mt-10 w-3/5">
        <div className="mb-5">
          <Progressbar
            completedItems={items.completedItems}
            allItems={items.allItems}
          />
        </div>
        {!isKeyInfoComplete || !isNext ? (
          <KeyInfo
            isPwdView={isPwdView}
            setIsPwdView={setIsPwdView}
            isPwdVerifyView={isPwdVerifyView}
            setIsPwdVerifyView={setIsPwdVerifyView}
          />
        ) : (
          <AdditionalInfo />
        )}

        <div className="flex flex-row justify-center items-center">
          <ConditionBtnGroup
            isKeyInfoComplete={isKeyInfoComplete}
            isNext={isNext}
            handleStep={handleStep}
          />
        </div>
      </div>
    </div>
  );
}
