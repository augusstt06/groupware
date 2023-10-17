import Link from "next/link";

interface Drop_Props {
  name: string;
  dropdownItems: { name: string; url: string }[];
}
export default function Dropdown({ name, dropdownItems }: Drop_Props) {
  return (
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="">
        {name}
      </label>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {dropdownItems.map(
          ({ name, url }: { name: string; url: string }, index: number) => (
            <li key={index} className="hover:font-bold">
              <Link href={url}>{name}</Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
