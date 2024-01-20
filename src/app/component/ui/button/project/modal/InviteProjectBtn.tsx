import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { projectInviteModalReducer } from '@/app/store/reducers/project/projectModalReducer'

export default function InviteProjectBtn() {
  const dispatch = useAppDispatch()
  const handleCreateProjectModal = () => {
    dispatch(projectInviteModalReducer(false))
  }
  return (
    <div className=" flex flex-row items-center justify-center p-3">
      <button
        className="transition ease-in-out duration-300 border-gray-400 border-2 bg-white-600 hover:bg-gray-500 hover:dark:bg-gray-200 hover:dark:text-black hover:text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2er mr-5"
        onClick={handleCreateProjectModal}
      >
        취소
      </button>
      <button className="transition ease-in-out duration-300 border-gray-400 border-2 bg-white-600 hover:bg-gray-500 hover:dark:bg-gray-200 hover:dark:text-black hover:text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2er">
        저장
      </button>
    </div>
  )
}
