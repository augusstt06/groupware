'use client'
import { getCookie } from 'cookies-next'
import Link from 'next/link'

import Hub from '../component/page/main/Hub'
import { NavigationBtn } from '../component/ui/button/BtnGroups'
import UserCard from '../component/ui/card/UserCard'
import { InputLabel } from '../component/ui/label/Inputlabel'

export default function Main() {
  const token = getCookie('access-token')
  return (
    <>
      {token !== undefined ? (
        <main className="flex flex-col justify-start items-center h-4/5 pl-10 pr-10 pt-10">
          <div className="flex flex-row justify-around items-center w-5/6">
            <div className="w-3/5 ml-10">
              {/* FIXME: useravatar 대체가능한지 생각 */}
              <UserCard />
            </div>
            <div className="h-full mr-10">
              <InputLabel title="Current Post" />
              <Hub />
            </div>
          </div>
        </main>
      ) : (
        <main className="flex flex-col justify-center items-center h-2/5 pl-10 pr-10 pt-10">
          <div className="mb-8">Please login</div>
          <Link href="/">
            <NavigationBtn title="Go to Login or Sign Up" />
          </Link>
        </main>
      )}
    </>
  )
}
