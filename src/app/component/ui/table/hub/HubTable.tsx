export default function HubTable() {
  // FIXME: posting 5개 response 받아서 mapping
  return (
    <div id="detailed-pricing" className="w-4/5 overflow-x-auto">
      <div className="overflow-hidden min-w-max">
        <div className="grid grid-cols-4 p-2 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          <div className="flex items-center">Current Post</div>
          <div>Title</div>
          <div>Author</div>
          <div>Date</div>
        </div>
        <div className="grid grid-cols-4 px-2 py-3 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
          <div className="text-gray-500 dark:text-gray-400">test Title</div>
          <div>test Author</div>
          <div>test Date</div>
        </div>
      </div>
    </div>
  )
}
