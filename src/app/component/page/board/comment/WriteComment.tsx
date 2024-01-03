import { IoCameraOutline } from 'react-icons/io5'

export default function WriteComment() {
  return (
    <div className=" pt-2 pb-2">
      <div className="border-2 border-gray-300 rounded-lg flex flex-col p-2">
        <span className="text-sm font-bold pl-3 mb-2">작성자 이름</span>
        <input
          placeholder="댓글을 남겨보세요"
          className="outline-none bg-white dark:bg-gray-700 p-3 text-sm"
        />
        <div className="flex flex-row justify-between w-full items-center pl-3">
          {/* FIXME: 클릭시 파일 첨부 */}
          <IoCameraOutline className="w-5 h-5" />
          <button className="w-1/5 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75">
            등록
          </button>
        </div>
      </div>
    </div>
  )
}
