import { useEffect } from 'react'

import { InputIconlabel } from '../../label/InputIconlabel'
import { InputLabel, InputlabelAdd } from '../../label/Inputlabel'

import { REGISTER_EMAIL, REGISTER_PWD } from '@/app/constant/constant'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { emailReducer, pwdReducer } from '@/app/store/reducers/loginInfoReducer'
import { type LoginInputProps } from '@/app/types/ui/inputTypes'

export default function LoginInput(props: LoginInputProps) {
  const dispatch = useAppDispatch()
  const useInput = props.useInput

  useEffect(() => {
    const reducerProps = {
      value: useInput.value,
    }
    switch (props.title) {
      case REGISTER_EMAIL:
        dispatch(emailReducer(reducerProps))
        break
      case REGISTER_PWD:
        dispatch(pwdReducer(reducerProps))
        break
    }
  }, [useInput.value])
  return (
    <>
      <InputLabel title={props.title} />
      {props.title === REGISTER_PWD ? (
        <>
          <InputlabelAdd title="입력문자 보기" />
          <input
            type="checkbox"
            className="ml-2"
            defaultChecked={props.isPwdView}
            onChange={() => {
              props.setIsPwdView(!props.isPwdView)
            }}
          />
        </>
      ) : (
        <></>
      )}
      <div className="flex relative mt-2 mb-6">
        <InputIconlabel icon={props.icon} />
        <input
          type={props.title === REGISTER_EMAIL ? 'text' : props.isPwdView ? 'text' : 'password'}
          value={useInput.value}
          onChange={useInput.onChange}
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />
      </div>
    </>
  )
}
