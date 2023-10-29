import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="avatar">
        <div className="w-16 rounded">
          <h3 className="text-3xl text-indigo-500 font-bold">Logo</h3>
        </div>
      </div>
    </Link>
  );
}
