'use client'

import { type ChangeEvent, useState } from 'react'

import { InputLabel } from '../../label/Inputlabel'

import { KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '@/app/constant/constant'
import { API_URL_UPLOAD_IMG } from '@/app/constant/route/api-route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { modulePostFileFetch } from '@/app/module/utils/moduleFetch'
import {
  type FailResponseType,
  type ModulePostFileFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import { type BoardModalInputGruopProps } from '@/app/types/ui/inputTypes'

export default function BoardModalInputGroup(props: BoardModalInputGruopProps) {
  const userInfo = useAppSelector((state) => state.userInfo)
  const params = useAppSelector((state) => state.boardCategory.category)
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const [imgTag, setImgTag] = useState<JSX.Element | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.setSelect(e.target.value)
  }

  const uploadThumbnail = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      const formData: FormData = new FormData()
      formData.append('thumbnail', file as File)
      const fetchImgProps: ModulePostFileFetchProps = {
        file: formData,
        fetchUrl: API_URL_UPLOAD_IMG,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res = await modulePostFileFetch<string>(fetchImgProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      props.setThumbNailUrl((res as SuccessResponseType<string>).result)
      const imgUrl = (res as SuccessResponseType<string>).result
      const img = (
        <>
          <img src={imgUrl} alt="thumbnail" contentEditable="false" />
          <input type="file" id="imginput" onChange={handleUploadThumbmnail} className="hidden" />
        </>
      )

      setImgTag(img)
    } catch (err) {}
  }

  const handleUploadThumbmnail = (e: ChangeEvent<HTMLInputElement>) => {
    void uploadThumbnail(e)
  }
  return (
    <div className="w-1/3 h-full p-2 mb-5">
      <div className="p-2">
        <InputLabel title="게시판" />
        {params !== '' ? (
          <input
            type="text"
            value={params}
            className="rounded rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  bg-gray-400 dark:bg-gray-600 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="게시글 제목을 입력해주세요"
            readOnly
          />
        ) : (
          <select
            id="boardCategory"
            onChange={handleChange}
            value={props.select}
            className="appearance-none rounded rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="none">글 카테고리를 골라주세요</option>
            {props.selectList.map((data) => (
              <option value={data.title} key={data.title}>
                {data.title}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="p-2">
        <InputLabel title="제목" />
        <input
          type="text"
          value={props.titleInput.value}
          onChange={props.titleInput.onChange}
          className="rounded rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="게시글 제목을 입력해주세요"
        />
      </div>
      <div className="p-2">
        <InputLabel title="작성자" />
        <input
          type="text"
          value={userInfo.extraInfo.name}
          className="rounded rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  bg-gray-400 dark:bg-gray-600 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="이름을 입력해주세요"
          readOnly
        />
      </div>
      <div className="p-2">
        <InputLabel title="이메일" />
        <input
          type="text"
          value={userInfo.extraInfo.email}
          className="rounded rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  bg-gray-400 dark:bg-gray-600 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="이메일을 입력해주세요"
          readOnly
        />
      </div>
      <div className="p-2 h-40 ">
        <InputLabel title="썸네일" />
        <div className="h-full flex border-2 dark:border-white-500 justify-center items-center truncate">
          <label htmlFor="imginput">
            {imgTag ?? (
              <>
                <span>+ 이미지 업로드</span>
                <input
                  type="file"
                  id="imginput"
                  onChange={handleUploadThumbmnail}
                  className="hidden"
                />
              </>
            )}
          </label>
        </div>
      </div>
    </div>
  )
}
