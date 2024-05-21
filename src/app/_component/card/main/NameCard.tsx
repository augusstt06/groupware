import { useEffect, useState } from 'react'

import { IoPeopleCircleSharp } from 'react-icons/io5'

import { useAppSelector } from '@/module/hooks/reduxHooks'
export default function NameCard() {
  const [mount, setMount] = useState(false)
  const extraUserInfo = useAppSelector((state) => state.userInfo.extraInfo)

  useEffect(() => {
    setMount(true)
  }, [])
  return (
    <div className="w-full max-w-sm mb-5 rounded-lg">
      {mount ? (
        <div className="flex flex-col items-center justify-center rounded-lg">
          <IoPeopleCircleSharp className="w-8 h-8" />
          <h1 className="text-xl text-gray-600 dark:text-gray-200">{extraUserInfo.name}</h1>
          <p className="text-sm text-gray-400">{extraUserInfo.organizationName}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
