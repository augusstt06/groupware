import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'

import { type PaginationProps } from '@/types/pageType'

export default function Pagination(props: PaginationProps) {
  const moveNextBoardList = () => {
    if (props.pageNumber === props.size - 1) return

    props.setPageNumber(props.pageNumber + 1)
  }
  const moveStartBoardList = () => {
    props.setPageNumber(0)
  }
  const moveEndBoardList = () => {
    props.setPageNumber(props.size - 1)
  }
  const movePreviousBoardList = () => {
    if (props.pageNumber < 1) return
    props.setPageNumber(props.pageNumber - 1)
  }

  const moveSpecifiedBoardList = (page: number) => {
    props.setPageNumber(page)
  }
  const loopLiTag = Array.from({ length: props.size }, (_, index) => (
    <li
      key={index}
      onClick={() => {
        moveSpecifiedBoardList(index)
      }}
      className="cursor-pointer"
    >
      <a
        className={`flex items-center justify-center px-4 h-10 leading-tight  ${
          props.pageNumber === index
            ? 'bg-gray-200 dark:bg-gray-500 font-bold text-gray-700'
            : 'bg-white dark:bg-gray-800 text-gray-500'
        } border border-gray-300 hover:text-gray-700  dark:border-gray-700 dark:text-gray-400  dark:hover:text-white`}
      >
        {index + 1}
      </a>
    </li>
  ))
  return (
    <nav aria-label="Page navigation example" className="mt-2 mb-5">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li onClick={moveStartBoardList} className="cursor-pointer">
          <a className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Start</span>

            <MdKeyboardDoubleArrowLeft />
          </a>
        </li>
        <li onClick={movePreviousBoardList} className="cursor-pointer">
          <a className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Previous</span>

            <IoIosArrowBack />
          </a>
        </li>

        {loopLiTag}

        <li onClick={moveNextBoardList} className="cursor-pointer">
          <a className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <IoIosArrowForward />
          </a>
        </li>
        <li onClick={moveEndBoardList} className="cursor-pointer">
          <a className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">End</span>
            <MdKeyboardDoubleArrowRight />
          </a>
        </li>
      </ul>
    </nav>
  )
}
