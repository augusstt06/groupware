// import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
// import { categoryReduer } from '@/app/store/reducers/board/boardCategoryReducer'
import { type MainTabProps } from '@/app/types/ui/uiTypes'

export default function BoardTab(props: MainTabProps) {
  // const dispatch = useAppDispatch()
  // const clickBoardCategory = (name: string) => {
  //   switch (name) {
  //     case '공지사항':
  //       dispatch(categoryReduer('announce'))
  //       return
  //     default:
  //       dispatch(categoryReduer('whole'))
  //   }
  // }
  return (
    <div className="w-full md:text-sm text-xs md:p-2 md:font-bold text-center border border-gray-200 rounded-lg shadow dark:bg-[#1a202c] dark:border-gray-700 mb-5">
      <div className="mt-2 mb-2">
        <span className="md:text-lg text-base">{props.title}</span>
      </div>
      <ul className="flex flex-row justify-around -mb-px">
        <li className="me-2">
          <a
            className="text-xs md:text-medium inline-block md:p-4 p-3 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            // FIXME: 추후 수정예정
            onClick={() => {
              // clickBoardCategory('공지사항')
            }}
          >
            전체
          </a>
        </li>
        {props.myBoardList !== undefined ? (
          props.myBoardList.map((data) => (
            <li className="me-2" key={data.id}>
              <a
                className="text-xs md:text-medium inline-block md:p-4 p-3 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                onClick={() => {
                  // clickBoardCategory(data.name)
                }}
              >
                {data.name}
              </a>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}
