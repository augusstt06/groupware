"use client";

import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import Step1 from "../component/pages/loginStep/Step1";
import Step2 from "../component/pages/loginStep/Step2";
import { SignupBtn } from "../component/ui/button/LoginBtn";
import Progressbar from "../component/ui/progressbar/Progressbar";

export default function Sign() {
  const [isView, setIsView] = useState(false);
  const [isNext, setIsNext] = useState(false);

  // 스텝1 완료 여부 => 이메일/패스워드 상태값을 확인해 둘다 true면 다음 페이지 가능
  const isStep1Complete = useAppSelector((state) => {
    console.log(state.isStep1InputValid, "액션객체 상태");
    if (
      state.isStep1InputValid.isEmailAvailable &&
      state.isStep1InputValid.isPwdAvailable
    ) {
      return true;
    } else {
      return false;
    }
  });

  const handleStep = () => {
    if (isStep1Complete === false) {
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
        {!isStep1Complete || !isNext ? (
          <Step1 isView={isView} setIsView={setIsView} />
        ) : (
          <Step2 />
        )}

        <div className="flex flex-row justify-center items-center">
          {isStep1Complete ? (
            isNext ? (
              <>
                <div
                  className="flex flex-col justify-center items-center p 1 "
                  onClick={handleStep}
                >
                  <SignupBtn title="Back" />
                </div>
                <div
                  className="flex flex-col justify-center items-center p 1"
                  onClick={handleStep}
                >
                  <SignupBtn title={"Sign In"} />
                </div>
              </>
            ) : (
              <div
                className="flex flex-col justify-center items-center p 1"
                onClick={handleStep}
              >
                <SignupBtn title="Next" />
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
