import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { createProjectModalReducer } from '@/app/store/reducers/project/projectModalReducer'

export default function CreateProjectModal() {
  const dispatch = useAppDispatch()
  const colorList = [
    'bg-[rgb(240,185,185)]',
    'bg-[rgb(240,210,190)]',
    'bg-[rgb(170,230,200)]',
    'bg-[rgb(170,220,240)]',
    'bg-[rgb(207,183,242)]',
    'bg-[rgb(228,177,227)]',
  ]
  const handleCreateProjectModal = () => {
    dispatch(createProjectModalReducer())
  }
  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center items-center w-full h-full"
    >
      <div className="absolute top-20 left-20 right-20 p-4 w-3/6">
        <div className="relative rounded-lg shadow dark:bg-gray-700 border-solid border-2 border-indigo-300 bg-white p-5">
          <span className="font-bold">새 프로젝트 만들기</span>
          <div className="mt-2 mb-2">
            <span className="text-sm">프로젝트명</span>
            <input
              type="text"
              placeholder="프로젝트명을 입력해주세요."
              className="rounded rounded mt-2 bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <span className="text-sm">프로젝트 색상</span>
            <div className="flex flex-row items-center justify-start">
              {colorList.map((data) => (
                <div className={`${data} w-16 h-8 rounded-lg mr-5 mt-2`} key={data}></div>
              ))}
            </div>
          </div>
          <div className=" flex flex-row items-center justify-center mt-5">
            <button
              className="transition ease-in-out duration-300 border-gray-400 border-2 bg-white-600 hover:bg-gray-500 hover:text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2er mr-5"
              onClick={handleCreateProjectModal}
            >
              취소
            </button>
            <button className="transition ease-in-out duration-300 border-gray-400 border-2 bg-white-600 hover:bg-gray-500 hover:text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2er">
              생성
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
