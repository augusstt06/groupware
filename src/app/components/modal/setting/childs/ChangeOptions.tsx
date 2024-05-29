import { useState } from 'react'

import { CiImageOff } from 'react-icons/ci'
import { IoClose } from 'react-icons/io5'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { PiProjectorScreenChartFill } from 'react-icons/pi'
import { RiLockPasswordFill, RiOrganizationChart, RiTeamFill } from 'react-icons/ri'

import Button from '@/components/button/Button'
import Input from '@/components/input/Input'
import { ORG, PJT, PWD, TEAM } from '@/constant/constant'
import { useAppSelector } from '@/module/hooks/reduxHooks'

type Props = {
  handleChangeSetting: (setting: string) => void
}
const ChangeOptions = (props: Props) => {
  const { handleChangeSetting } = props
  const user = useAppSelector((state) => state.userInfo)
  const settingList = [
    {
      icon: <RiLockPasswordFill className="w-10 h-10" />,
      name: '비밀번호 변경',
      handleChange: () => {
        handleChangeSetting(PWD)
      },
    },
    {
      icon: <RiOrganizationChart className="w-10 h-10" />,
      name: '조직 변경',
      handleChange: () => {
        handleChangeSetting(ORG)
      },
    },
    {
      icon: <PiProjectorScreenChartFill className="w-10 h-10" />,
      name: '프로젝트 변경',
      handleChange: () => {
        handleChangeSetting(PJT)
      },
    },
    {
      icon: <RiTeamFill className="w-10 h-10" />,
      name: '팀 변경',
      handleChange: () => {
        handleChangeSetting(TEAM)
      },
    },
  ]
  const [isChangeName, setIsChangeName] = useState<boolean>(false)
  const handleChangeName = () => {
    setIsChangeName(!isChangeName)
  }
  return (
    <>
      <section className="justify-center text-xl sort-row-flex">
        <h1>My Page</h1>
      </section>
      <section className="justify-center w-2/3 gap-1 p-1 sort-vertical-flex">
        <div className="justify-center gap-5 p-1 sort-row-flex">
          <CiImageOff className="w-24 h-24" />
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-end gap-3 text-3xl font-bold">
              <h1>{user.extraInfo.name}</h1>{' '}
              {isChangeName ? (
                <IoClose
                  className="w-6 h-6 cursor-pointer hover:text-indigo-300 smooth-transition"
                  onClick={handleChangeName}
                />
              ) : (
                <MdDriveFileRenameOutline
                  className="w-6 h-6 cursor-pointer hover:text-indigo-300 smooth-transition"
                  onClick={handleChangeName}
                />
              )}
            </div>
            {isChangeName ? (
              <div className="sort-row-flex gap-3">
                <Input
                  placeholder="새 이름을 입력해주세요"
                  className="text-sm text-gray-900 py-1 px-1 bg-white rounded-lg h-8"
                  isLabel={false}
                />
                <Button
                  buttonContent={'변경'}
                  className="p-2 pl-3 pr-3 text-white bg-indigo-300 rounded-lg smooth-transition hover:bg-indigo-500 text-sm h-8"
                />
              </div>
            ) : (
              <></>
            )}
            <span className="text-lg">
              {user.extraInfo.position} ({user.extraInfo.email})
            </span>
          </div>
        </div>
        {/* <button className="justify-center px-3 py-2 text-white bg-indigo-300 cursor-pointer rounded-xl sort-row-flex hover:bg-indigo-500 smooth-transition">
          내 정보
        </button> */}
      </section>

      <section className="grid w-4/5 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {settingList.map((data) => (
          <div
            key={data.name}
            className="justify-center w-40 gap-3 p-3 border-2 border-indigo-300 rounded-lg cursor-pointer hover:bg-indigo-400 hover:text-white sort-vertical-flex dark:hover:bg-indigo-500 smooth-transition"
            onClick={data.handleChange}
          >
            {data.icon}
            <span>{data.name}</span>
          </div>
        ))}
      </section>
    </>
  )
}
export default ChangeOptions
