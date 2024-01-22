'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import ProjectDetailHub from '@/app/component/page/project/hub/ProjectDetailHub'
import ModalHub from '@/app/component/ui/modal/Modal'
import CreateProjectIssueModal from '@/app/component/ui/modal/project/CreateProjectIssueModal'
import InviteProjectMemberModal from '@/app/component/ui/modal/project/InviteProjectMemberModal'
import ProjectDetailTab from '@/app/component/ui/tab/project/ProjectDetailTab'
import {
  API_SUCCESS_CODE,
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_X_ORGANIZATION_CODE,
  MODAL_BTN_SAVE,
  MODAL_CREATE_PROJECT_ISSUE,
  MODAL_INVITE_MEMBER_IN_PROJECT,
} from '@/app/constant/constant'
import {
  API_URL_PROJECT_ISSUE_LIST,
  API_URL_PROJECT_ISSUE_LIST_PINNED,
  API_URL_PROJECTS,
} from '@/app/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/app/module/utils/moduleCheckUserState'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import { changeIssueProjectIdReducer } from '@/app/store/reducers/project/projectIssueReducer'
import {
  createProjectIssueModalOpenReducer,
  projectInviteModalReducer,
} from '@/app/store/reducers/project/projectModalReducer'
import {
  type FailResponseType,
  type ModuleCheckUserStateProps,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import {
  type ProjectIssueResponseType,
  type ProjectIssueType,
  type ProjectResponseType,
} from '@/app/types/variableTypes'

export default function ProjectDetail() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const query = useParams()
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const [rerender, setRerender] = useState<boolean>(false)
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const [projectInfo, setProjectinfo] = useState<ProjectResponseType | null>(null)
  const [issueList, setIssueList] = useState<ProjectIssueType[] | null>(null)
  const [pinnedList, setPinnedList] = useState<ProjectIssueType[] | null>(null)
  const isCreateProjectIssueModalOpen = useAppSelector(
    (state) => state.projectModal.isCreateProjectIssueModalOpen,
  )
  const isInviteModalOpen = useAppSelector((state) => state.projectModal.isProjectInviteModalOpen)

  const handleCloseInviteModal = () => {
    dispatch(projectInviteModalReducer(false))
  }
  const handleCloseCreateIssueModal = () => {
    dispatch(createProjectIssueModalOpenReducer(false))
  }
  const fetchGetProjectDetail = async () => {
    try {
      const fetchProps: ModuleGetFetchProps = {
        params: {
          projectId: Number(query.id),
        },
        fetchUrl: API_URL_PROJECTS,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }

      const res = await moduleGetFetch<ProjectResponseType>(fetchProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      const projectDetail = (res as SuccessResponseType<ProjectResponseType>).result
      setProjectinfo(projectDetail)
      setRerender(!rerender)
    } catch (err) {
      setProjectinfo({
        color: '',
        createdAt: '',
        id: 0,
        issues: [],
        name: '프로젝트를 불러오는데 실패했습니다.',
        ownerId: 0,
        teamId: 0,
        updatedAt: '',
        membersCnt: 0,
        members: [],
      })
    }
  }
  const modalList = [
    {
      onClose: handleCloseCreateIssueModal,
      isModalOpen: isCreateProjectIssueModalOpen,
      childComponent: <CreateProjectIssueModal />,
      name: MODAL_CREATE_PROJECT_ISSUE,
      btnValue: MODAL_BTN_SAVE,
      confirmFunc: () => {},
    },
    {
      onClose: handleCloseInviteModal,
      isModalOpen: isInviteModalOpen,
      childComponent: <InviteProjectMemberModal />,
      name: MODAL_INVITE_MEMBER_IN_PROJECT,
      btnValue: MODAL_BTN_SAVE,
      confirmFunc: () => {},
    },
  ]
  const fetchGetIssueList = async () => {
    const fetchProps: ModuleGetFetchProps = {
      params: {
        projectId: Number(projectInfo?.id),
        limit: 10,
        offset: 0,
      },
      fetchUrl: API_URL_PROJECT_ISSUE_LIST,
      header: {
        Authorization: `Bearer ${accessToken}`,
        [KEY_X_ORGANIZATION_CODE]: orgCode,
      },
    }
    const res = await moduleGetFetch<ProjectIssueResponseType>(fetchProps)
    const issues = (res as SuccessResponseType<ProjectIssueResponseType>).result.data
    setIssueList(issues)
  }
  const fetchGetIssuePinnedList = async () => {
    const fetchProps: ModuleGetFetchProps = {
      params: {
        projectId: Number(projectInfo?.id),
      },
      fetchUrl: API_URL_PROJECT_ISSUE_LIST_PINNED,
      header: {
        Authorization: `Bearer ${accessToken}`,
        [KEY_X_ORGANIZATION_CODE]: orgCode,
      },
    }
    const res = await moduleGetFetch<ProjectIssueType[]>(fetchProps)
    const pinned = (res as SuccessResponseType<ProjectIssueType[]>).result
    setPinnedList(pinned)
  }

  useEffect(() => {
    dispatch(changeIssueProjectIdReducer(Number(query.id)))
    if (projectInfo === null) {
      void fetchGetProjectDetail()
    }
    if (projectInfo !== null) {
      void fetchGetIssueList()
      void fetchGetIssuePinnedList()
    }
    const moduleProps: ModuleCheckUserStateProps = {
      useRouter: router,
      token: accessToken,
      setToken: setAccessToken,
      completeState: loginCompleteState,
      isCheckInterval: true,
    }
    moduleCheckUserState(moduleProps)
  }, [rerender])

  return (
    <main className="w-full 2xl:w-2/3 h-4/5 flex flex-col items-center">
      {projectInfo !== null ? (
        <>
          <ProjectDetailTab projectInfo={projectInfo} />
          <ProjectDetailHub
            projectInfo={projectInfo}
            issueList={issueList}
            pinnedList={pinnedList}
          />
        </>
      ) : (
        <div className="p-5">
          <span className="font-bold">프로젝트를 불러오는데 실패했습니다.</span>
        </div>
      )}

      <ModalHub modals={modalList} />
    </main>
  )
}
