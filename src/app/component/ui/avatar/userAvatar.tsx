import { getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

import { useAppSelector } from '@/app/module/hooks/reduxHooks'

export default function UserAvatar() {
  const user = useAppSelector((state) => state.loginInfo)
  const dropMenu = ['DashBoard', 'Setting', 'Organization']
  const token = getCookie('access-token')
  const decodeTime = () => {
    if (typeof token === 'string') {
      const unixTimeStamp = new Date((jwtDecode(token).iat as number) * 1000)
      const monthList = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      const month = monthList[unixTimeStamp.getMonth()]
      const date = unixTimeStamp.getDate()
      const hours = unixTimeStamp.getHours()
      const minutes = unixTimeStamp.getMinutes()

      const convertTime = `${date} ${month} ${hours} ${minutes}`
      return convertTime
    }
    return ''
  }

  return (
    <>
      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{user.name.value}</span>
      </div>

      <div
        id="userDropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{user.name.value}</div>
          <div className="font-medium truncate">Login at {decodeTime()}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton"
        >
          {dropMenu.map((data) => (
            <li key={data}>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {data}
              </a>
            </li>
          ))}
        </ul>
        <div className="py-1">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </a>
        </div>
      </div>
    </>
  )
}
