'use client'
import { useState } from 'react'

import CreateProjectIssueModalHub from '../CreateProjectIssueModalHub'

import ProjectIssueSchedule from './schedule/ProjectIssueSchedule'
import ProjectIssueTask from './task/ProjectIssueTask'
import ProjectIssueTodo from './todo/ProjectIssueTodo'

import CreateProjectIssueModalTab from '@/_components/tab/project/modal/CreateProjectIssueModalTab'
import {
  PROJECT_DETAIL_CATEGORY_SCHEDULE,
  PROJECT_DETAIL_CATEGORY_TASK,
  PROJECT_DETAIL_CATEGORY_TODO,
} from '@/_constant/constant'
import { useAppSelector } from '@/_module/hooks/reduxHooks'

export default function CreateProjectIssueModal() {
  const detailCategory = useAppSelector((state) => state.projectDetailCategory.detailCategory)
  const [selectCategory, setSelectCategory] = useState('')
  const changeSelectCategory = (id: string) => {
    setSelectCategory(id)
  }
  const renderIssueComponent = () => {
    switch (detailCategory) {
      case PROJECT_DETAIL_CATEGORY_TASK:
        return <ProjectIssueTask />
      case PROJECT_DETAIL_CATEGORY_SCHEDULE:
        return <ProjectIssueSchedule />
      case PROJECT_DETAIL_CATEGORY_TODO:
        return <ProjectIssueTodo />
      default:
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
  }
  return <>{renderIssueComponent()}</>
}
