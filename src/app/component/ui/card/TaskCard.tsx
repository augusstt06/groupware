export default function TaskCard(props: { title: string }) {
  return (
    <div className="col-span-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h3 className="mb-3 font-medium text-gray-700 dark:text-gray-200">{props.title}</h3>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">test issue title</p>
    </div>
  )
}
