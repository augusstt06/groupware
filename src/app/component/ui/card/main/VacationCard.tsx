import RegisterVacatioBtn from '../../button/main/vacation/RegisterVacationBtn'

export default function VacationCard() {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-4">
        <span className="text-lg text-gray-500 dark:text-white w-4/5 mb-1">휴가</span>
        <div className="flex flex-start justify-between w-4/5 mb-1">
          <span className="text-medium text-gray-500 dark:text-gray-400">가용 휴가</span>
          <span className="text-medium text-gray-500 dark:text-gray-400">가용 휴가 일수</span>
        </div>

        <div className="flex flex-start justify-between w-4/5 mb-1">
          <span className="text-medium text-gray-500 dark:text-gray-400">사용 휴가</span>
          <span className="text-medium text-gray-500 dark:text-gray-400">사용 휴가 일수</span>
        </div>
        <div className="flex flex-start justify-between w-4/5">
          <span className="text-medium text-gray-500 dark:text-gray-400">잔여 휴가</span>
          <span className="text-white-400 font-bold">잔여 휴가 일수</span>
        </div>
      </div>

      <RegisterVacatioBtn />
    </div>
  )
}
