import { SignupBtn } from "./component/button/SignBtn";
import Link from "next/link";

export default function Home() {
  return (
    // 로그인 여부에 따라서 화면 변경

    // 비로그인시
    <main className="flex flex-col justify-center items-center p-10">
      <div className="text-xl font-bold mb-10">
        Easily collaborate with your team from anywhere
      </div>
      <div className="text-medium font-semibold mb-10">other comments...</div>
      <div>
        <Link href={"/login"}>
          <SignupBtn />
        </Link>
      </div>
    </main>
    // 로그인시
  );
}
