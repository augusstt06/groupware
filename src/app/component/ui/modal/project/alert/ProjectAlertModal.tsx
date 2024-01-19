import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import {
  createProjectModalReducer,
  projectAlertModalReducer,
} from '@/app/store/reducers/project/projectModalReducer'
import { type ProjectAlertModalProps } from '@/app/types/ui/modalTypes'

export default function ProjectAlertModal(props: ProjectAlertModalProps) {
  const dispatch = useAppDispatch()
  const handleClickConfirm = () => {
    dispatch(projectAlertModalReducer(false))
    if (props.alertState.isCreateModalClose) {
      dispatch(createProjectModalReducer())
      props.setRerender(!props.rerender)
    }
  }

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-blur-xs"
    >
      <div className="relative rounded-lg shadow dark:bg-gray-700 border-solid border-2 border-indigo-300 bg-white p-5 w-4/6 md:w-3/6 xl:w-2/5 2xl:w-2/12">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-around p-2">
            <span className="font-bold mb-2">{props.alertState.mainDescription}</span>
            <span className="text-sm">{props.alertState.subDescription}</span>
          </div>
          <button
            className="transition ease-in-out duration-300 border-gray-400 border-2 bg-white-600 hover:bg-gray-500 hover:dark:bg-gray-200 hover:dark:text-black hover:text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2er"
            onClick={handleClickConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
