import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { createProjectModalReducer } from '@/app/store/reducers/project/projectModalReducer'

export default function CreateProjectModalBtn() {
  const dispatch = useAppDispatch()
  const handleCreateProjectModal = () => {
    dispatch(createProjectModalReducer())
  }
  return (
    <div className=" flex flex-row items-center justify-center mt-5">
      <button
        className="transition ease-in-out duration-300 border-gray-400 border-2 bg-white-600 hover:bg-gray-500 hover:dark:bg-gray-200 hover:dark:text-black hover:text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2er mr-5"
        onClick={handleCreateProjectModal}
      >
        취소
      </button>
      <button className="transition ease-in-out duration-300 border-gray-400 border-2 bg-white-600 hover:bg-gray-500 hover:dark:bg-gray-200 hover:dark:text-black hover:text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2er">
        생성
      </button>
    </div>
  )
}
