import { FaCheck } from 'react-icons/fa6'
// import { ImCancelCircle } from 'react-icons/im'

export default function MainCheckBox() {
  // FIXME: 상태값에 따라서 아이콘 변경
  return (
    <div className="inline-flex items-center">
      <label className="flex items-center md:p-3 p-1 rounded-full cursor-pointer" htmlFor="custom">
        <input
          type="checkbox"
          className="peer appearance-none w-5 h-5 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-gray-900 checked:border-gray-900 checked:before:bg-gray-900"
          id="custom"
        />
        <span className="text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <FaCheck className="w-3 h-3" />
          {/* <ImCancelCircle className="w-3 h-3" /> */}
        </span>
      </label>
    </div>
  )
}
