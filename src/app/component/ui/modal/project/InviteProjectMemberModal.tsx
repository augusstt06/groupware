import { FaSearch } from 'react-icons/fa'

import ProjectInviteCard from '../../card/project/ProjectInviteCard'
import InputWithLabel from '../../input/InputWithLabel'

import ProjectInviteList from './invite/ProjectInviteList'

import useInput from '@/app/module/hooks/reactHooks/useInput'

export default function InviteProjectMemberModal() {
  // FIXME: 임시 input 변수
  const inviteInput = useInput('')
  const tailLabel = (
    <div className="cursor-pointer w-1/6 flex items-center justify-center trasition duration-500 ease-in-out hover:scale-110">
      <FaSearch className="w-4 h-4" />
    </div>
  )
  return (
    <>
      <div className="mt-2 p-4 border-b-2 border-gray-300">
        <span className="font-bold">초대하기</span>
      </div>
      <div className="flex flex-row justify-between h-full">
        <div className="flex flex-col items-center w-3/5 border-r-2 border-gray-300">
          <div className="mt-4 flex flex-row items-center justify-center border-2 border-gray-300 rounded-full w-5/6 truncate">
            <InputWithLabel
              title=""
              isHeadLabel={false}
              type="text"
              useInput={inviteInput}
              isTailLabel={true}
              tailLabelContent={tailLabel}
              placeholder="검색어를 입력해주세요."
              className="ml-3 p-1 focus:outline-none w-5/6 text-xs md:text-sm lg-text-base"
            />
          </div>
          <ProjectInviteCard />
        </div>
        <div className="w-2/5">
          <ProjectInviteList />
        </div>
      </div>
    </>
  )
}
