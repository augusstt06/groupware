import { AiFillPhone, AiOutlineMail } from 'react-icons/ai'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'

import { REGISTER_EMAIL } from '@/app/constant/constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'

export default function Stepper() {
  const isMailComplete = useAppSelector((state) => {
    return state.loginInfo.email.isCheck
  })
  const isPwdComplete = useAppSelector((state) => {
    const pwdCheck = state.loginInfo.pwd.isCheck
    return pwdCheck
  })
  const isNameComplete = useAppSelector((state) => {
    return state.loginInfo.name.isCheck
  })
  const isPhoneNumComplete = useAppSelector((state) => {
    return state.loginInfo.phoneNumber.isCheck
  })

  const tailwindLi = (title: string, complete: boolean) => {
    const completeColor = complete ? 'text-indigo-500 font-bold' : 'text-indigo-200'
    const completeAfter = complete
      ? 'after:border-indigo-500 dark:after:border-indigo-600'
      : 'after:border-gray-100 dark:after:border-gray-700'

    if (title === REGISTER_EMAIL.toLowerCase()) {
      const className = `flex w-full ${completeColor} items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${completeAfter}`
      return className
    }
    const className = `flex w-full ${completeColor} items-center after:content-[''] after:w-full after:h-1 after:border-b ${completeAfter} after:border-4 after:inline-block `
    return className
  }

  const tailwindSpan = () => {
    if (isMailComplete && isNameComplete && isPhoneNumComplete && isPwdComplete) {
      const className =
        'flex items-center text-indigo-500 font-bold justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0'
      return className
    }
    const className =
      'flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0'
    return className
  }

  const checkList = [
    {
      title: 'mail',
      icon: <AiOutlineMail />,
      isComplete: isMailComplete,
    },
    {
      title: 'pwd',
      icon: <RiLockPasswordFill />,
      isComplete: isPwdComplete,
    },
    {
      title: 'name',
      icon: <BsFillPersonVcardFill />,
      isComplete: isNameComplete,
    },
    {
      title: 'phoneNum',
      icon: <AiFillPhone />,
      isComplete: isPhoneNumComplete,
    },
  ]

  return (
    <ul className="flex flex-row items-center judtify-center w-full">
      {checkList.map((data) => (
        <li className={tailwindLi(data.title, data.isComplete)} key={data.title}>
          <span className={tailwindSpan()}>{data.icon}</span>
        </li>
      ))}
      <li className="flex items-center">
        <span className={tailwindSpan()}>
          <FaCheck className="text-white" />
        </span>
      </li>
    </ul>
  )
}
