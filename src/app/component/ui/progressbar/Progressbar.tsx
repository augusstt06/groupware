export default function Progressbar(props: { time: string }) {
  //  1시간에 w-4 , 15분에 w-1
  const tailwindClassName =
    props.time === '0'
      ? `bg-gray-200 w-full h-2.5 rounded-full dark:bg-gray-700`
      : `bg-purple-600 w-${props.time} h-2.5 rounded-full dark:bg-purple-500`
  return (
    <div className="w-3/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div className={tailwindClassName}></div>
    </div>
  )
}
