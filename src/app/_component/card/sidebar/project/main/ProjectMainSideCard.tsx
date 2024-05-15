import { FaPlus } from 'react-icons/fa'

import NameCard from '../../../main/NameCard'

import ProjectMenuCard from './ProjectMenuCard'

import Button from '@/_component/button/Button'
import { useAppDispatch } from '@/module/hooks/reduxHooks'
import { createProjectModalReducer } from '@/store/reducers/project/projectModalReducer'

export default function ProjectMainSideCard() {
  const dispatch = useAppDispatch()
  const handleClickCreateProject = () => {
    dispatch(createProjectModalReducer(true))
  }
  const buttonContent = (
    <>
      <FaPlus className="mr-2" />
      <span className="text-sm">새 프로젝트</span>
    </>
  )

  return (
    <aside className="bg-white dark:bg-opacity-10 bg-opacity-60 p-3 rounded-2xl shadow-2xl">
      <NameCard />
      <Button
        buttonContent={buttonContent}
        className="w-full mb-5 transition ease-in-out duration-300 rounded-lg shadow bg-indigo-400 dark:bg-indigo-400 hover:bg-indigo-600 hover:dark:bg-indigo-500 justify-center text-white dark:text-white focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center"
        onClick={handleClickCreateProject}
      />
      <ProjectMenuCard />
    </aside>
  )
}
