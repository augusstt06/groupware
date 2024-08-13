'use client'
import { useEffect } from 'react'

import Input from '@/components/input/Input'
import { API_SUCCESS_CODE } from '@/constant/constant'
import useInput from '@/module/hooks/reactHooks/useInput'
import { useAppSelector } from '@/module/hooks/reduxHooks'
import { modulePatchFetch } from '@/module/utils/fetch'
import { createAccessTokenManager } from '@/module/utils/token'
import { type FailResponseType } from '@/types/module'

type Props = {
  updateClickEvent: (fetchFn: () => void) => void
}
const ChangePwd = (props: Props) => {
  const { updateClickEvent } = props
  const user = useAppSelector((state) => state.userInfo.extraInfo)
  const { getAccessToken } = createAccessTokenManager
  const currentPwd = useInput('')
  const newPwd = useInput('')
  const confirmPwd = useInput('')
  const isInputValueEmpty =
    currentPwd.value.length === 0 || newPwd.value.length === 0 || confirmPwd.value.length === 0
  const inputList = [
    { labelContent: '현재 비밀번호', input: currentPwd },
    { labelContent: '새 비밀번호', input: newPwd },
    { labelContent: '비밀번호 확인', input: confirmPwd },
  ]
  const patchPassword = async () => {
    try {
      const API_ENDPOINT = process.env.NEXT_PUBLIC_RESET_PWD_SOURCE
      const patchData = {
        email: user.email,
        oldPassword: currentPwd.value,
        password: newPwd.value,
        passwordConfirm: confirmPwd.value,
      }
      const res = await modulePatchFetch<string>({
        data: patchData,
        fetchUrl: API_ENDPOINT,
        header: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message)
      }
    }
  }
  const handleClickChangePwd = () => {
    if (isInputValueEmpty) {
      alert('필수항목을 다 입력하지 않았습니다.')
      return
    }
    void patchPassword()
  }

  useEffect(() => {
    updateClickEvent(() => handleClickChangePwd)
  }, [])
  return (
    <>
      <h1 className="text-xl font-bold">비밀번호 변경</h1>
      <section className="w-full grid grid-rows-3 gap-4 place-items-center">
        {inputList.map((data) => (
          <div key={data.labelContent} className="justify-start sort-vertical-flex">
            <Input
              isLabel={true}
              labelContent={data.labelContent}
              value={data.input.value}
              onChange={data.input.onChange}
              labelClassName="mr-2"
              className="pt-1 pb-1 pl-2 pr-2 border-2 border-indigo-300 rounded-lg w-60 "
            />
          </div>
        ))}
      </section>
    </>
  )
}
export default ChangePwd
