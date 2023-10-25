import { SigninBtn } from "./component/Sign/SignBtn";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center p-10">
      <div className="text-xl font-bold mb-10">
        Easily collaborate with your team from anywhere
      </div>
      <div className="text-medium font-semibold mb-10">other comments...</div>
      <div>
        <Link href={"/signup"}>
          <SigninBtn />
        </Link>
      </div>
    </main>
  );
}
