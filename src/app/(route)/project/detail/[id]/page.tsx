'use client'

import { useEffect, useRef, useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import ProjectDetailHub from '../../_childs/hub/detail/ProjectDetailHub'
import InviteProjectMemberModal from '../../_childs/modal/InviteProjectMemberModal'
import CreateProjectIssueModal from '../../_childs/modal/issues/category/CreateProjectIssueModal'

import ModalHub from '@/components/modal/Modal'
import ProjectDetailTab from '@/components/tab/project/ProjectDetailTab'
import {
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
} from '@/constant/constant'
import {
  API_URL_COLLEAGUES,
  API_URL_PROJECT_INVITE,
  API_URL_PROJECT_ISSUE,
  API_URL_PROJECT_ISSUE_LIST,
  API_URL_PROJECT_ISSUE_LIST_PINNED,
  API_URL_PROJECTS,
} from '@/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleGetFetch, modulePostFetch } from '@/module/utils/moduleFetch'
import { createAccessTokenManager } from '@/module/utils/token'
import { changeIssueProjectIdReducer } from '@/store/reducers/project/projectIssueReducer'
import {
  createProjectIssueModalOpenReducer,
  projectInviteModalReducer,
} from '@/store/reducers/project/projectModalReducer'
import {
  type DialogBtnValueType,
  type ModulePostFetchProps,
  type SuccessResponseType,
} from '@/types/module'
import {
  type ColleagueType,
  type DialogTextType,
  type ProjectCreateIssueResponseType,
  type ProjectIssueResponseType,
  type ProjectIssueType,
  type ProjectResponseType,
} from '@/types/variable'

export default function ProjectDetail() {
  const dispatch = useAppDispatch()
  const query = useParams()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const queryClient = useQueryClient()
  const handleDialogClose = () => {
    dialogRef.current?.close()
  }
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const myState = useAppSelector((state) => state.userInfo.extraInfo)
  const issueState = useAppSelector((state) => state.projectIssue)
  const taskCategory = useAppSelector((state) => state.projectDetailCategory.task)

  const { getAccessToken } = createAccessTokenManager
  const orgId = useAppSelector((state) => state.userInfo.extraInfo.organizationId)
  const myUserId = useAppSelector((state) => state.userInfo.extraInfo.userId)
  const [projectDetailId, setProjectDetailId] = useState<number>(0)

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
  const [inviteList, setInviteList] = useState<ColleagueType[]>([])
  const [filterIssueList, setFilterIssueList] = useState<ProjectIssueType[] | null>()
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
            Authorization: `Bearer ${getAccessToken()}`,
            [KEY_X_ORGANIZATION_CODE]: orgCode,
          },
        }
        return fetchProps
      case PROJECT_ISSUE_SCHEDULE_VALUE.toUpperCase():
        fetchProps = {
          data: {
            category: issueState.category,
            location: issueState.place,
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
            Authorization: `Bearer ${getAccessToken()}`,
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
            Authorization: `Bearer ${getAccessToken()}`,
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
            Authorization: `Bearer ${getAccessToken()}`,
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
      await queryClient.invalidateQueries({ queryKey: ['todo-list', 'task-list', 'schedule-list'] })
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
  const { data: projectDetail, isLoading } = useQuery({
    queryKey: ['project-detail', 'post-issue'],
    queryFn: async () => {
      const res = await moduleGetFetch<ProjectResponseType>({
        params: {
          projectId: Number(query.id),
        },
        fetchUrl: API_URL_PROJECTS,
        header: {
          Authorization: `Bearer ${getAccessToken()}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
      setProjectDetailId((res as SuccessResponseType<ProjectResponseType>).result.id)
      return res as SuccessResponseType<ProjectResponseType>
    },
  })

  const { refetch } = useQuery({
    queryKey: ['issue-list'],
    queryFn: async () => {
      const res = await moduleGetFetch<ProjectIssueResponseType>({
        params: {
          projectId: projectDetailId,
          limit: 10,
          offset: 0,
          category: PROJECT_ISSUE_ALL_VALUE.toUpperCase(),
        },
        fetchUrl: API_URL_PROJECT_ISSUE_LIST,
        header: {
          Authorization: `Bearer ${getAccessToken()}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
      const resIssueList = res as SuccessResponseType<ProjectIssueResponseType>
      switch (taskCategory) {
        case PROJECT_SIDEBAR_TASK_ALL:
          setFilterIssueList(resIssueList.result.data)
          break
        case PROJECT_SIDEBAR_TASK_MY:
          setFilterIssueList(
            resIssueList.result.data.filter((data) => data.issuer.name === myState.name),
          )
          break
        default:
          setFilterIssueList(resIssueList.result.data)
          break
      }
      return res as SuccessResponseType<ProjectIssueResponseType>
    },
    enabled: !isLoading,
  })

  // const fidlterIssueList = () => {
  //   switch (taskCategory) {
  //     case PROJECT_SIDEBAR_TASK_ALL:
  //       return issueList
  //     case PROJECT_SIDEBAR_TASK_MY:
  //       return issueList?.result.data?.filter((data) => data.issuer.name === myState.name)
  //     default:
  //       return issueList
  //   }
  // }
  // const defineIssueList = () => {
  //   if (issueList !== undefined) return issueList.result.data
  //   return null
  // }

  const { data: issuePinnedList } = useQuery({
    queryKey: ['issue-pinned', 'post-issue'],
    queryFn: async () => {
      const res = await moduleGetFetch<ProjectIssueType[]>({
        params: {
          projectId: Number(projectDetailId),
        },
        fetchUrl: API_URL_PROJECT_ISSUE_LIST_PINNED,
        header: {
          Authorization: `Bearer ${getAccessToken()}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
      return res as SuccessResponseType<ProjectIssueType[]>
    },
    enabled: !isLoading,
  })
  const definePinnedList = () => {
    if (issuePinnedList !== undefined) return issuePinnedList.result
    return null
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
          Authorization: `Bearer ${getAccessToken()}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
      const arr = (res as SuccessResponseType<ColleagueType[]>).result
      return arr.filter((data) => data.userId !== myUserId)
    },
  })

  const { mutate: invite } = useMutation({
    mutationKey: ['invite-member'],
    mutationFn: async () => {
      const inviteIdList = inviteList.map((data) => data.userId)
      await modulePostFetch<string>({
        data: {
          members: inviteIdList,
          projectId: projectDetail?.result.id,
        },
        fetchUrl: API_URL_PROJECT_INVITE,
        header: {
          Authorization: `Bearer ${getAccessToken()}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
    },
    onSuccess: () => {
      setDialogText({
        main: '초대에 성공했습니다.',
        sub: '',
      })
      handleCloseInviteModal()
    },
    onError: () => {
      setDialogText({
        main: '초대에 실패했습니다.',
        sub: '',
      })
    },
  })

  const unInviteMember = () => {
    let projectMembersId: number[] = []
    if (projectDetail !== undefined) {
      projectMembersId = projectDetail.result.members.map((member) => member.id)
    }
    return colleague !== undefined
      ? colleague.filter((colleague) => !projectMembersId.includes(colleague.userId))
      : []
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
      childComponent: (
        <InviteProjectMemberModal
          colleague={unInviteMember()}
          inviteList={inviteList}
          setInviteList={setInviteList}
        />
      ),
      name: MODAL_INVITE_MEMBER_IN_PROJECT,
      btnValue: MODAL_BTN_SAVE,
      confirmFunc: invite,
      dialog: dialogRef,
      dialogAlertText: dialogText,
      dialogBtnValue: projectDialogBtnValue,
    },
  ]
  useEffect(() => {
    dispatch(changeIssueProjectIdReducer(Number(query.id)))
    setKeyForProjectDetailHub((prevKey) => prevKey + 1)
  }, [taskCategory])

  useEffect(() => {
    if (projectDetail !== undefined) void refetch()
  }, [projectDetail])

  return (
    <section className="w-full space-y-5 sort-vertical-flex h-4/5 ">
      {projectDetail !== undefined ? (
        <>
          <ProjectDetailTab projectInfo={projectDetail.result} colleague={colleague ?? []} />
          <ProjectDetailHub
            key={keyForProjectDetailHub}
            projectInfo={projectDetail.result}
            issueList={filterIssueList !== undefined ? filterIssueList : null}
            pinnedList={definePinnedList()}
          />
        </>
      ) : (
        <div className="p-5">
          <span className="font-bold">프로젝트를 불러오는데 실패했습니다.</span>
        </div>
      )}

      <ModalHub modals={modalList} />
    </section>
  )
}
