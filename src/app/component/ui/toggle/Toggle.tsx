import React, { useState } from 'react'

import { FALSE, ORG_GRADES, TRUE } from '@/app/constant/constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { setGradeReducer } from '@/app/store/reducers/login/orgInfoReducer'
import { type ToggleProps } from '@/app/types/ui/uiTypes'

export default function Toggle(props: ToggleProps) {
  const dispatch = useAppDispatch()
  const gradesState = useAppSelector((state) => state.orgInfo.grades)
  const [isToggle, setIsToggle] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsToggle(!isToggle)
    let reducerProps
    switch (props.componentType) {
      case ORG_GRADES:
        reducerProps = { ...gradesState, [props.value]: e.target.checked ? TRUE : FALSE }
        dispatch(setGradeReducer(reducerProps))
        break
      default:
        break
    }
  }
  const stateColor = isToggle ? `text-sky-400` : `text-red-300 line-through`

  return (
    <div className="flex flex-row mb-3">
      <div className={`mr-5 w-3/5 text-center ${stateColor}`}>{props.title}</div>
      <div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isToggle}
            onChange={handleChange}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
        </label>
      </div>
    </div>
  )
}
