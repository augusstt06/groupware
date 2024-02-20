import { type InviteProjectMemberTableProps } from '@/app/types/ui/extra'

export default function InviteProjectMemberTable(props: InviteProjectMemberTableProps) {
  const { name } = props.memberInfo
  return (
    <div className="flex flex-row items-center justify-start lg:w-2/3 w-full mt-3 mb-3 p-2 dark:border-gray-700 ">
      <div className="bg-gray-300 p-2 rounded-full lg:inline hidden">img</div>
      <div className="flex flex-col lg:items-start items-center lg:ml-3 w-full">
        <span className="sm:text-lg text-sm w-4/5 mb-1 lg:text-left text-center ">{name}</span>
        <div className="truncate lg:inline flex flex-col items-center text-center">
          <span className="2xl:text-sm text-xs lg:w-4/5 lg:mr-1">개발팀</span>
          <span className="2xl:text-sm text-xs lg:w-4/5">프론트엔드 개발</span>
        </div>
      </div>
    </div>
  )
}
