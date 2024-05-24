import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

import { type FloatingInputProps } from '@/_types/ui/input'

export default function FloatingInput(props: FloatingInputProps) {
  const { title, value, onChange, inputViewType, isViewActive, handleViewType } = props
  const renderViewContentIcon = () => {
    if (isViewActive === true) {
      if (inputViewType === 'password') {
        return (
          <IoMdEye
            className="absolute smooth-transition cursor-pointer hover:scale-125 top-3.5 right-2"
            onClick={handleViewType}
          />
        )
      }
      return (
        <IoMdEyeOff
          className="absolute smooth-transition cursor-pointer hover:scale-125 top-3.5 right-2"
          onClick={handleViewType}
        />
      )
    }
    return null
  }
  return (
    <div className="relative">
      <input
        type={inputViewType}
        id={title}
        value={value}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-[#383c4a] rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        onChange={onChange}
        placeholder=""
      />
      <label
        htmlFor={title}
        className="absolute rounded-lg text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[rgb(250,250,250)] dark:bg-[#383c4a] px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-focus:bg-[rgb(250,250,250)] peer-focus:dark:bg-gray-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {title}
      </label>
      {renderViewContentIcon()}
    </div>
  )
}
