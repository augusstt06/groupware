'use client'
import { getCookie } from 'cookies-next'
import Link from 'next/link'

import Hub from '../component/page/main/Hub'
import { NavigationBtn } from '../component/ui/button/BtnGroups'
import { InputLabel } from '../component/ui/label/Inputlabel'

export default function Main() {
  const token = getCookie('access-token')
  return (
    <>
      {token !== undefined ? (
        <main className="flex flex-col justify-start items-left h-4/5 pl-10 pr-10 pt-10">
          <InputLabel title="Current Post" />
          <Hub />
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
