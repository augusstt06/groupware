import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail, AiOutlineGlobal } from "react-icons/ai";

export default function Top() {
  const items = [
    { icon: <BsFillTelephoneFill />, descrip: "010 - 0000 -0000" },
    { icon: <AiOutlineMail />, descrip: "augusstt@test.com" },
  ];
  return (
    <div className="mx-3 py-5 text-center">
      <div className="flex gap-3 flex-wrap justify-around">
        <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent font-bold text-2xl">
          avez vous une question?
        </div>
        <ul className="flex flex-wrap gap-2 md:gap-8 justify-center text-center">
          {items.map(({ icon, descrip }, index) => (
            <li key={index} className="flex items-center gap-2">
              <span>{icon}</span>
              <span>{descrip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
