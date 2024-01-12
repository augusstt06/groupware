'use client'
import { useState } from 'react'

import { TbSquareArrowLeftFilled, TbSquareArrowRightFilled } from 'react-icons/tb'

import MainSidebarCardGroup from '../card/sidebar/MainSidebarCardGroup'

import { type SidebarProps } from '@/app/types/ui/uiTypes'

export default function Sidebar(props: SidebarProps) {
  const [reRender, setRerender] = useState(false)
  const [isSideOpen, setIsSideOpen] = useState(false)
  const clickSideOpen = () => {
    if (isSideOpen) setIsSideOpen(false)
    else {
      setIsSideOpen(true)
    }
  }
  return (
    <>
      {!isSideOpen ? (
        <TbSquareArrowRightFilled
          className="md:hidden w-8 h-8 absolute top-1/2 dark:text-gray-300 left-0"
          onClick={clickSideOpen}
        />
      ) : (
        <TbSquareArrowLeftFilled
          className="md:hidden w-8 h-8 absolute top-1/2 dark:text-gray-300 left-40"
          onClick={clickSideOpen}
        />
      )}

      {/* FIXME: sidebar도 fixed로 바꾸기 */}
      <div
        className={`md:static col-span-1 w-40 md:w-5/6 md:block ${
          isSideOpen
            ? 'absolute md:bg-none bg-white dark:bg-[#1a202c] top-14 p-2 left-0 z-10'
            : 'hidden'
        }`}
      >
        <MainSidebarCardGroup
          title={props.title}
          reRender={reRender}
          setRerender={setRerender}
          boardCategoryList={props.boardCategoryList}
        />
      </div>
    </>
  )
}
