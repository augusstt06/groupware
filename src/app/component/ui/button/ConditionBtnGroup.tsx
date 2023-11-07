import { ConditionBtnElementProps, ConditionBtnProps } from "@/app/types";
import { SignupBtn } from "./LoginBtn";

export default function ConditionBtnGroup(props: ConditionBtnProps) {
  const btnClass = "flex flex-col justify-center items-center p 1";
  return (
    <>
      {props.isKeyInfoComplete ? (
        <SigninBtnElement
          title={props.isNext ? "Sign In" : "Next"}
          isKeyInfoComplete={props.isKeyInfoComplete}
          handleStep={props.handleStep}
          tailwindClass={btnClass}
        />
      ) : (
        <></>
      )}
    </>
  );
}

function SigninBtnElement(props: ConditionBtnElementProps) {
  return (
    <div className={props.tailwindClass} onClick={props.handleStep}>
      <SignupBtn
        title={props.title}
        isKeyInfoComplete={props.isKeyInfoComplete}
      />
    </div>
  );
}
