import { type AttendanceHistoryTableProps } from '@/app/types/ui/tableTypes'

export default function AttendanceHistoryTable(props: AttendanceHistoryTableProps) {
  return (
    <div id="detailed-pricing" className="w-4/5 overflow-x-auto w-full">
      <div className="overflow-hidden min-w-max">
        {/* 항목 추가시 grid-cols 값 증가 */}
        <div className="grid grid-cols-2 p-2 text-sm font-bold  text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          <div>출/퇴근</div>
          <div>시간</div>
        </div>
        {props.history.map((data) => (
          <div
            className="grid grid-cols-2 px-2 py-3 font-medium text-sm text-white-700 border-b border-gray-200 gap-x-16 dark:border-gray-700"
            key={data.id}
          >
            {data.type === 'in' ? (
              <div className="text-blue-300">출근</div>
            ) : (
              <div className="text-red-300">퇴근</div>
            )}

            <div>
              {new Date(data.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Seoul' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
