'use client'

import { useEffect, useRef, useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import ProjectMainHub from './_childs/hub/ProjectMainHub'

import ModalHub from '@/_component/modal/Modal'
import CreateProjectModal from '@/_component/modal/project/CreateProjectModal'
import {
  KEY_ACCESS_TOKEN,
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
} from '@/constant/constant'
import {
  API_URL_PROJECTS,
  API_URL_PROJECTS_LIST,
  API_URL_PROJECTS_LIST_INCLUDED,
  API_URL_PROJECTS_LIST_STARRED,
} from '@/constant/route/api-route-constant'
import useInput from '@/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/module/utils/moduleCookie'
import { moduleGetFetch, modulePostFetch } from '@/module/utils/moduleFetch'
import { createProjectModalReducer } from '@/store/reducers/project/projectModalReducer'
import { type DialogBtnValueType, type SuccessResponseType } from '@/types/module'
import {
  type DialogTextType,
  type FetchPostProjectResponseType,
  type ProjectListResponseType,
} from '@/types/variable'

export default function Project() {
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const handleDialogClose = () => {
    dialogRef.current?.close()
  }
  const createProjectModalState: boolean = useAppSelector(
    (state) => state.projectModal.isCreateProjectModalOpen,
  )
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])

  const orgId = useAppSelector((state) => state.userInfo.extraInfo.organizationId)

  const projectCategory = useAppSelector((state) => state.projectMainCategory.selectProjectMenu)

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

  const { mutate: createProject } = useMutation({
    mutationKey: ['create-project'],
    mutationFn: async ({
      projectColor,
      projectTitle,
    }: {
      projectColor: string
      projectTitle: string
    }) => {
      await modulePostFetch<FetchPostProjectResponseType>({
        data: {
          color: projectColor,
          name: projectTitle,
          organizationId: orgId,
        },
        fetchUrl: API_URL_PROJECTS,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['project-list'] })
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
    },
  })

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

    createProject({ projectColor: selectColor, projectTitle: projectName.value })
    handleCloseCreateProjectModal()
    projectName.resetValue()
    setSelectColor('')
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
  const { data: projectList } = useQuery({
    queryKey: ['project-list', decideFetchUrl(), 'star', 'unstar'],
    queryFn: async () => {
      const res = await moduleGetFetch<ProjectListResponseType>({
        params: {
          limit: 10,
          offset: 0,
          organizationId: orgId,
        },
        fetchUrl: decideFetchUrl(),
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
      return res as SuccessResponseType<ProjectListResponseType>
    },
  })

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

  const defineProjectList = () => {
    if (projectList !== undefined) return projectList.result.data
    return []
  }
  useEffect(() => {
    if (createProjectModalState) dispatch(createProjectModalReducer(false))
  }, [projectCategory])

  return (
    <section className="w-full sort-vertical-flex h-4/5">
      <ProjectMainHub projectList={defineProjectList()} />
      <ModalHub modals={modalList} />
    </section>
  )
}
