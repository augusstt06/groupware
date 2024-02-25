'use client'

import { type ChangeEvent, useState } from 'react'

import { AiOutlinePicture } from 'react-icons/ai'

import { Label } from '../../../label/Label'
import Input from '../../Input'

import {
  API_SUCCESS_CODE,
  BOARD_MODAL_AUTHOR,
  BOARD_MODAL_EMAIL,
  BOARD_MODAL_TITLE,
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
} from '@/app/constant/constant'
import { API_URL_UPLOAD_IMG } from '@/app/constant/route/api-route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { modulePostFileFetch } from '@/app/module/utils/moduleFetch'
import {
  type FailResponseType,
  type ModulePostFileFetchProps,
  type SuccessResponseType,
} from '@/app/types/module'
import { type BoardCategoryInputProps, type BoardModalInputGruopProps } from '@/app/types/ui/input'

export default function BoardModalInputGroup(props: BoardModalInputGruopProps) {
  const userInfo = useAppSelector((state) => state.userInfo)
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const [imgTag, setImgTag] = useState<JSX.Element | null>(null)

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      props.setThumbNailUrl((res as SuccessResponseType<string>).result)
      const imgUrl = (res as SuccessResponseType<string>).result
      const img = (
        <>
          <img src={imgUrl} alt="thumbnail" contentEditable="false" />
        </>
      )

      setImgTag(img)
    } catch (err) {}
  }

  const handleUploadThumbmnail = (e: ChangeEvent<HTMLInputElement>) => {
    void uploadThumbnail(e)
  }

  const inputList = [
    {
      title: BOARD_MODAL_TITLE,
      value: props.titleInput.value,
      onchange: props.titleInput.onChange,
      placeholder: '게시글 제목을 입력해주세요',
      readonly: false,
    },
    {
      title: BOARD_MODAL_AUTHOR,
      value: userInfo.extraInfo.name,
      onchange: () => {},
      placeholder: '이름을 입력해주세요',
      readonly: true,
    },
    {
      title: BOARD_MODAL_EMAIL,
      value: userInfo.extraInfo.email,
      onchange: () => {},
      placeholder: '이메일을 입력해주세요',
      readonly: true,
    },
  ]

  return (
    <div className="w-1/3 h-full p-2 mb-5">
      <BoardCategoryInput
        currentBoard={props.currentBoard}
        handleSelectChange={handleSelectChange}
        select={props.select}
        selectList={props.selectList}
      />
      {inputList.map((data) => (
        <div className="p-2" key={data.title}>
          <Label title={data.title} />
          {data.readonly ? (
            <Input
              isLabel={false}
              type="text"
              value={data.value}
              onChange={data.onchange}
              className="rounded rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={data.placeholder}
              readOnly
            />
          ) : (
            <Input
              isLabel={false}
              type="text"
              value={data.value}
              onChange={data.onchange}
              className="rounded rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={data.placeholder}
            />
          )}
        </div>
      ))}
      <div className="p-2 h-40 ">
        <div className="flex flex-row items-center">
          <Label title="썸네일" />

          {imgTag === null ? (
            <label htmlFor="imginput" className="mb-2 ml-3 flex flex-row items-center">
              <AiOutlinePicture className="w-4 h-4 cursor-pointer" />
              <input
                type="file"
                id="imginput"
                onChange={handleUploadThumbmnail}
                className="hidden"
              />
            </label>
          ) : (
            <></>
          )}
        </div>
        <div className="h-full flex border-2 dark:border-white-500 justify-center items-center truncate">
          {imgTag ?? (
            <label htmlFor="imginput" className="text-gray-400">
              <AiOutlinePicture className="w-10 h-10 cursor-pointer" />
              <input
                type="file"
                id="imgInput"
                onChange={handleUploadThumbmnail}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  )
}

function BoardCategoryInput(props: BoardCategoryInputProps) {
  const { currentBoard } = props
  return (
    <div className="p-2">
      {props.currentBoard !== null ? (
        <Input
          isLabel={true}
          labelClassName="block mb-2 md:text-sm text-xs md:font-bold text-gray-900 dark:text-white"
          labelContent="게시판"
          type="text"
          value={currentBoard?.name}
          className="rounded rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:outline-none block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  bg-gray-400 dark:bg-gray-600 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="게시글 제목을 입력해주세요."
          readOnly
        />
      ) : (
        <>
          <Label title="게시판" />
          <select
            id="boardCategory"
            onChange={props.handleSelectChange}
            value={props.select}
            className="appearance-none rounded rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="none">글 카테고리를 골라주세요</option>
            {props.selectList.map((data) => (
              <option value={data.id} key={data.name}>
                {data.name}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  )
}
