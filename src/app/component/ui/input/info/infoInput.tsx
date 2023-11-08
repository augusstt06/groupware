import { InputIconlabel } from '../../label/InputIconlabel'
import { InputLabel } from '../../label/Inputlabel'

import { useInput } from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import inputValidate from '@/app/module/utils/inputValidate'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import { emailReducer } from '@/app/store/reducers/loginInfoReducer'
import { type InfoInputProps } from '@/app/types'

export default function InfoInput(props: InfoInputProps) {
  const dispatch = useAppDispatch()
  const inputData = useInput('')
  const isCheck = useAppSelector((state) => {
    switch (props.title) {
      case 'Email':
        return state.loginInfo.email.isCheck
      case 'Name':
        return state.loginInfo.name.isCheck
      case 'Teams':
        return state.loginInfo.team.isCheck
      case 'PhoneNumber':
        return state.loginInfo.phoneNumber.isCheck
    }
  })

  const fetchProps = {
    data: inputData.value,
    fetchUrl: process.env.NEXT_PUBLIC_EMAIL_REQ_SOURCE,
  }

  const inputValidateProps = {
    inputData: inputData.value,
    dataType: 'email',
  }

  const fetchInputAvaiable = async () => {
    const isValid = inputValidate(inputValidateProps)
    if (!isValid) return
    if (isCheck ?? false) {
      dispatch(emailReducer({ isCheck: false, value: '' }))
      inputData.value = ''
      return
    }
    const res = await moduleGetFetch(fetchProps)
    console.log(res)
    if (props.title === 'Email') {
      dispatch(emailReducer({ isCheck: true, value: inputData.value }))
    }
    alert('이메일 확인이 완료되었습니다.')
  }
  const handleChangeInputCheckbox = () => {
    fetchInputAvaiable().catch((err) => {
      console.log(err)
      alert('다른 이메일을 사용해 주세요.')
    })
  }

  return (
    <>
      <InputLabel title={props.title} />
      <div className="flex relative mt-2 mb-6">
        <InputIconlabel icon={props.icon} />
        <input
          type="text"
          {...inputData}
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />

        {props.checkValid ? (
          <div className="absolute inset-y-0 right-4 flex items-center pl-3.5">
            <input
              type="checkbox"
              className="cursor-pointer w-5 h-5"
              checked={isCheck}
              onChange={handleChangeInputCheckbox}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
