import InviteMemberBtn from '@/app/component/ui/button/project/detail/InviteMemberBtn'
import {
  PROJECT_DETAIL_CATEGORY_CALENDAR,
  PROJECT_DETAIL_CATEGORY_HOME,
  PROJECT_DETAIL_CATEGORY_TASK,
  PROJECT_DETAIL_CATEGORY_TODO,
} from '@/app/constant/constant'
import { type ProjectDetailTabProps } from '@/app/types/ui/uiTypes'

export default function ProjectDetailTab(props: ProjectDetailTabProps) {
  const issueCategoryList = [
    { title: PROJECT_DETAIL_CATEGORY_HOME },
    { title: PROJECT_DETAIL_CATEGORY_TASK },
    { title: PROJECT_DETAIL_CATEGORY_CALENDAR },
    { title: PROJECT_DETAIL_CATEGORY_TODO },
  ]

  return (
    <div className="md:w-4/5 w-full flex flex-col items-left dark:bg-[#1a202c] dark:border-gray-700 border border-gray-200 rounded-lg shadow-lg p-2 mb-5">
      <div className="w-full p-3 flex flex-row justify-between items-center">
        <span className="font-bold">{props.projectInfo?.name}</span>
        <InviteMemberBtn />
      </div>
      <div className="flex flex-row 2xl:w-2/3 md:w-2/3 sm:w-full justify-around p-1">
        {issueCategoryList.map((data) => (
          <div
            key={data.title}
            className="w-1/3 mr-2 lg:text-base text-sm text-center transition ease-in-out duration-300 hover:scale-110 hover:border-b-2 hover:border-indigo-400 p-2 border-transparent border-b-2"
            onClick={() => {
              props.handleChangeDetailCategory(data.title)
            }}
          >
            <span>{data.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
