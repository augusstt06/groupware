'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import ProjectMainHub from '../component/page/project/hub/ProjectMainHub'
import CreateProjectModal from '../component/ui/modal/project/CreateProjectModal'
import { KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE } from '../constant/constant'
import { useAppSelector } from '../module/hooks/reduxHooks'
import { moduleCheckUserState } from '../module/utils/moduleCheckUserState'
import { moduleGetCookie } from '../module/utils/moduleCookie'
import { type ModuleCheckUserStateProps } from '../types/moduleTypes'

export default function Project() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])

  const isCreateProjectModalOpen = useAppSelector(
    (state) => state.projectModal.isCreateProjectModalOpen,
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
    <main className="md:w-[65rem] w-[35rem] h-4/5 flex flex-col items-center">
      <ProjectMainHub />
      {isCreateProjectModalOpen ? <CreateProjectModal /> : <></>}
    </main>
  )
}
