import { type BoardWriteModalCheckBoxProps } from '@/app/types/ui/uiTypes'

export default function BoardWriteModalCheckBox(props: BoardWriteModalCheckBoxProps) {
  return (
    <div className="flex items-center border-t border-gray-200 rounded-b dark:border-gray-600">
      <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
        <input
          id="bordered-checkbox-1"
          type="checkbox"
          value={props.isAnnounce}
          onClick={props.handleClick}
          name="bordered-checkbox"
          className="w-4 h-4 p-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="bordered-checkbox-1"
          className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          공지글로 지정
        </label>
      </div>
    </div>
  )
}
