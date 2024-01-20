import { useState } from 'react'

import CreateProjectModalConfirmBtn from '../../button/project/modal/CreateProjectModalConfirmBtn'
import {
  CreateProjectModalColorSelect,
  CreateProjectModalInput,
} from '../../input/project/modal/CreateProjectModalInputs'

import ProjectAlertModal from './alert/ProjectAlertModal'

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
import { projectAlertModalReducer } from '@/app/store/reducers/project/projectModalReducer'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type CreateProjectModalProps } from '@/app/types/ui/modalTypes'
import {
  type FetchPostProjectResponseType,
  type ProjectAlertStateType,
} from '@/app/types/variableTypes'

export default function CreateProjectModal(props: CreateProjectModalProps) {
  const dispatch = useAppDispatch()
  const projectName = useInput('')
  const accessToken = moduleCookie.moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const isProjectAlertOpen = useAppSelector((state) => state.projectModal.isProjectAlertModalOpen)
  const [selectColor, setSelectColor] = useState<string>('')
  const [alertState, setAlertState] = useState<ProjectAlertStateType>({
    mainDescription: '',
    subDescription: '',
    isCreateModalClose: false,
  })
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
    await modulePostFetch<FetchPostProjectResponseType>(fetchProps)
    setAlertState({
      mainDescription: '프로젝트가 성공적으로 생성되었습니다.',
      subDescription: '생성된 프로젝트에서 멤버초대를 진행해주세요.',
      isCreateModalClose: true,
    })
    dispatch(projectAlertModalReducer(true))
  }
  const handleClickCreateProject = () => {
    if (projectName.value === '') {
      setAlertState({
        mainDescription: '프로젝트 이름을 작성해주세요.',
        subDescription: '',
        isCreateModalClose: false,
      })
      dispatch(projectAlertModalReducer(true))
      return
    }
    if (selectColor === '') {
      setAlertState({
        mainDescription: '색상을 선택해주세요.',
        subDescription: '',
        isCreateModalClose: false,
      })
      dispatch(projectAlertModalReducer(true))
      return
    }

    void fetchPostProject()
  }
  return (
    <>
      <span className="font-bold">새 프로젝트 만들기</span>
      <CreateProjectModalInput projectName={projectName} />
      <CreateProjectModalColorSelect
        colorList={colorList}
        handleSelectColor={handleSelectColor}
        selectColor={selectColor}
      />
      <CreateProjectModalConfirmBtn handleClickCreateProject={handleClickCreateProject} />
      {/* dialog으로 변경 */}
      {isProjectAlertOpen ? (
        <ProjectAlertModal
          alertState={alertState}
          rerender={props.rerender}
          setRerender={props.setRerender}
        />
      ) : (
        <></>
      )}
    </>
  )
}
