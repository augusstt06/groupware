import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";

export default function Home() {
  const isDark: boolean = useSelector((state: RootState) => state.value);

  return <main>현재 테마 {isDark ? "Dark Mode" : "Light Mode"}</main>;
}
