import { TbUsersPlus } from 'react-icons/tb'

import Button from '../../button/Button'

import {
  PROJECT_DETAIL_CATEGORY_HOME,
  PROJECT_DETAIL_CATEGORY_SCHEDULE,
  PROJECT_DETAIL_CATEGORY_TASK,
  PROJECT_DETAIL_CATEGORY_TODO,
} from '@/constant/constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { changeProjectDetailCategoryReducer } from '@/store/reducers/project/projectDetailCategoryReducer'
import { projectInviteModalReducer } from '@/store/reducers/project/projectModalReducer'
import { type ProjectDetailTabProps } from '@/types/ui/extra'

export default function ProjectDetailTab(props: ProjectDetailTabProps) {
  const dispatch = useAppDispatch()
  const currentCategory = useAppSelector((state) => state.projectDetailCategory.detailCategory)
  const issueCategoryList = [
    { title: PROJECT_DETAIL_CATEGORY_HOME },
    { title: PROJECT_DETAIL_CATEGORY_TASK },
    { title: PROJECT_DETAIL_CATEGORY_SCHEDULE },
    { title: PROJECT_DETAIL_CATEGORY_TODO },
  ]
  const categoryClassName = (selectTitle: string) => {
    if (currentCategory === selectTitle) {
      return 'w-1/3 mr-2 lg:text-base text-sm text-center smooth-transition cursor-pointer hover:scale-110 border-b-2 border-indigo-400 p-2'
    } else {
      return 'w-1/3 mr-2 lg:text-base text-sm text-center smooth-transition cursor-pointer hover:scale-110 p-2 border-transparent border-b-2'
    }
  }
  const handleChangeCategory = (title: string) => {
    dispatch(changeProjectDetailCategoryReducer(title))
  }
  const inviteBtnContent = (
    <>
      <TbUsersPlus className="mr-2" />
      <span>초대하기</span>
    </>
  )
  const hancleClickInviteMemberBtn = () => {
    dispatch(projectInviteModalReducer(true))
  }
  return (
    <div className="w-4/5 max-w-7xl sort-vertical-flex rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10">
      <div className="sort-row-flex justify-between w-full p-3">
        <span className="font-bold">{props.projectInfo?.name}</span>
        <Button
          buttonContent={inviteBtnContent}
          className="w-1/7 smooth-transition rounded-lg shadow bg-indigo-400 dark:bg-indigo-400 hover:bg-indigo-600 hover:dark:bg-indigo-500 justify-center text-white dark:text-white focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center"
          onClick={hancleClickInviteMemberBtn}
        />
      </div>
      <div className="sort-row-flex justify-around p-1 2xl:w-2/3 md:w-2/3 sm:w-full">
        {issueCategoryList.map((data) => (
          <div
            key={data.title}
            className={categoryClassName(data.title)}
            onClick={() => {
              handleChangeCategory(data.title)
            }}
          >
            <span>{data.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
