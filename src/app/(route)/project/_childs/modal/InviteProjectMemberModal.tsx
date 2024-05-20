import { FaSearch } from 'react-icons/fa'

import ProjectInviteList from './invite/ProjectInviteList'

import ProjectInviteCard from '@/_component/card/project/ProjectInviteCard'
import InputWithLabel from '@/_component/input/InputWithLabel'
import useInput from '@/module/hooks/reactHooks/useInput'
import { type InviteProjectMemberModalProps } from '@/types/ui/modal'
import { type ColleagueType } from '@/types/variable'

export default function InviteProjectMemberModal(props: InviteProjectMemberModalProps) {
  const { colleague, inviteList, setInviteList } = props

  const handleInviteUser = (user: ColleagueType) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!inviteList.some((data) => data.userId === user.userId)) {
      setInviteList((prev) => [...prev, user])
    } else {
      setInviteList(inviteList.filter((data) => data.userId !== user.userId))
    }
  }
  const inviteInput = useInput('')
  const tailLabel = (
    <div className="flex items-center justify-center w-1/6 cursor-pointer duration-500 ease-in-out trasition hover:scale-110">
      <FaSearch className="w-4 h-4" />
    </div>
  )
  return (
    <>
      <div className="p-4 mt-2 border-b-2 border-gray-300">
        <span className="font-bold">초대하기</span>
      </div>
      <div className="flex flex-row justify-between h-full">
        <div className="flex flex-col items-center w-3/5 border-r-2 border-gray-300">
          <div className="flex flex-row items-center justify-center w-5/6 mt-4 truncate border-2 border-gray-300 rounded-full">
            <InputWithLabel
              title=""
              isHeadLabel={false}
              type="text"
              useInput={inviteInput}
              isTailLabel={true}
              tailLabelContent={tailLabel}
              placeholder="검색어를 입력해주세요."
              className="w-5/6 p-1 ml-3 text-xs focus:outline-none md:text-sm lg-text-base"
            />
          </div>
          {colleague?.map((data) => (
            <div
              key={data.userId}
              className="w-full"
              onClick={() => {
                handleInviteUser(data)
              }}
            >
              <ProjectInviteCard userInfo={data} inviteList={inviteList} />
            </div>
          ))}
        </div>
        <div className="w-2/5">
          <ProjectInviteList inviteList={inviteList} />
        </div>
      </div>
    </>
  )
}
