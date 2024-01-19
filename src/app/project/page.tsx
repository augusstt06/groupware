'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import ProjectMainHub from '../component/page/project/hub/ProjectMainHub'
import CreateProjectModal from '../component/ui/modal/project/CreateProjectModal'
import {
  API_SUCCESS_CODE,
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_X_ORGANIZATION_CODE,
} from '../constant/constant'
import { API_URL_PROJECTS_LIST } from '../constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '../module/hooks/reduxHooks'
import { moduleCheckUserState } from '../module/utils/moduleCheckUserState'
import { moduleGetCookie } from '../module/utils/moduleCookie'
import { moduleGetFetch } from '../module/utils/moduleFetch'
import { createProjectModalReducer } from '../store/reducers/project/projectModalReducer'
import {
  type FailResponseType,
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
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])

  const [projectList, setProjectList] = useState<ProjectResponseType[]>([])

  const isCreateProjectModalOpen = useAppSelector(
    (state) => state.projectModal.isCreateProjectModalOpen,
  )

  // FIXME: teamID를 얻어올 곳이 없음
  const fetchGetProjectList = async () => {
    const fetchProps: ModuleGetFetchProps = {
      params: {
        limit: 10,
        offset: 0,
        teamId: 1,
      },
      fetchUrl: API_URL_PROJECTS_LIST,
      header: {
        Authorization: `Bearer ${accessToken}`,
        [KEY_X_ORGANIZATION_CODE]: orgCode,
      },
    }
    // FIXME: 리덕스의 state.projectMainCategory 필터링하기 (중요/참여중)
    const res = await moduleGetFetch<ProjectListResponseType>(fetchProps)
    if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
    const resList = (res as SuccessResponseType<ProjectListResponseType>).result.data
    setProjectList(resList)
  }

  useEffect(() => {
    if (createProjectModalState) dispatch(createProjectModalReducer())
    void fetchGetProjectList()
    const moduleProps: ModuleCheckUserStateProps = {
      useRouter: router,
      token: accessToken,
      setToken: setAccessToken,
      completeState: loginCompleteState,
      isCheckInterval: true,
    }
    moduleCheckUserState(moduleProps)
  }, [])
  return (
    <main className="w-full 2xl:w-2/3 h-4/5 flex flex-col items-center">
      <ProjectMainHub projectList={projectList} />
      {isCreateProjectModalOpen ? <CreateProjectModal /> : <></>}
    </main>
  )
}
