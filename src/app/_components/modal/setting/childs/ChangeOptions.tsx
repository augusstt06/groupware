import { CiImageOff } from 'react-icons/ci'
import { IoIosArrowDown } from 'react-icons/io'

import Button from '@/_components/button/Button'
import { NAME, ORG, PJT, PWD } from '@/_constant/constant'
import { useAppSelector } from '@/_module/hooks/reduxHooks'

type Props = {
  handleChangeSetting: (setting: string) => void
  handleCloseModal: () => void
}
const ChangeOptions = (props: Props) => {
  const { handleChangeSetting, handleCloseModal } = props
  const user = useAppSelector((state) => state.userInfo)
  const settingList = [
    {
      name: '비밀번호 변경',
      handleChange: () => {
        handleChangeSetting(PWD)
      },
    },
    {
      name: '조직 변경',
      handleChange: () => {
        handleChangeSetting(ORG)
      },
    },
    {
      name: '프로젝트 변경',
      handleChange: () => {
        handleChangeSetting(PJT)
      },
    },
    {
      name: '이름 변경',
      handleChange: () => {
        handleChangeSetting(NAME)
      },
    },
  ]
  return (
    <>
      <section className="justify-center text-xl sort-row-flex">
        <h1>My Page</h1>
      </section>
      <section className="w-2/3 gap-5 p-3 sort-row-flex">
        <CiImageOff className="w-20 h-20" />
        <div>
          <h1 className="text-2xl font-bold">{user.extraInfo.name}</h1>
          <span>{user.extraInfo.position}</span>
        </div>
      </section>
      <section className="justify-between w-2/3 p-3 sort-row-flex">
        <h1 className="text-lg">Change Private Info</h1>
        <IoIosArrowDown className="w-10 h-10" />
      </section>
      <section className="grid w-4/5 grid-cols-2 space-y-5 place-items-center">
        {settingList.map((data) => (
          <div
            key={data.name}
            className="justify-center w-40 p-2 pl-4 pr-4 text-white bg-indigo-300 rounded-lg cursor-pointer smooth-transition hover:bg-indigo-500 sort-row-flex"
            onClick={data.handleChange}
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
    </>
  )
}
export default ChangeOptions
