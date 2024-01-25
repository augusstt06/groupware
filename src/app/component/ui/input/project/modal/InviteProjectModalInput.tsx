import { FaSearch } from 'react-icons/fa'

export default function InviteProjectModalInput() {
  return (
    <div className="mt-4 flex flex-row items-center justify-center border-2 border-gray-300 p-2 rounded-full w-5/6 truncate">
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        className="p-1 focus:outline-none w-5/6 text-xs md:text-sm lg-text-base"
      />
      <div className="cursor-pointer w-1/6 flex items-center justify-center trasition duration-500 ease-in-out hover:scale-110">
        <FaSearch className="w-4 h-4" />
      </div>
    </div>
  )
}
