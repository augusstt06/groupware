import { useState } from 'react'

import CreateProjectModalConfirmBtn from '../../button/project/modal/CreateProjectModalConfirmBtn'
import {
  CreateProjectModalColorSelect,
  CreateProjectModalInput,
} from '../../input/project/modal/CreateProjectModalInputs'

import {
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
  PROJECT_CARD_REAL_COLOR_BLUE,
  PROJECT_CARD_REAL_COLOR_GREEN,
  PROJECT_CARD_REAL_COLOR_PINK,
  PROJECT_CARD_REAL_COLOR_PURPLE,
  PROJECT_CARD_REAL_COLOR_RED,
  PROJECT_CARD_REAL_COLOR_YELLOW,
  PROJECT_CARD_RES_COLOR_BLUE,
  PROJECT_CARD_RES_COLOR_GREEN,
  PROJECT_CARD_RES_COLOR_PINK,
  PROJECT_CARD_RES_COLOR_PURPLE,
  PROJECT_CARD_RES_COLOR_RED,
  PROJECT_CARD_RES_COLOR_YELLOW,
} from '@/app/constant/constant'
import { API_URL_PROJECTS } from '@/app/constant/route/api-route-constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import * as moduleCookie from '@/app/module/utils/moduleCookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { createProjectModalReducer } from '@/app/store/reducers/project/projectModalReducer'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'

export default function CreateProjectModal() {
  const dispatch = useAppDispatch()
  const projectName = useInput('')
  const accessToken = moduleCookie.moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const [selectColor, setSelectColor] = useState<string>('')
  const colorList = [
    { name: PROJECT_CARD_RES_COLOR_RED, value: PROJECT_CARD_REAL_COLOR_RED },
    { name: PROJECT_CARD_RES_COLOR_YELLOW, value: PROJECT_CARD_REAL_COLOR_YELLOW },
    { name: PROJECT_CARD_RES_COLOR_GREEN, value: PROJECT_CARD_REAL_COLOR_GREEN },
    { name: PROJECT_CARD_RES_COLOR_BLUE, value: PROJECT_CARD_REAL_COLOR_BLUE },
    { name: PROJECT_CARD_RES_COLOR_PURPLE, value: PROJECT_CARD_REAL_COLOR_PURPLE },
    { name: PROJECT_CARD_RES_COLOR_PINK, value: PROJECT_CARD_REAL_COLOR_PINK },
  ]

  const handleSelectColor = (colorName: string) => {
    setSelectColor(colorName)
  }

  // FIXME: teamID 물어보기
  const fetchPostProject = async () => {
    const fetchProps: ModulePostFetchProps = {
      data: {
        color: selectColor,
        name: projectName.value,
        teamId: 1,
      },
      fetchUrl: API_URL_PROJECTS,
      header: {
        Authorization: `Bearer ${accessToken}`,
        [KEY_X_ORGANIZATION_CODE]: orgCode,
      },
    }
    await modulePostFetch<string>(fetchProps)
    // console.log(res)
  }
  const handleClickCreateProject = () => {
    if (selectColor === '') {
      alert('색상을 선택해주세요.')
      return
    }
    void fetchPostProject()
    dispatch(createProjectModalReducer())
  }

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-blur-xs"
    >
      <div className="relative rounded-lg shadow dark:bg-gray-700 border-solid border-2 border-indigo-300 bg-white p-5 w-5/6 md:w-4/6 xl:w-2/5 2xl:w-3/12">
        <span className="font-bold">새 프로젝트 만들기</span>
        <CreateProjectModalInput projectName={projectName} />
        <CreateProjectModalColorSelect
          colorList={colorList}
          handleSelectColor={handleSelectColor}
          selectColor={selectColor}
        />
        <CreateProjectModalConfirmBtn handleClickCreateProject={handleClickCreateProject} />
      </div>
    </div>
  )
}
