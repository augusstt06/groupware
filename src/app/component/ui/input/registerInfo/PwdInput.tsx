import { useEffect } from 'react'

import { InputIconlabel } from '../../label/InputIconlabel'
import { InputLabel, InputlabelAdd } from '../../label/Inputlabel'

import { useInput } from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { pwdReducer } from '@/app/store/reducers/loginInfoReducer'
import { type PwdInputProps } from '@/app/types/ui/inputTypes'

export default function PwdInput(props: PwdInputProps) {
  const dispatch = useAppDispatch()
  const inputData = useInput('')

  const pwdState = useAppSelector((state) => state.loginInfo.pwd)

  useEffect(() => {
    const isInput = inputData.value !== ''
    const isPwdValueNotEmpty = pwdState.pwdValue !== ''
    const isPwdConfirmValueNotEmpty = pwdState.pwdConfirmValue !== ''

    const isCheck = isInput && isPwdValueNotEmpty && isPwdConfirmValueNotEmpty

    const reducerData =
      props.title === 'Confirm Password'
        ? { isCheck, pwdValue: pwdState.pwdValue, pwdConfirmValue: inputData.value }
        : { isCheck, pwdValue: inputData.value, pwdConfirmValue: pwdState.pwdConfirmValue }

    dispatch(pwdReducer(reducerData))
  }, [inputData.value, pwdState.pwdValue, pwdState.pwdConfirmValue, dispatch])

  return (
    <>
      <InputLabel title={props.title} />
      <InputlabelAdd title="입력문자 보기" />
      <input
        type="checkbox"
        className="ml-2"
        defaultChecked={props.isInputValueView}
        onChange={() => {
          props.setIsInputValueView(!props.isInputValueView)
        }}
      />

      <div className="flex relative mt-2 mb-3">
        <InputIconlabel icon={props.icon} />
        <input
          type={props.isInputValueView ? 'text' : 'password'}
          {...inputData}
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />
      </div>
    </>
  )
}
