import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import ProjectDetailTodoCard from '@/app/component/ui/card/project/detail/ProjectDetailTodoCard'
import {
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
  PROJECT_ISSUE_TODO_VALUE,
} from '@/app/constant/constant'
import { API_URL_PROJECT_ISSUE_LIST } from '@/app/constant/route/api-route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import { type SuccessResponseType } from '@/app/types/module'
import { type IssueResponseType, type ScheduleType } from '@/app/types/variable'

export default function ProjectDetailTodo() {
  const query = useParams()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const [todoIssues, setTodoIssues] = useState<ScheduleType[]>([])
  const isDataInList = (list: ScheduleType[], newData: ScheduleType) => {
    return list.some((item) => item.title === newData.title)
  }
  const { data: todoList } = useQuery({
    queryKey: ['todo-list'],
    queryFn: async () => {
      const res = await moduleGetFetch<IssueResponseType<ScheduleType>>({
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
      })
      return (res as SuccessResponseType<IssueResponseType<ScheduleType>>).result
    },
  })
  const successFetchTodoList = () => {
    todoList?.data.forEach((data) => {
      if (!isDataInList(todoIssues, data)) {
        setTodoIssues((prev) => [...prev, data])
      }
    })
  }

  useEffect(() => {
    successFetchTodoList()
  }, [todoList])

  return (
    <div className="w-4/5 max-w-7xl justify-center rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10 z-1">
      <div className="w-full p-3 ">
        <span className="font-bold">전체 할일 </span>
        <span className="font-bold text-indigo-400">{todoIssues.length}</span>
      </div>
      <div className="flex-col flex items-center justify-center">
        {todoIssues.map((data) => (
          <ProjectDetailTodoCard todo={data} key={data.id} />
        ))}
      </div>
    </div>
  )
}
