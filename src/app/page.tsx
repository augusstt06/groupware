import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";

export default function Home() {
  const isDark = useSelector((state: RootState) => state.themeReducer.isDark);

  return <main>현재 테마 {isDark ? "Dark Mode" : "Light Mode"}</main>;
}
