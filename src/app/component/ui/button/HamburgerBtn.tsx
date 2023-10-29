import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

type Props = {
  nav: boolean;
  setNav: (nav: boolean) => void;
};
export default function HamburgerBtn(props: Props) {
  return (
    <button
      className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
      onClick={() => props.setNav(!props.nav)}
    >
      {props.nav ? (
        <RxCross1 className="text-indigo-500 w-10 h-6 hover:text-stone-800" />
      ) : (
        <AiOutlineMenu className="text-indigo-500 w-10 h-6 hover:text-stone-800" />
      )}
    </button>
  );
}
