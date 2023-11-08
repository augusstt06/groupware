import { useEffect } from 'react'

import { InputIconlabel } from '../../../label/InputIconlabel'
import { InputLabel, InputlabelAdd } from '../../../label/Inputlabel'

import { useInput } from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { pwdReducer } from '@/app/store/reducers/loginInfoReducer'
import { type PwdInputProps } from '@/app/types'

export default function PwdInput(props: PwdInputProps) {
  const dispatch = useAppDispatch()
  const pwdInputData = useInput('')

  useEffect(() => {
    dispatch(
      pwdReducer({
        isCheck: false,
        pwdValue: pwdInputData.value,
        pwdConfirmValue: '',
      }),
    )
  }, [pwdInputData.value, dispatch])
  return (
    <>
      <InputLabel title={props.title} />
      <InputlabelAdd title="입력문자 보기" />
      <input
        type="checkbox"
        className="ml-2"
        defaultChecked={props.isPwdView}
        onChange={() => {
          props.setIsPwdView(!props.isPwdView)
        }}
      />

      <div className="flex relative mt-2 mb-3">
        <InputIconlabel icon={props.icon} />
        <input
          type={props.isPwdView ? 'text' : 'password'}
          {...pwdInputData}
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />
      </div>
    </>
  )
}
