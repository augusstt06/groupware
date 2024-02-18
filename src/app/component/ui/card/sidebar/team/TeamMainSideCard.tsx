import { FaPlus } from 'react-icons/fa'

import Button from '../../../button/Button'
import NameCard from '../../main/NameCard'

import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { createTeamModalReducer } from '@/app/store/reducers/team/teamModalReducer'

export default function TeamMainSideCard() {
  const dispatch = useAppDispatch()
  const handleClickCreateTeam = () => {
    dispatch(createTeamModalReducer(true))
  }
  const buttonContent = (
    <>
      <FaPlus className="mr-2" />
      <span className="text-sm">새 팀</span>
    </>
  )
  return (
    <aside className="bg-white dark:bg-opacity-10 bg-opacity-60 p-3 rounded-2xl shadow-2xl">
      <NameCard />
      <Button
        buttonContent={buttonContent}
        className="w-full mb-5 transition ease-in-out duration-300 rounded-lg shadow bg-indigo-400 dark:bg-indigo-400 hover:bg-indigo-600 hover:dark:bg-indigo-500 justify-center text-white dark:text-white focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center"
        onClick={handleClickCreateTeam}
      />
    </aside>
  )
}
