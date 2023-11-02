"use client";

import { useState } from "react";
import { useAppSelector } from "../module/hooks/reduxHooks";

import { SignupBtn } from "../component/ui/button/LoginBtn";
import Progressbar from "../component/ui/progressbar/Progressbar";
import KeyInfo from "../component/pages/enterLoginInfo/KeyInfo";
import AdditionalInfo from "../component/pages/enterLoginInfo/AdditionalInfo";

export default function Sign() {
  const [isView, setIsView] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const isKeyInfoComplete = useAppSelector((state) => {
    console.log(state.isLoginInfoInputValid, "액션객체 상태");
    const isEmailComplete = state.isLoginInfoInputValid.isEmailCheck.check;
    const isPwdComplete = state.isLoginInfoInputValid.isPwdCheck.check;
    if (isEmailComplete && isPwdComplete) {
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
          <KeyInfo isView={isView} setIsView={setIsView} />
        ) : (
          <AdditionalInfo />
        )}

        <div className="flex flex-row justify-center items-center">
          {isKeyInfoComplete ? (
            isNext ? (
              <>
                <div
                  className="flex flex-col justify-center items-center p 1 mr-2"
                  onClick={handleStep}
                >
                  <SignupBtn title="Back" />
                </div>
                <div
                  className="flex flex-col justify-center items-center p 1 ml-2"
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
