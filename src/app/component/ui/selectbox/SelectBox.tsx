import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { createOrgReducer } from '@/app/store/reducers/orgInfoReducer'
import { type SelectboxProps } from '@/app/types/ui/uiTypes'

export default function SelectBox(props: SelectboxProps) {
  const dispatch = useAppDispatch()
  const orgState = useAppSelector((state) => {
    return state.orgInfo.createOrg
  })

  const [select, setSelect] = useState('')
  // props로 구분해서 나누기
  const handleOrgTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value)
    dispatch(
      createOrgReducer({
        name: orgState.name,
        description: orgState.description,
        organizationType: e.target.value,
      }),
    )
  }
  // FIXME: grade value 하나하나를 dispatch해서 상태 변경해야 한다. 리듀서 다시 작성하기

  // const handleOrgGradesSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelect(e.target.value)
  // }
  return (
    <div className="mb-6">
      <label
        htmlFor="Type"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.title}
      </label>
      <select
        id="orgtype"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleOrgTypeSelect}
        value={select}
      >
        {props.selectList.map((data) => (
          <option value={data.value} key={data.value}>
            {data.name}
          </option>
        ))}
      </select>
    </div>
  )
}
