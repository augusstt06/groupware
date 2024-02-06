'use client'

import { useEffect, useRef, useState } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'

import ProjectDetailHub from '@/app/component/page/project/hub/detail/ProjectDetailHub'
import ModalHub from '@/app/component/ui/modal/Modal'
import CreateProjectIssueModal from '@/app/component/ui/modal/project/CreateProjectIssueModal'
import InviteProjectMemberModal from '@/app/component/ui/modal/project/InviteProjectMemberModal'
import ProjectDetailTab from '@/app/component/ui/tab/project/ProjectDetailTab'
import {
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_X_ORGANIZATION_CODE,
  MODAL_BTN_SAVE,
  MODAL_CREATE_PROJECT_ISSUE,
  MODAL_INVITE_MEMBER_IN_PROJECT,
  PROJECT_ISSUE_ALL_VALUE,
  PROJECT_ISSUE_SCHEDULE_VALUE,
  PROJECT_ISSUE_TASK_VALUE,
  PROJECT_ISSUE_TODO_VALUE,
  PROJECT_SIDEBAR_TASK_ALL,
  PROJECT_SIDEBAR_TASK_MY,
} from '@/app/constant/constant'
import {
  API_URL_COLLEAGUES,
  API_URL_PROJECT_ISSUE,
  API_URL_PROJECT_ISSUE_LIST,
  API_URL_PROJECT_ISSUE_LIST_PINNED,
  API_URL_PROJECTS,
} from '@/app/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/app/module/utils/check/moduleCheckUserState'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch, modulePostFetch } from '@/app/module/utils/moduleFetch'
import { changeIssueProjectIdReducer } from '@/app/store/reducers/project/projectIssueReducer'
import {
  createProjectIssueModalOpenReducer,
  projectInviteModalReducer,
} from '@/app/store/reducers/project/projectModalReducer'
import {
  type DialogBtnValueType,
  type ModulePostFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import {
  type ColleagueType,
  type DialogTextType,
  type ProjectCreateIssueResponseType,
  type ProjectIssueResponseType,
  type ProjectIssueType,
  type ProjectResponseType,
} from '@/app/types/variableTypes'

export default function ProjectDetail() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const query = useParams()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const handleDialogClose = () => {
    dialogRef.current?.close()
  }
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const myState = useAppSelector((state) => state.userInfo.extraInfo)
  const issueState = useAppSelector((state) => state.projectIssue)
  const taskCategory = useAppSelector((state) => state.projectDetailCategory.task)

  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const orgId = useAppSelector((state) => state.userInfo.extraInfo.organizationId)
  const myUserId = useAppSelector((state) => state.userInfo.extraInfo.userId)
  const [projectDialogBtnValue] = useState<DialogBtnValueType>({
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
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const [keyForProjectDetailHub, setKeyForProjectDetailHub] = useState(0)
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
  const convertDate = (date: string) => {
    return new Date(`${date}T00:00:00Z`).toISOString()
  }
  const convertDateWithTIme = (date: string, hour: string, minute: string) => {
    return new Date(`${date}T${hour}:${minute}:00Z`).toISOString()
  }

  const fetchPropsByCategory = () => {
    let fetchProps: ModulePostFetchProps
    switch (issueState.category) {
      case PROJECT_ISSUE_TASK_VALUE.toUpperCase():
        fetchProps = {
          data: {
            category: issueState.category,
            description: issueState.description,
            endAt: convertDate(issueState.endAt),
            processState: issueState.processState,
            projectId: issueState.projectId,
            startAt: convertDate(issueState.startAt),
            title: issueState.title,
          },
          fetchUrl: API_URL_PROJECT_ISSUE,
          header: {
            Authorization: `Bearer ${accessToken}`,
            [KEY_X_ORGANIZATION_CODE]: orgCode,
          },
        }
        return fetchProps
      case PROJECT_ISSUE_SCHEDULE_VALUE.toUpperCase():
        fetchProps = {
          data: {
            category: issueState.category,
            description: issueState.description,
            endAt: convertDateWithTIme(
              issueState.endAt,
              issueState.endAtTime.hour,
              issueState.endAtTime.minute,
            ),
            projectId: issueState.projectId,
            startAt: convertDateWithTIme(
              issueState.startAt,
              issueState.startAtTime.hour,
              issueState.startAtTime.minute,
            ),
            title: issueState.title,
          },
          fetchUrl: API_URL_PROJECT_ISSUE,
          header: {
            Authorization: `Bearer ${accessToken}`,
            [KEY_X_ORGANIZATION_CODE]: orgCode,
          },
        }
        return fetchProps

      case PROJECT_ISSUE_TODO_VALUE.toUpperCase():
        fetchProps = {
          data: {
            category: issueState.category,
            description: issueState.description,
            endAt: convertDate(issueState.endAt),
            projectId: issueState.projectId,
            title: issueState.title,
          },
          fetchUrl: API_URL_PROJECT_ISSUE,
          header: {
            Authorization: `Bearer ${accessToken}`,
            [KEY_X_ORGANIZATION_CODE]: orgCode,
          },
        }
        return fetchProps
      default:
        fetchProps = {
          data: {
            category: issueState.category,
            description: issueState.description,
            endAt: convertDate(issueState.endAt),
            processState: issueState.processState,
            projectId: issueState.projectId,
            startAt: convertDate(issueState.startAt),
            title: issueState.title,
          },
          fetchUrl: API_URL_PROJECT_ISSUE,
          header: {
            Authorization: `Bearer ${accessToken}`,
            [KEY_X_ORGANIZATION_CODE]: orgCode,
          },
        }
        return fetchProps
    }
  }

  const { mutate: postIssue } = useMutation({
    mutationKey: ['post-issue'],
    mutationFn: async () => {
      const fetchProps = fetchPropsByCategory()
      await modulePostFetch<ProjectCreateIssueResponseType>(fetchProps)
    },
    onSuccess: async () => {
      await refetch()
      setDialogText({
        main: '성공적으로 이슈를 생성했습니다.',
        sub: '',
      })
      dialogRef.current?.showModal()
      dispatch(createProjectIssueModalOpenReducer(false))
    },
    onError: () => {
      setDialogText({
        main: '이슈를 생성하는데 실패했습니다.',
        sub: '다시 시도해 주세요.',
      })
      dialogRef.current?.showModal()
    },
  })

  const isIssueInputEmpty = () => {
    const { category, endAt, processState, projectId, startAt, title } = issueState

    switch (issueState.category) {
      case PROJECT_ISSUE_TASK_VALUE.toUpperCase():
        return (
          category === '' ||
          endAt === '' ||
          processState === '' ||
          projectId === 0 ||
          startAt === '' ||
          title === ''
        )
      case PROJECT_ISSUE_SCHEDULE_VALUE.toUpperCase():
        return category === '' || endAt === '' || projectId === 0 || startAt === '' || title === ''
      case PROJECT_ISSUE_TODO_VALUE.toUpperCase():
        return category === '' || endAt === '' || projectId === 0 || title === ''
      default:
        return (
          category === '' ||
          endAt === '' ||
          processState === '' ||
          projectId === 0 ||
          startAt === '' ||
          title === ''
        )
    }
  }

  const handleClickPostIssue = () => {
    if (isIssueInputEmpty()) {
      setDialogText({
        main: '필수 항목을 입력하지 않았습니다.',
        sub: '',
      })
      dialogRef.current?.showModal()
      return
    }

    postIssue()
  }
  const { data: projectDetail } = useQuery({
    queryKey: ['project-detail', 'post-issue'],
    queryFn: async () => {
      const res = await moduleGetFetch<ProjectResponseType>({
        params: {
          projectId: Number(query.id),
        },
        fetchUrl: API_URL_PROJECTS,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
      return res as SuccessResponseType<ProjectResponseType>
    },
  })

  const defineProjectDetail = () => {
    if (projectDetail !== undefined) {
      return projectDetail.result
    }
    return null
  }
  const { data: issueList, refetch } = useQuery({
    queryKey: ['issue-list'],
    queryFn: async () => {
      if (projectDetail !== undefined) {
        const res = await moduleGetFetch<ProjectIssueResponseType>({
          params: {
            projectId: Number(defineProjectDetail()?.id),
            limit: 10,
            offset: 0,
            category: PROJECT_ISSUE_ALL_VALUE.toUpperCase(),
          },
          fetchUrl: API_URL_PROJECT_ISSUE_LIST,
          header: {
            Authorization: `Bearer ${accessToken}`,
            [KEY_X_ORGANIZATION_CODE]: orgCode,
          },
        })
        return res as SuccessResponseType<ProjectIssueResponseType>
      }
    },
  })

  const defineIssueList = () => {
    if (issueList !== undefined) return issueList.result.data
    return null
  }

  const { data: issuePinnedList } = useQuery({
    queryKey: ['issue-pinned', 'post-issue'],
    queryFn: async () => {
      if (defineProjectDetail() !== null) {
        const res = await moduleGetFetch<ProjectIssueType[]>({
          params: {
            projectId: Number(defineProjectDetail()?.id),
          },
          fetchUrl: API_URL_PROJECT_ISSUE_LIST_PINNED,
          header: {
            Authorization: `Bearer ${accessToken}`,
            [KEY_X_ORGANIZATION_CODE]: orgCode,
          },
        })
        return res as SuccessResponseType<ProjectIssueType[]>
      }
    },
  })
  const definePinnedList = () => {
    if (issuePinnedList !== undefined) return issuePinnedList.result
    return null
  }

  const filterIssueList = () => {
    switch (taskCategory) {
      case PROJECT_SIDEBAR_TASK_ALL:
        return issueList
      case PROJECT_SIDEBAR_TASK_MY:
        return defineIssueList()?.filter((data) => data.issuer.name === myState.name)
      default:
        return issueList
    }
  }

  const { data: colleague } = useQuery({
    queryKey: ['colleague'],
    queryFn: async () => {
      const res = await moduleGetFetch<ColleagueType[]>({
        params: {
          limit: 10,
          offset: 0,
          organizationId: orgId,
        },
        fetchUrl: API_URL_COLLEAGUES,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
      const arr = (res as SuccessResponseType<ColleagueType[]>).result
      return arr.filter((data) => data.userId !== myUserId)
    },
  })
  const defineColleague = () => {
    if (colleague !== undefined) return colleague
    return []
  }

  const modalList = [
    {
      onClose: handleCloseCreateIssueModal,
      isModalOpen: isCreateProjectIssueModalOpen,
      childComponent: <CreateProjectIssueModal />,
      name: MODAL_CREATE_PROJECT_ISSUE,
      btnValue: MODAL_BTN_SAVE,
      confirmFunc: handleClickPostIssue,
      dialog: dialogRef,
      dialogAlertText: dialogText,
      dialogBtnValue: projectDialogBtnValue,
    },
    {
      onClose: handleCloseInviteModal,
      isModalOpen: isInviteModalOpen,
      childComponent: <InviteProjectMemberModal colleague={defineColleague()} />,
      name: MODAL_INVITE_MEMBER_IN_PROJECT,
      btnValue: MODAL_BTN_SAVE,
      confirmFunc: () => {},
      dialog: dialogRef,
      dialogAlertText: dialogText,
      dialogBtnValue: projectDialogBtnValue,
    },
  ]
  useEffect(() => {
    dispatch(changeIssueProjectIdReducer(Number(query.id)))
    setKeyForProjectDetailHub((prevKey) => prevKey + 1)
    filterIssueList()
  }, [taskCategory])

  useEffect(() => {
    if (projectDetail !== undefined) void refetch()
  }, [projectDetail])

  useEffect(() => {
    moduleCheckUserState({ loginCompleteState, router, accessToken, setAccessToken })
  }, [accessToken])
  return (
    <main className="w-10/12 max-w-7xl 2xl:w-2/3 h-4/5 flex flex-col items-center ">
      {defineProjectDetail() !== null ? (
        <>
          <ProjectDetailTab projectInfo={defineProjectDetail()} colleague={defineColleague()} />
          <ProjectDetailHub
            key={keyForProjectDetailHub}
            projectInfo={defineProjectDetail()}
            issueList={defineIssueList()}
            pinnedList={definePinnedList()}
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
