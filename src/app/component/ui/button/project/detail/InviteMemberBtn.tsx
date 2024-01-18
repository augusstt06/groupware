import { TbUsersPlus } from 'react-icons/tb'

export default function InviteMemberBtn() {
  return (
    <div className="max-w-sm border border-gray-200 transition ease-in-out duration-300 rounded-lg shadow bg-indigo-400 dark:bg-indigo-400 hover:bg-indigo-600 hover:dark:bg-indigo-500 dark:border-gray-700 text-center justify-center">
      <button className=" w-full justify-center text-white dark:text-white focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center">
        <TbUsersPlus className="mr-2" />
        <span>초대하기</span>
      </button>
    </div>
  )
}
