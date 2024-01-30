import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import ProjectDetailTodoCard from '@/app/component/ui/card/project/detail/ProjectDetailTodoCard'
import {
  API_SUCCESS_CODE,
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
  PROJECT_ISSUE_TODO_VALUE,
} from '@/app/constant/constant'
import { API_URL_PROJECT_ISSUE_LIST } from '@/app/constant/route/api-route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import {
  type FailResponseType,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import { type IssueResponseType, type ScheduleType } from '@/app/types/variableTypes'

export default function ProjectDetailTodo() {
  const query = useParams()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  // const dispatch = useAppDispatch()
  const [todoList, setTodoList] = useState<ScheduleType[]>([])
  const isDataInList = (list: ScheduleType[], newData: ScheduleType) => {
    return list.some((item) => item.title === newData.title)
  }
  const fetchTodoList = async () => {
    const fetchProps: ModuleGetFetchProps = {
      params: {
        category: PROJECT_ISSUE_TODO_VALUE.toUpperCase(),
        limit: 10,
        offset: 0,
        projectId: Number(query.id),
      },
      fetchUrl: API_URL_PROJECT_ISSUE_LIST,
      header: {
        Authorization: `Bearer ${accessToken}`,
        [KEY_X_ORGANIZATION_CODE]: orgCode,
      },
    }
    const res = await moduleGetFetch<IssueResponseType<ScheduleType>>(fetchProps)
    if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
    const resList = (res as SuccessResponseType<IssueResponseType<ScheduleType>>).result.data
    resList.forEach((data) => {
      if (!isDataInList(todoList, data)) {
        setTodoList((prev) => [...prev, data])
      }
    })
  }
  useEffect(() => {
    void fetchTodoList()
  }, [])

  return (
    <div className="w-full justify-center dark:border-gray-700 border border-gray-200 rounded-lg dark:bg-[#1a202c] shadow-lg p-3 z-1">
      <div className="w-full p-3 ">
        <span className="font-bold">전체 할일 </span>
        <span className="font-bold text-indigo-400">{todoList.length}</span>
      </div>
      <div className="flex items-center justify-center">
        {todoList.map((data) => (
          <ProjectDetailTodoCard todo={data} key={data.id} />
        ))}
      </div>
    </div>
  )
}
