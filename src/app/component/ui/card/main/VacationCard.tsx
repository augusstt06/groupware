import Button from '../../button/Button'

export default function VacationCard() {
  return (
    <div className="w-full max-w-sm border-2 border-[#7f8bb1] bg-[#f5f7fc] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-4">
        <span className="md:text-base text-sm text-gray-500 dark:text-white w-4/5 mb-1">휴가</span>
        <div className="flex flex-start justify-between w-4/5 mb-1">
          <span className="md:text-sm text-xs text-gray-500 dark:text-gray-400">가용 휴가</span>
          <span className="md:text-sm text-xs text-white-400 font-bold">가용일수</span>
        </div>

        <div className="flex flex-start justify-between w-4/5 mb-1">
          <span className="md:text-sm text-xs text-gray-500 dark:text-gray-400">사용 휴가</span>
          <span className="md:text-sm text-xs text-white-400 font-bold">사용일수</span>
        </div>
        <div className="flex flex-start justify-between w-4/5">
          <span className="md:text-sm text-xs text-gray-500 dark:text-gray-400">잔여 휴가</span>
          <span className="md:text-sm text-xs text-white-400 font-bold">잔여일수</span>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center w-full mb-2">
        <Button
          buttonContent="휴가 신청"
          className="w-4/5  transition duration-500 ease-in-out justify-center text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white bg-white border-indigo-500 hover:bg-indigo-400 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
        />
      </div>
    </div>
  )
}
