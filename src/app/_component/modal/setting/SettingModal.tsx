import Button from '@/_component/button/Button'
import { useAppDispatch } from '@/module/hooks/reduxHooks'
import { handleSettingModalReducer } from '@/store/reducers/setting/settingModalReducer'

/**
 * 마이 페이지 모달
 * 1. 조직 / 프로젝트 이름 변경
 * 2. 비밀번호 변경
 * 3. 이름 변경
 */
export default function SettingModal() {
  const dispatch = useAppDispatch()
  const handleCloseModal = () => {
    dispatch(handleSettingModalReducer())
  }
  const settingList = [
    { name: '비밀번호 변경' },
    { name: '조직 변경' },
    { name: '프로젝트 변경' },
    { name: '닉네임 변경' },
  ]
  return (
    <>
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="modal-base"
      >
        <div className="justify-center w-4/6 p-4 space-y-5 bg-white border-2 border-indigo-300 border-solid rounded-lg shadow Prelative sort-vertical-flex dark:bg-gray-700 ">
          <section className="justify-center text-xl sort-row-flex">
            <h1>My Page</h1>
          </section>
          <section className="grid w-4/5 grid-cols-2 space-y-5 place-items-center">
            {settingList.map((data) => (
              <div
                key={data.name}
                className="justify-center w-40 p-2 pl-4 pr-4 text-white bg-indigo-300 rounded-lg cursor-pointer smooth-transition hover:bg-indigo-500 sort-row-flex"
              >
                {data.name}
              </div>
            ))}
          </section>

          <Button
            buttonContent={'닫기'}
            onClick={handleCloseModal}
            className="p-2 pl-3 pr-3 text-white bg-red-300 rounded-lg smooth-transition hover:bg-red-500"
          />
        </div>
      </div>
    </>
  )
}
