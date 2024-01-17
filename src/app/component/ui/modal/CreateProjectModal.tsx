import CreateProjectModalBtn from '../button/project/modal/CreateProjectModalBtn'
import {
  CreateProjectModalColorSelect,
  CreateProjectModalInput,
} from '../input/project/modal/CreateProjectModalInputs'

export default function CreateProjectModal() {
  const colorList = [
    'bg-[rgb(240,185,185)]',
    'bg-[rgb(240,210,190)]',
    'bg-[rgb(170,230,200)]',
    'bg-[rgb(170,220,240)]',
    'bg-[rgb(207,183,242)]',
    'bg-[rgb(228,177,227)]',
  ]

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-blur-xs"
    >
      <div className="relative p-4 w-3/6">
        <div className="relative rounded-lg shadow dark:bg-gray-700 border-solid border-2 border-indigo-300 bg-white p-5">
          <span className="font-bold">새 프로젝트 만들기</span>
          <CreateProjectModalInput />
          <CreateProjectModalColorSelect colorList={colorList} />
          <CreateProjectModalBtn />
        </div>
      </div>
    </div>
  )
}
