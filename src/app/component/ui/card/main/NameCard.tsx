import { useEffect, useState } from 'react'

import { IoPeopleCircleSharp } from 'react-icons/io5'

import { useAppSelector } from '@/app/module/hooks/reduxHooks'
export default function NameCard() {
  const [mount, setMount] = useState(false)
  const extraUserInfo = useAppSelector((state) => state.userInfo.extraInfo)

  useEffect(() => {
    setMount(true)
  }, [])
  return (
    <div className="w-full max-w-sm rounded-lg mb-5">
      {mount ? (
        <div className="flex flex-row items-center justify-center">
          <IoPeopleCircleSharp className="w-8 h-8" />
          <div className="flex flex-col items-center  p-3">
            <h1 className="text-xl text-gray-900 dark:text-white">{extraUserInfo.name}</h1>
            <p className="md:text-base text-xs text-gray-500 dark:text-white">
              {extraUserInfo.organizationName}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
