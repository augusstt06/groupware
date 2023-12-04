'use client'

import { useState } from 'react'

import CreateProject from '../component/page/main/create/CreateProgect'
import ProjectHub from '../component/page/main/hub/project/ProjectHub'
import MenuCard from '../component/ui/card/MenuCard'
import UserCard from '../component/ui/card/UserCard'

export default function Project() {
  const [reRender, setRerender] = useState(false)
  // FIXME: 프로젝트 리스트 임시 변수
  const isProject = false
  return (
    <main className="grid gap-4 grid-cols-5 h-4/5  pt-10 ml-10 mr-10">
      <div className="col-span-1 w-5/6">
        <UserCard reRender={reRender} setRerender={setRerender} />
        <MenuCard />
      </div>
      {isProject ? (
        <div className="col-span-4 mr-10">
          <ProjectHub />
        </div>
      ) : (
        <CreateProject />
      )}
    </main>
  )
}
