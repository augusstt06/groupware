import { cookies } from 'next/headers'
import Link from 'next/link'

import { NavigationBtn } from './component/ui/button/BtnGroups'

export default function Home() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access-token')

  const isLogin = accessToken !== undefined

  return (
    <main className="flex flex-col justify-center items-center h-4/5">
      <div>
        {isLogin ? (
          <Link href="/main">
            <NavigationBtn title="Go Main" />
          </Link>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center mb-10">
              <div className="text-xl font-bold mb-6">
                Easily collaborate with your team from anywhere
              </div>
              <div className="text-medium font-semibold">other comments...</div>
            </div>
            <div className="flex flex-col justify-around items-center h-2/4">
              <Link href="/signup">
                <NavigationBtn title="Sign Up for Free" />
              </Link>
              <div className="text-medium font-normal mt-8 mb-3">
                If you already have an account,
              </div>
              <Link href="/login">
                <NavigationBtn title="Login" />
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
