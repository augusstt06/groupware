export default function Progressbar(props: { time: string }) {
  // 45분 마다 w-1씩 증가

  const tailwindClassName =
    props.time === '0'
      ? `bg-gray-200 w-full h-2.5 rounded-full dark:bg-gray-700`
      : `bg-purple-600 w-${props.time}/12 h-2.5 rounded-full dark:bg-purple-500`
  return (
    <div className="md:w-3/5 w-2/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div className={tailwindClassName}></div>
    </div>
  )
}
