import { cookies } from 'next/headers'
import Link from 'next/link'

import { NavigationBtn } from './component/ui/button/NavigationBtn'
import Main from './main/page'

export default function Home() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access-token')

  const isLogin = accessToken !== undefined

  return (
    <main className="flex flex-col justify-center items-center h-4/5">
      <div>
        {isLogin ? (
          <Main />
        ) : (
          <>
            <div className="text-xl font-bold mb-10">
              Easily collaborate with your team from anywhere
            </div>
            <div className="text-medium font-semibold mb-10">other comments...</div>
            <Link href={'/login'}>
              <NavigationBtn title="Sign Up for Free" />
            </Link>
          </>
        )}
      </div>
    </main>
  )
}
