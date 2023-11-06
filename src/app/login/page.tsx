"use client";

import { useState } from "react";
import { useAppSelector } from "../module/hooks/reduxHooks";
import Stepper from "../component/ui/stepper/Stepper";
import KeyInfo from "../component/pages/loginInfo/KeyInfo";
import AdditionalInfo from "../component/pages/loginInfo/AdditionalInfo";
import ConditionBtnGroup from "../component/ui/button/ConditionBtnGroup";

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

  return (
    <div className="flex flex-col justify-center items-center p 1">
      <div className="mt-10 w-3/5">
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
        <div className="mb-5">
          <Stepper />
        </div>
      </div>
    </div>
  );
}
