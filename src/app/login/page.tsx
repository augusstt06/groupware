"use client";

import { useState } from "react";
import Step1 from "../component/pages/login-step/Step1";
import Step2 from "../component/pages/login-step/Step2";
import { SignupBtn } from "../component/ui/button/LoginBtn";
import Progressbar from "../component/ui/progressbar/Progressbar";

export default function Sign() {
  const [viewPwd, setViewPwd] = useState(false);
  const [isStepComplte, setIsStepComplete] = useState({
    step1: false,
    step2: false,
  });

  // 추후에 nextStep, backStep 함수 구조 바꾸기
  const nextStep = () => {
    setIsStepComplete({
      step1: true,
      step2: false,
    });
  };

  const backStep = () => {
    setIsStepComplete({
      step1: false,
      step2: false,
    });
  };

  //  step1을 ture로 만드는 조건 : 중복체크가 완료되었다는 응답을 받았을때
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
      <div className="mt-10 mb-3 w-3/5">
        {!isStepComplte.step1 ? (
          <Step1 viewPwd={viewPwd} setViewPwd={setViewPwd} />
        ) : (
          <Step2 />
        )}

        <div className="flex flex-row justify-center items-center mb-5">
          {isStepComplte.step1 ? (
            <div
              className="flex flex-col justify-center items-center p 1 mt-5"
              onClick={backStep}
            >
              <SignupBtn title="Back" />
            </div>
          ) : (
            <></>
          )}
          <div
            className="flex flex-col justify-center items-center p 1 mt-5"
            onClick={nextStep}
          >
            <SignupBtn title={!isStepComplte.step1 ? "Next" : "Sign In"} />
          </div>
        </div>
        <div>
          <Progressbar
            completedItems={items.completedItems}
            allItems={items.allItems}
          />
        </div>
      </div>
    </div>
  );
}
