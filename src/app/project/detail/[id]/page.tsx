'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import ProjectDetailHub from '@/app/component/page/project/hub/ProjectDetailHub'
import CreateProjectIssueModal from '@/app/component/ui/modal/project/CreateProjectIssueModal'
import ProjectDetailTab from '@/app/component/ui/tab/project/ProjectDetailTab'
import { KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE } from '@/app/constant/constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/app/module/utils/moduleCheckUserState'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { type ModuleCheckUserStateProps } from '@/app/types/moduleTypes'

export default function ProjectDetail() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const isCreateProjectIssueModalOpen = useAppSelector(
    (state) => state.projectModal.isCreateProjectIssueModalOpen,
  )
  useEffect(() => {
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
    <main className="md:w-[65rem] w-[35rem] h-4/5 flex flex-col items-center ">
      <ProjectDetailTab />
      <ProjectDetailHub />
      {isCreateProjectIssueModalOpen ? <CreateProjectIssueModal /> : <></>}
    </main>
  )
}
