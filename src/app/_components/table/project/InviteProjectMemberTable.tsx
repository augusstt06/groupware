import { type InviteProjectMemberTableProps } from '@/_types/ui/extra'

export default function InviteProjectMemberTable(props: InviteProjectMemberTableProps) {
  const { name, position, teams } = props.memberInfo
  return (
    <div className="flex flex-row items-center justify-start w-full p-2 mt-3 mb-3 cursor-pointer lg:w-2/3 dark:border-gray-700">
      <div className="hidden p-2 bg-gray-300 rounded-full lg:inline">img</div>
      <div className="flex flex-col items-center w-full lg:items-start lg:ml-3">
        <span className="w-4/5 mb-1 text-sm text-center sm:text-lg lg:text-left ">{name}</span>
        <div className="flex flex-col items-center text-center truncate lg:inline">
          <span className="text-xs 2xl:text-sm lg:w-4/5 lg:mr-1">{teams[0].name}</span>
          <span className="text-xs 2xl:text-sm lg:w-4/5">{position}</span>
        </div>
      </div>
    </div>
  )
}
