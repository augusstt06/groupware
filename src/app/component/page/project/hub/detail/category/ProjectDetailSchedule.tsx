import { useEffect } from 'react'

import {
  PROJECT_DETAIL_CATEGORY_SCHEDULE,
  PROJECT_SIDEBAR_SCHEDULE_ALL,
} from '@/app/constant/constant'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import {
  changeProjectDetailCategoryReducer,
  changeProjectDetailScheduleCategoryReducer,
} from '@/app/store/reducers/project/projectDetailCategoryReducer'

export default function ProjectDetailSchedule() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(changeProjectDetailCategoryReducer(PROJECT_DETAIL_CATEGORY_SCHEDULE))
    dispatch(changeProjectDetailScheduleCategoryReducer(PROJECT_SIDEBAR_SCHEDULE_ALL))
  })
  return <div></div>
}
