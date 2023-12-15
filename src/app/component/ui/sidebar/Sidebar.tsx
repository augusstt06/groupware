'use client'
import { useState } from 'react'

import { TbSquareArrowLeftFilled, TbSquareArrowRightFilled } from 'react-icons/tb'

import MainCardGroup from '../card/MainCardGroup'

export default function Sidebar() {
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

      <div
        className={`md:static col-span-1 md:w-5/6 md:block ${
          isSideOpen
            ? 'absolute md:bg-none bg-white dark:bg-gray-900 top-14 p-2 left-0 z-10'
            : 'hidden'
        }`}
      >
        <MainCardGroup reRender={reRender} setRerender={setRerender} />
      </div>
    </>
  )
}
