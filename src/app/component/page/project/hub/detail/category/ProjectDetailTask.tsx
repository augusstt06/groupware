'use client'

import { useState } from 'react'

import ProjectDetailTaskColumn from './ProjectDetailTaskColumn'

import {
  PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_INIT_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_TITLE,
} from '@/app/constant/constant'
import { type ProjectDetailCardType } from '@/app/types/ui/cardTypes'

export default function ProjectDetailTask() {
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
  const columnList = [
    {
      columnTitle: PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_TITLE,
      columnCardNumber: reqCardList.length,
      columnColor: 'bg-[rgb(254,251,231)]',
      cardColor: '[rgb(237,206,72)]',
      cardList: reqCardList,
      setCardList: setReqCardList,
    },
    {
      columnTitle: PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_TITLE,
      columnCardNumber: progressCardlist.length,
      columnColor: 'bg-[rgb(234,250,242)]',
      cardColor: '[rgb(98,214,124)]',
      cardList: progressCardlist,
      setCardList: setProgressCardList,
    },
    {
      columnTitle: PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_TITLE,
      columnCardNumber: completeCardlist.length,
      columnColor: 'bg-[rgb(232,246,254)]',
      cardColor: '[rgb(72,160,240)]',
      cardList: completeCardlist,
      setCardList: setCompleteCardList,
    },
    {
      columnTitle: PROJECT_ISSUE_TASK_PROGRESS_INIT_TITLE,
      columnCardNumber: initCardlist.length,
      columnColor: 'bg-[rgb(251,241,239)]',
      cardColor: '[rgb(221,109,96)]',
      cardList: initCardlist,
      setCardList: setInitCardList,
    },
  ]

  return (
    <div className="md:w-4/5 w-full grid-cols-4 grid gap-2 justify-center dark:border-gray-700 border border-gray-200 rounded-lg  dark:bg-[#1a202c] shadow-lg p-3  ">
      {columnList.map((data) => (
        <ProjectDetailTaskColumn
          key={data.cardColor}
          columnTitle={data.columnTitle}
          columnCardNumber={data.columnCardNumber}
          columnColor={data.columnColor}
          cardColor={data.cardColor}
          cardList={data.cardList}
          setCardList={data.setCardList}
        />
      ))}
    </div>
  )
}
