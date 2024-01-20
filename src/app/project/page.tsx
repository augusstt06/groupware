'use client'

import { useEffect, useState } from 'react'

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
  PROJECT_MAIN_CATEGORY_ALL,
  PROJECT_MAIN_CATEGORY_INCLUDED,
  PROJECT_MAIN_CATEGORY_STARRED,
} from '../constant/constant'
import {
  API_URL_PROJECTS_LIST,
  API_URL_PROJECTS_LIST_INCLUDED,
  API_URL_PROJECTS_LIST_STARRED,
} from '../constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '../module/hooks/reduxHooks'
import { moduleCheckUserState } from '../module/utils/moduleCheckUserState'
import { moduleGetCookie } from '../module/utils/moduleCookie'
import { moduleGetFetch } from '../module/utils/moduleFetch'
import { createProjectModalReducer } from '../store/reducers/project/projectModalReducer'
import {
  type ModuleCheckUserStateProps,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '../types/moduleTypes'
import { type ProjectListResponseType, type ProjectResponseType } from '../types/variableTypes'

export default function Project() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const createProjectModalState = useAppSelector(
    (state) => state.projectModal.isCreateProjectModalOpen,
  )
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const [rerender, setRerender] = useState(false)
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const projectCategory = useAppSelector((state) => state.projectMainCategory.selectProjectMenu)

  const [projectList, setProjectList] = useState<ProjectResponseType[]>([])

  const isCreateProjectModalOpen = useAppSelector(
    (state) => state.projectModal.isCreateProjectModalOpen,
  )
  const handleCloseCreateProjectModal = () => {
    dispatch(createProjectModalReducer(false))
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
      childComponent: <CreateProjectModal rerender={rerender} setRerender={setRerender} />,
      name: MODAL_CRAETE_PROJECT,
      btnValue: MODAL_BTN_CREATE,
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
        <ProjectMainHub projectList={projectList} />
      )}

      {/* {isCreateProjectModalOpen ? (
        <CreateProjectModal rerender={rerender} setRerender={setRerender} />
      ) : (
        <></>
      )} */}
      <ModalHub modals={modalList} />
    </main>
  )
}
