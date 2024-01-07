import { useEffect, useState } from 'react'

import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

import ErrorAlert from '../../alert/ErrorAlert'
import { InputIconlabel } from '../../label/InputIconlabel'
import { InputLabel } from '../../label/Inputlabel'

import { REGISTER_CONFIRM_PWD } from '@/app/constant/constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import inputValidate from '@/app/module/utils/moduleInputValidate'
import { pwdReducer } from '@/app/store/reducers/login/signupInfoReducer'
import { type PwdInputProps } from '@/app/types/ui/inputTypes'

export default function PwdInput(props: PwdInputProps) {
  const dispatch = useAppDispatch()
  const useInput = props.useInput
  const pwdState = useAppSelector((state) => state.signupInfo.pwd)
  const [errorState, setErrorState] = useState({
    isError: false,
    description: '',
  })
  const setErrMsg = (errDescription: string) => {
    setErrorState({
      isError: true,
      description: errDescription,
    })
  }
  const handleClickError = () => {
    setErrorState({
      isError: false,
      description: errorState.description,
    })
  }

  useEffect(() => {
    const isInput = useInput.value !== ''
    const isPwdValueNotEmpty = pwdState.pwdValue !== ''
    const isPwdConfirmValueNotEmpty = pwdState.pwdConfirmValue !== ''
    const isCheck = isInput && isPwdValueNotEmpty && isPwdConfirmValueNotEmpty
    const reducerData =
      props.title === REGISTER_CONFIRM_PWD
        ? { isCheck, pwdValue: pwdState.pwdValue, pwdConfirmValue: useInput.value }
        : { isCheck, pwdValue: useInput.value, pwdConfirmValue: pwdState.pwdConfirmValue }

    dispatch(pwdReducer(reducerData))

    const isPwdValidate = inputValidate({ inputData: pwdState.pwdValue, dataType: 'pwd' })
    switch (props.title) {
      case REGISTER_CONFIRM_PWD:
        if (isCheck) {
          if (pwdState.pwdValue !== pwdState.pwdConfirmValue) {
            setErrMsg('비밀번호가 다릅니다.')
          } else {
            if (!isPwdValidate) {
              setErrMsg('8글자 이상의 영어대소문자, 특수문자, 숫자를 포함한 문자열을 입력해주세요.')
            } else {
              setErrorState({
                isError: false,
                description: '',
              })
            }
          }
        }
    }
  }, [useInput.value, pwdState.pwdValue, pwdState.pwdConfirmValue, dispatch])

  return (
    <>
      <InputLabel title={props.title} />
      <div className="flex relative mt-2 mb-3">
        <InputIconlabel icon={props.icon} />
        <input
          type={props.isInputValueView ? 'text' : 'password'}
          autoComplete="off"
          value={useInput.value}
          onChange={useInput.onChange}
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900  block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
          placeholder={props.placeholder}
          maxLength={20}
        />
        <button
          type="submit"
          className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-gray-50 rounded-e-lg border dark:border-gray-600 hover:bg-indigo-200  dark:bg-gray-700 dark:hover:bg-indigo-400 "
          onClick={() => {
            props.setIsInputValueView(!props.isInputValueView)
          }}
        >
          {!props.isInputValueView ? (
            <IoMdEye className="w-4 h-4 text-black dark:text-white" />
          ) : (
            <IoMdEyeOff className="w-4 h-4 text-black dark:text-white" />
          )}
        </button>
      </div>

      {props.title === REGISTER_CONFIRM_PWD &&
      errorState.isError &&
      pwdState.pwdValue !== '' &&
      pwdState.pwdConfirmValue !== '' ? (
        <div className="mb-6">
          <ErrorAlert description={errorState.description} handleClickError={handleClickError} />
        </div>
      ) : (
        <> </>
      )}
    </>
  )
}
