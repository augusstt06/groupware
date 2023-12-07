import { useEffect, useState } from 'react'

import { useAppSelector } from '@/app/module/hooks/reduxHooks'

export default function NameCard() {
  const [mount, setMount] = useState(false)
  const extraUserInfo = useAppSelector((state) => state.userInfo.extraInfo)

  useEffect(() => {
    setMount(true)
  }, [])
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
      {mount ? (
        <>
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-4">
            <div className="flex flex-col items-center justify-start w-4/5">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white mr-2">
                {extraUserInfo.name}
              </h5>
              <p className="mb-1 text-medium font-medium text-gray-900 dark:text-white mr-2">
                {extraUserInfo.organizationName}
              </p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
