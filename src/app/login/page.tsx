"use client";

import { useState } from "react";
import Step1 from "../component/pages/login-step/step1";
import Step2 from "../component/pages/login-step/Step2";
import { SignupBtn } from "../component/ui/button/LoginBtn";
import Progressbar from "../component/ui/progressbar/Progressbar";

export default function Sign() {
  const [viewPwd, setViewPwd] = useState(false);
  const [isItemFull, setIsItemFUll] = useState({
    step1: false,
    step2: false,
  });
  const [items, setItems] = useState({
    allItems: 5,
    completedItems: 0,
  });
  const entryCompleted = () => {
    if (items.completedItems === items.allItems) return;
    setItems({
      allItems: 5,
      completedItems: items.completedItems + 1,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center p 1">
      <div className="mt-10 mb-5 w-3/5">
        {!isItemFull.step1 ? (
          <Step1 viewPwd={viewPwd} setViewPwd={setViewPwd} />
        ) : (
          <Step2 />
        )}

        <div className="flex flex-col justify-center items-center p 1 mt-5">
          <SignupBtn title={!isItemFull.step1 ? "Next" : "Sign In"} />
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
