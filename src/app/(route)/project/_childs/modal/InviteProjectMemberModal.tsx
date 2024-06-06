import { FaSearch } from 'react-icons/fa'

import ProjectInviteList from './invite/ProjectInviteList'

import ProjectInviteCard from '@/components/card/project/ProjectInviteCard'
import InputWithLabel from '@/components/input/InputWithLabel'
import useInput from '@/module/hooks/reactHooks/useInput'
import { type InviteProjectMemberModalProps } from '@/types/ui/modal'
import { type ColleagueType } from '@/types/variable'

export default function InviteProjectMemberModal(props: InviteProjectMemberModalProps) {
  const { colleague, inviteList, setInviteList } = props

  const handleInviteUser = (user: ColleagueType) => {
    if (!inviteList.some((data) => data.userId === user.userId)) {
      setInviteList((prev) => [...prev, user])
    } else {
      setInviteList(inviteList.filter((data) => data.userId !== user.userId))
    }
  }
  const inviteInput = useInput('')
  const tailLabel = (
    <div className="flex items-center justify-center w-1/6 cursor-pointer smooth-transition hover:scale-110">
      <FaSearch className="w-4 h-4" />
    </div>
  )
  return (
    <>
      <div className="p-4 mt-2 ">
        <span className="font-bold">초대하기</span>
      </div>
      <div className="flex flex-row justify-center h-full">
        <div className="w-1/2 sort-vertical-center">
          <div className="justify-center mt-4 truncate border-2 border-gray-300 rounded-lg w-60 sort-row-flex">
            <InputWithLabel
              title=""
              isHeadLabel={false}
              type="text"
              useInput={inviteInput}
              isTailLabel={true}
              tailLabelContent={tailLabel}
              placeholder="검색어를 입력해주세요."
              className="w-5/6 p-1 ml-3 text-xs focus:outline-none md:text-sm lg-text-base bg-[#f5f7fc] dark:bg-[#2e2e2e]"
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
        <div className="w-1/2">
          <ProjectInviteList inviteList={inviteList} handleInviteUser={handleInviteUser} />
        </div>
      </div>
    </>
  )
}
