import { useAppDispatch } from '@/module/hooks/reduxHooks'
import { handleSettingModalReducer } from '@/store/reducers/setting/settingModalReducer'

/**
 * 마이 페이지 모달
 *
 */
export default function SettingModal() {
  const dispatch = useAppDispatch()
  const handleCloseModal = () => {
    dispatch(handleSettingModalReducer())
  }
  return (
    <>
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-blur-xs z-50"
      >
        <div className="relative p-4 w-5/6">
          <button onClick={handleCloseModal}>ss</button>
        </div>
      </div>
    </>
  )
}
