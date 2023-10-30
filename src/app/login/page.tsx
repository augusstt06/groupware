"use client";

import { useState } from "react";
import Step1 from "../component/pages/login-step/Step1";
import Step2 from "../component/pages/login-step/Step2";
import { SignupBtn } from "../component/ui/button/LoginBtn";
import Progressbar from "../component/ui/progressbar/Progressbar";

export default function Sign() {
  const [isView, setIsView] = useState(false);

  const [isStepComplete, setIsStepComplete] = useState({
    step1: false,
    step2: false,
  });

  // 추후에 nextStep, backStep 함수 구조 바꾸기
  // 체크박스 체크 => 중복체크 api 요청 => 응답에 따라 체크박스 상태 변경
  // api요청은 input 컴포넌트에서? => 그런데 체크박스 상태를 사용하는 컴포넌트는 상위컴포넌트 => 중복체크가 완료되었는지에 대한 상태를 redux로 관리해서 상위 컴포넌트에서 사용하기
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

  //  step1을 true로 만드는 조건 : 중복체크가 완료되었다는 응답을 받았을때
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
        {!isStepComplete.step1 ? (
          <Step1 isView={isView} setIsView={setIsView} />
        ) : (
          <Step2 />
        )}

        <div className="flex flex-row justify-center items-center mb-5">
          {isStepComplete.step1 ? (
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
            <SignupBtn title={!isStepComplete.step1 ? "Next" : "Sign In"} />
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
