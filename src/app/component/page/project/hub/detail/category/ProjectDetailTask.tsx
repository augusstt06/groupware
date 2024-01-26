'use client'

import { type Dispatch, useEffect, useState } from 'react'
import { DragDropContext, type DropResult } from 'react-beautiful-dnd'

import ProjectDetailTaskColumn from './ProjectDetailTaskColumn'

import {
  PROJECT_DETAIL_CATEGORY_TASK,
  PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_INIT_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_TITLE,
  PROJECT_SIDEBAR_TASK_ALL,
} from '@/app/constant/constant'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import {
  changeProjectDetailCategoryReducer,
  changeProjectDetailTaskCategoryReducer,
} from '@/app/store/reducers/project/projectDetailCategoryReducer'
import { type ProjectDetailCardType } from '@/app/types/ui/cardTypes'
import { type KanbanBoardColumnType } from '@/app/types/variableTypes'

export default function ProjectDetailTask() {
  const dispatch = useAppDispatch()
  const [reqCardList, setReqCardList] = useState<ProjectDetailCardType[]>([
    { title: '업무명', time: '2024.1.1-2025.1.1' },
    { title: '2번째', time: '2024.12.1-2025.12.23' },
  ])
  const [progressCardlist, setProgressCardList] = useState<ProjectDetailCardType[]>([
    { title: '모달 생성', time: '2024.10.1-2025.1.1' },
    { title: 'ui작업', time: '2024.1.15-2025.4.23' },
    { title: '칸반보드 제작', time: '2024.1.15-2025.4.23' },
  ])
  const [completeCardlist, setCompleteCardList] = useState<ProjectDetailCardType[]>([
    { title: '완료작업', time: '2024.10.1-2025.1.1' },
  ])
  const [initCardlist, setInitCardList] = useState<ProjectDetailCardType[]>([
    { title: 'test', time: '2024.10.11-2025.1.1' },
  ])
  const [columnList, setColumnList] = useState([
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
    const draggedCard = sourceColumn.cardList[source.index]
    sourceColumn.cardList.splice(source.index, 1)
    destinationColumn.cardList.splice(destination.index, 0, draggedCard)

    // 변화된 리스트를 columns에 적용
    setColumns([...columns])
  }
  useEffect(() => {
    dispatch(changeProjectDetailCategoryReducer(PROJECT_DETAIL_CATEGORY_TASK))
    dispatch(changeProjectDetailTaskCategoryReducer(PROJECT_SIDEBAR_TASK_ALL))
  }, [])
  return (
    <DragDropContext
      onDragEnd={(result) => {
        onDragEnd(result, columnList, setColumnList)
      }}
    >
      <div className="md:w-4/5 w-full grid-cols-4 grid gap-2 justify-center dark:border-gray-700 border border-gray-200 rounded-lg dark:bg-[#1a202c] shadow-lg p-3">
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
  )
}
