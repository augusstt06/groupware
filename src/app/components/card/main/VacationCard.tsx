import Button from '../../button/Button'

export default function VacationCard() {
  return (
    <div className="w-full max-w-sm mb-5">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-4">
        <span className="w-full mb-1 text-sm text-gray-500 md:text-base dark:text-white">휴가</span>
        <div className="flex justify-between w-full mb-1 flex-start">
          <span className="text-xs text-gray-500 md:text-sm dark:text-gray-400">가용 휴가</span>
          <span className="text-xs font-bold md:text-sm text-white-400">가용일수</span>
        </div>

        <div className="flex justify-between w-full mb-1 flex-start">
          <span className="text-xs text-gray-500 md:text-sm dark:text-gray-400">사용 휴가</span>
          <span className="text-xs font-bold md:text-sm text-white-400">사용일수</span>
        </div>
        <div className="flex justify-between w-full flex-start">
          <span className="text-xs text-gray-500 md:text-sm dark:text-gray-400">잔여 휴가</span>
          <span className="text-xs font-bold md:text-sm text-white-400">잔여일수</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center w-full mb-2">
        <Button
          buttonContent="휴가 신청"
          className="w-4/5  smooth-transition justify-center text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-400 dark:border-white bg-white border-indigo-400 hover:bg-indigo-400 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
        />
      </div>
    </div>
  )
}
