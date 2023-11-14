import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { createOrgReducer } from '@/app/store/reducers/orgInfoReducer'
import { type SelectboxProps } from '@/app/types/ui/uiTypes'

export default function SelectBox(props: SelectboxProps) {
  const dispatch = useAppDispatch()
  const createOrgState = useAppSelector((state) => state.orgInfo.createOrg)

  const [select, setSelect] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value)
    let reducerProps
    switch (props.compoenetType) {
      case 'orgType':
        reducerProps = { ...createOrgState, organizationType: e.target.value }
        dispatch(createOrgReducer(reducerProps))
        break
    }
  }
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
        onChange={handleChange}
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
