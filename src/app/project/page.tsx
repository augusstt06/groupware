'use client'

import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import ProjectMainHub from '../component/page/project/hub/ProjectMainHub'
import ModalHub from '../component/ui/modal/Modal'
import CreateProjectModal from '../component/ui/modal/project/CreateProjectModal'
import {
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_X_ORGANIZATION_CODE,
  MODAL_BTN_CREATE,
  MODAL_CRAETE_PROJECT,
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
  PROJECT_MAIN_CATEGORY_ALL,
  PROJECT_MAIN_CATEGORY_INCLUDED,
  PROJECT_MAIN_CATEGORY_STARRED,
} from '../constant/constant'
import {
  API_URL_PROJECTS,
  API_URL_PROJECTS_LIST,
  API_URL_PROJECTS_LIST_INCLUDED,
  API_URL_PROJECTS_LIST_STARRED,
} from '../constant/route/api-route-constant'
import useInput from '../module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '../module/hooks/reduxHooks'
import { moduleCheckUserState } from '../module/utils/moduleCheckUserState'
import { moduleGetCookie } from '../module/utils/moduleCookie'
import { moduleGetFetch, modulePostFetch } from '../module/utils/moduleFetch'
import { createProjectModalReducer } from '../store/reducers/project/projectModalReducer'
import {
  type DialogBtnValueType,
  type ModuleCheckUserStateProps,
  type ModuleGetFetchProps,
  type ModulePostFetchProps,
  type SuccessResponseType,
} from '../types/moduleTypes'
import {
  type DialogTextType,
  type FetchPostProjectResponseType,
  type ProjectListResponseType,
  type ProjectResponseType,
} from '../types/variableTypes'

export default function Project() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const handleDialogClose = () => {
    dialogRef.current?.close()
  }
  const createProjectModalState = useAppSelector(
    (state) => state.projectModal.isCreateProjectModalOpen,
  )
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const [rerender, setRerender] = useState(false)
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const projectCategory = useAppSelector((state) => state.projectMainCategory.selectProjectMenu)
  const [projectList, setProjectList] = useState<ProjectResponseType[]>([])
  const [projectDialogBtnValue, setProjectDialogBtnValue] = useState<DialogBtnValueType>({
    isCancel: false,
    cancleFunc: () => {},
    cancelText: '',
    confirmFunc: handleDialogClose,
    confirmText: '확인',
  })
  const [dialogText, setDialogText] = useState<DialogTextType>({
    main: '',
    sub: '',
  })

  const isCreateProjectModalOpen = useAppSelector(
    (state) => state.projectModal.isCreateProjectModalOpen,
  )

  const projectName = useInput('')
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
    await modulePostFetch<FetchPostProjectResponseType>(fetchProps)

    setDialogText({
      main: '프로젝트가 성공적으로 생성되었습니다.',
      sub: '생성된 프로젝트에서 멤버초대를 진행해주세요.',
    })
    setProjectDialogBtnValue({
      isCancel: false,
      cancleFunc: () => {},
      cancelText: '',
      confirmFunc: handleDialogClose,
      confirmText: '확인',
    })
    dialogRef.current?.showModal()
  }

  const handleCloseCreateProjectModal = () => {
    projectName.resetValue()
    setSelectColor('')
    dispatch(createProjectModalReducer(false))
  }

  const handleClickCreateProject = () => {
    if (projectName.value === '') {
      setDialogText({
        main: '프로젝트 이름을 입력해 주세요.',
        sub: '',
      })
      dialogRef.current?.showModal()
      return
    }
    if (selectColor === '') {
      setDialogText({
        main: '색상을 선택해주세요.',
        sub: '',
      })
      dialogRef.current?.showModal()
      return
    }

    void fetchPostProject()
    handleCloseCreateProjectModal()
    setRerender(!rerender)
    projectName.resetValue()
    setSelectColor('')
  }

  const isProjectListEmpty = () => {
    if (projectList.length === 0) return true
    return false
  }
  const decideFetchUrl = () => {
    switch (projectCategory) {
      case PROJECT_MAIN_CATEGORY_ALL:
        return API_URL_PROJECTS_LIST
      case PROJECT_MAIN_CATEGORY_INCLUDED:
        return API_URL_PROJECTS_LIST_INCLUDED
      case PROJECT_MAIN_CATEGORY_STARRED:
        return API_URL_PROJECTS_LIST_STARRED
      default:
        return API_URL_PROJECTS_LIST
    }
  }
  // FIXME: teamID를 얻어올 곳이 없음
  const fetchGetProjectList = async () => {
    const fetchProps: ModuleGetFetchProps = {
      params: {
        limit: 10,
        offset: 0,
        teamId: 1,
      },
      fetchUrl: decideFetchUrl(),
      header: {
        Authorization: `Bearer ${accessToken}`,
        [KEY_X_ORGANIZATION_CODE]: orgCode,
      },
    }
    const res = await moduleGetFetch<ProjectListResponseType>(fetchProps)
    const resList = (res as SuccessResponseType<ProjectListResponseType>).result.data
    setProjectList(resList)
  }

  const modalList = [
    {
      onClose: handleCloseCreateProjectModal,
      isModalOpen: isCreateProjectModalOpen,
      childComponent: (
        <CreateProjectModal
          projectName={projectName}
          colorList={colorList}
          handleSelectColor={handleSelectColor}
          selectColor={selectColor}
        />
      ),
      name: MODAL_CRAETE_PROJECT,
      btnValue: MODAL_BTN_CREATE,
      confirmFunc: handleClickCreateProject,
      dialog: dialogRef,
      dialogAlertText: dialogText,
      dialogBtnValue: projectDialogBtnValue,
    },
  ]
  useEffect(() => {
    if (createProjectModalState) dispatch(createProjectModalReducer(false))
    void fetchGetProjectList()
    const moduleProps: ModuleCheckUserStateProps = {
      useRouter: router,
      token: accessToken,
      setToken: setAccessToken,
      completeState: loginCompleteState,
      isCheckInterval: true,
    }
    moduleCheckUserState(moduleProps)
  }, [rerender, projectCategory])

  return (
    <main className="w-full 2xl:w-2/3 h-4/5 flex flex-col items-center">
      {isProjectListEmpty() ? (
        <div className="p-5">
          <span className="font-bold">프로젝트가 없습니다.</span>
        </div>
      ) : (
        <ProjectMainHub projectList={projectList} rerender={rerender} setRerender={setRerender} />
      )}
      <ModalHub modals={modalList} />
    </main>
  )
}
