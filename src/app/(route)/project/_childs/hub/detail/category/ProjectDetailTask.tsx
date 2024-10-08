'use client'

import { type Dispatch, useEffect, useState } from 'react'
import { DragDropContext, type DropResult } from 'react-beautiful-dnd'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import ProjectDetailTaskColumn from './ProjectDetailTaskColumn'

import {
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
  PROJECT_DETAIL_CATEGORY_TASK,
  PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_VALUE,
  PROJECT_ISSUE_TASK_PROGRESS_INIT_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_INIT_VALUE,
  PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_VALUE,
  PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_VALUE,
  PROJECT_ISSUE_TASK_VALUE,
} from '@/constant/constant'
import {
  API_URL_PROJECT_ISSUE_LIST,
  API_URL_PROJECT_ISSUE_REARRANGE,
} from '@/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/module/utils/moduleCookie'
import { moduleGetFetch, modulePatchFetch } from '@/module/utils/moduleFetch'
import { changeProjectDetailCategoryReducer } from '@/store/reducers/project/projectDetailCategoryReducer'
import { type SuccessResponseType } from '@/types/module'
import {
  type ColumnListType,
  type ColumnType,
  type IssueResponseType,
  type KanbanBoardColumnType,
} from '@/types/variable'

export default function ProjectDetailTask() {
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const query = useParams()
  const dispatch = useAppDispatch()

  const isDataInList = (list: ColumnType[], newData: ColumnType) => {
    return list.some((item) => item.id === newData.id)
  }
  const { data: taskList } = useQuery({
    queryKey: ['task-list'],
    queryFn: async () => {
      const res = await moduleGetFetch<IssueResponseType<ColumnType>>({
        params: {
          category: PROJECT_ISSUE_TASK_VALUE.toUpperCase(),
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
      return res as SuccessResponseType<IssueResponseType<ColumnType>>
    },
  })

  const successFetchTaskList = () => {
    taskList?.result.data.forEach((data) => {
      switch (data.processState) {
        case PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_VALUE:
          if (!isDataInList(reqCardList, data)) {
            setReqCardList((prev) => [...prev, data])
          }

          break
        case PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_VALUE:
          if (!isDataInList(completeCardlist, data)) {
            setCompleteCardList((prev) => [...prev, data])
          }
          break
        case PROJECT_ISSUE_TASK_PROGRESS_INIT_VALUE:
          if (!isDataInList(initCardlist, data)) {
            setInitCardList((prev) => [...prev, data])
          }
          break
        case PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_VALUE:
          if (!isDataInList(progressCardlist, data)) {
            setProgressCardList((prev) => [...prev, data])
          }
          break
      }
    })
  }

  const [reqCardList, setReqCardList] = useState<ColumnType[]>([])
  const [progressCardlist, setProgressCardList] = useState<ColumnType[]>([])
  const [completeCardlist, setCompleteCardList] = useState<ColumnType[]>([])
  const [initCardlist, setInitCardList] = useState<ColumnType[]>([])
  const [updatedCardList, setUpdatedCardList] = useState<ColumnType[]>([])

  const [columnList, setColumnList] = useState<ColumnListType[]>([])

  const { mutate: rearrange } = useMutation({
    mutationKey: ['rearrange'],
    mutationFn: async () => {
      await modulePatchFetch<string>({
        data: {
          complted: completeCardlist,
          inProgress: progressCardlist,
          init: initCardlist,
          requested: reqCardList,
          updated: updatedCardList,
        },
        fetchUrl: API_URL_PROJECT_ISSUE_REARRANGE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
    },
  })

  // 드래그를 놓았을때 실행되는 함수
  const onDragEnd = (
    result: DropResult,
    columns: KanbanBoardColumnType[],
    setColumns: Dispatch<React.SetStateAction<KanbanBoardColumnType[]>>,
  ) => {
    if (result.destination == null) return

    const { source, destination } = result

    // 같은 컬럼 내에서만 드래그 드롭하는것이 아니라 다른 컬럼으로 이동이 가능
    // 카드를 꺼낸 컬럽
    const sourceColumn: KanbanBoardColumnType | undefined = columns.find(
      (column) => `column-${column.columnTitle}` === source.droppableId,
    )
    // 카드를 넣은 컬럼
    const destinationColumn: KanbanBoardColumnType | undefined = columns.find(
      (column) => `column-${column.columnTitle}` === destination.droppableId,
    )

    if (sourceColumn == null || destinationColumn == null) return

    // 드래그한 카드를 cardList에서 찾아서 순서를 맞추어 정렬
    // 드래그시, 카드 상태를 바꿔주어야함
    const draggedCard = sourceColumn.cardList[source.index]
    switch (destinationColumn.columnTitle) {
      case PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_TITLE:
        draggedCard.processState = PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_VALUE
        break
      case PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_TITLE:
        draggedCard.processState = PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_VALUE
        break
      case PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_TITLE:
        draggedCard.processState = PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_VALUE
        break
      case PROJECT_ISSUE_TASK_PROGRESS_INIT_TITLE:
        draggedCard.processState = PROJECT_ISSUE_TASK_PROGRESS_INIT_VALUE
        break
    }

    // 이후 드래그 카드가 업데이트된 카드 목록에 없다면 추가
    if (!isDataInList(updatedCardList, draggedCard)) {
      setUpdatedCardList((prev) => [...prev, draggedCard])
    }

    sourceColumn.cardList.splice(source.index, 1)
    destinationColumn.cardList.splice(destination.index, 0, draggedCard)

    // 변화된 리스트를 columns에 적용
    setColumns([...columns])
  }

  useEffect(() => {
    rearrange()
    // void fetchRearrangeColumn()
  }, [updatedCardList])
  useEffect(() => {
    dispatch(changeProjectDetailCategoryReducer(PROJECT_DETAIL_CATEGORY_TASK))
  }, [])

  useEffect(() => {
    successFetchTaskList()
    setColumnList([
      {
        columnTitle: PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_TITLE,
        columnCardNumber: reqCardList.length,
        columnColor: 'bg-[rgb(254,251,231)]',
        cardList: reqCardList,
        setCardList: setReqCardList,
      },
      {
        columnTitle: PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_TITLE,
        columnCardNumber: progressCardlist.length,
        columnColor: 'bg-[rgb(234,250,242)]',
        cardList: progressCardlist,
        setCardList: setProgressCardList,
      },
      {
        columnTitle: PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_TITLE,
        columnCardNumber: completeCardlist.length,
        columnColor: 'bg-[rgb(232,246,254)]',
        cardList: completeCardlist,
        setCardList: setCompleteCardList,
      },
      {
        columnTitle: PROJECT_ISSUE_TASK_PROGRESS_INIT_TITLE,
        columnCardNumber: initCardlist.length,
        columnColor: 'bg-[rgb(251,241,239)]',
        cardList: initCardlist,
        setCardList: setInitCardList,
      },
    ])
  }, [reqCardList, progressCardlist, completeCardlist, initCardlist, taskList])

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => {
          onDragEnd(result, columnList, setColumnList)
        }}
      >
        <div className=" w-4/5 max-w-7xl grid-cols-4 grid gap-2 justify-center rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10 ">
          {columnList.map((data, columnIndex) => (
            <ProjectDetailTaskColumn
              key={data.columnTitle}
              columnTitle={data.columnTitle}
              columnCardNumber={data.columnCardNumber}
              columnColor={data.columnColor}
              cardList={data.cardList}
            />
          ))}
        </div>
      </DragDropContext>
    </>
  )
}
