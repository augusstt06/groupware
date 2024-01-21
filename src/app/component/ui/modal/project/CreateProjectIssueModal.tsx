'use client'
import { useState } from 'react'

import CreateProjectIssueModalTab from '../../tab/project/modal/CreateProjectIssueModalTab'

import CreateProjectIssueModalHub from './hub/CreateProjectIssueModalHub'

export default function CreateProjectIssueModal() {
  const [selectCategory, setSelectCategory] = useState('')
  const changeSelectCategory = (id: string) => {
    setSelectCategory(id)
  }
  return (
    <>
      <CreateProjectIssueModalTab
        selectCategory={selectCategory}
        changeSelectCategory={changeSelectCategory}
      />
      <CreateProjectIssueModalHub selectCategory={selectCategory} />
    </>
  )
}
