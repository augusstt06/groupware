'use client'
import { useState } from 'react'

import CreateProjectIssueModalTab from '../../tab/project/modal/CreateProjectIssueModalTab'

import CreateProjectIssueModalHub from './hub/CreateProjectIssueModalHub'
import ProjectIssueSchedule from './hub/category/schedule/ProjectIssueSchedule'
import ProjectIssueTask from './hub/category/task/ProjectIssueTask'
import ProjectIssueTodo from './hub/category/todo/ProjectIssueTodo'

import {
  PROJECT_DETAIL_CATEGORY_SCHEDULE,
  PROJECT_DETAIL_CATEGORY_TASK,
  PROJECT_DETAIL_CATEGORY_TODO,
} from '@/constant/constant'
import { useAppSelector } from '@/module/hooks/reduxHooks'

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
