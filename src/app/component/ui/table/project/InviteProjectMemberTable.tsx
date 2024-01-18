export default function InviteProjectMemberTable() {
  return (
    <div className="flex flex-row items-center justify-start w-full mt-3 mb-3 p-2 dark:border-gray-700">
      <div className="bg-gray-300 p-2 rounded-full">img</div>
      <div className="flex flex-col items-left ml-3 w-full">
        <span className="md:text-lg text-sm w-4/5 mb-1">김충연</span>
        <div className="truncate">
          <span className="text-xs w-4/5 mr-2">개발팀 </span>
          <span className="text-xs w-4/5">프론트엔드 개발</span>
        </div>
      </div>
    </div>
  )
}
