import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import ProjectDetailTodoCard from '@/components/card/project/detail/ProjectDetailTodoCard'
import { KEY_X_ORGANIZATION_CODE, PROJECT_ISSUE_TODO_VALUE } from '@/constant/constant'
import { API_URL_PROJECT_ISSUE_LIST } from '@/constant/route/api-route-constant'
import { useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleGetFetch } from '@/module/utils/moduleFetch'
import { createAccessTokenManager } from '@/module/utils/token'
import { type SuccessResponseType } from '@/types/module'
import { type IssueResponseType, type ScheduleType } from '@/types/variable'

export default function ProjectDetailTodo() {
  const query = useParams()
  const { getAccessToken } = createAccessTokenManager
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
          Authorization: `Bearer ${getAccessToken()}`,
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
      <div className="p-3 grid grid-cols-1 gap-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
        {todoIssues.map((data) => (
          <ProjectDetailTodoCard todo={data} key={data.id} />
        ))}
      </div>
    </div>
  )
}
