export default function MainTab() {
  return (
    <div className="w-full md:text-sm text-xs md:p-2 md:font-bold text-center border border-gray-200 rounded-lg shadow dark:bg-[#1a202c] dark:border-gray-700 mb-5">
      <div className="mt-2 mb-2">
        <span className="md:text-lg text-base">TODO</span>
      </div>
      <ul className="flex flex-row justify-around -mb-px">
        <li className="me-2">
          <a className="text-xs md:text-medium inline-block md:p-4 p-3 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
            전체
          </a>
        </li>

        <li className="me-2">
          <a className="text-xs md:text-medium inline-block md:p-4 p-3 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
            공지사항
          </a>
        </li>
      </ul>
    </div>
  )
}
