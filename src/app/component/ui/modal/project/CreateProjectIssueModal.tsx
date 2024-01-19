'use client'
import { useState } from 'react'

import CreateProjectIssueModalConfirmBtn from '../../button/project/modal/CreateProjectIssueModalConfirmBtn'
import CreateProjectIssueModalTab from '../../tab/project/modal/CreateProjectIssueModalTab'

import CreateProjectIssueModalHub from './hub/CreateProjectIssueModalHub'

export default function CreateProjectIssueModal() {
  const [selectCategory, setSelectCategory] = useState('')
  const changeSelectCategory = (id: string) => {
    setSelectCategory(id)
  }
  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-blur-xs"
    >
      <div className="relative rounded-lg shadow dark:bg-gray-700 border-solid border-2 border-indigo-300 bg-white p-5 w-3/6 ">
        <CreateProjectIssueModalTab
          selectCategory={selectCategory}
          changeSelectCategory={changeSelectCategory}
        />
        <CreateProjectIssueModalHub selectCategory={selectCategory} />
        <CreateProjectIssueModalConfirmBtn />
      </div>
    </div>
  )
}
