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
  KEY_X_ORGANIZATION_CODE,
  LABEL,
} from '@/constant/constant'
import { API_URL_UPLOAD_IMG } from '@/constant/route/api-route-constant'
import { useAppSelector } from '@/module/hooks/reduxHooks'
import { modulePostFileFetch } from '@/module/utils/moduleFetch'
import { createAccessTokenManager } from '@/module/utils/token'
import {
  type FailResponseType,
  type ModulePostFileFetchProps,
  type SuccessResponseType,
} from '@/types/module'
import { type BoardCategoryInputProps, type BoardModalInputGruopProps } from '@/types/ui/input'

export default function BoardModalInputGroup(props: BoardModalInputGruopProps) {
  const { currentBoard, titleInput, select, setSelect, setThumbNailUrl, selectList } = props
  const userInfo = useAppSelector((state) => state.userInfo)
  const { getAccessToken } = createAccessTokenManager
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const [imgTag, setImgTag] = useState<JSX.Element | null>(null)

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value)
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
          Authorization: `Bearer ${getAccessToken()}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res = await modulePostFileFetch<string>(fetchImgProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      setThumbNailUrl((res as SuccessResponseType<string>).result)
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
      value: titleInput.value,
      onchange: titleInput.onChange,
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
        currentBoard={currentBoard}
        handleSelectChange={handleSelectChange}
        select={select}
        selectList={selectList}
      />
      {inputList.map((data) => (
        <div className="p-2" key={data.title}>
          <Label category={LABEL} childs={data.title} />
          {data.readonly ? (
            <Input
              isLabel={false}
              type="text"
              value={data.value}
              onChange={data.onchange}
              className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-[#505050] dark:border-white-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={data.placeholder}
              readOnly
            />
          ) : (
            <Input
              isLabel={false}
              type="text"
              value={data.value}
              onChange={data.onchange}
              className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-[#505050] dark:border-white-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={data.placeholder}
            />
          )}
        </div>
      ))}
      <div className=" h-40 p-2">
        <div className="sort-row-flex">
          <Label category={LABEL} childs={'썸네일'} />

          {imgTag === null ? (
            <label htmlFor="imginput" className="sort-row-flex mb-2 ml-3">
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
        <div className="dark:border-white-500 flex items-center justify-center h-full truncate border-2">
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
  const { currentBoard, handleSelectChange, select, selectList } = props
  return (
    <div className="p-2">
      {currentBoard !== null ? (
        <Input
          isLabel={true}
          labelClassName="block mb-2 md:text-sm text-xs md:font-bold text-gray-900 dark:text-white"
          labelContent="게시판"
          type="text"
          value={currentBoard?.name}
          className="rounded-lg border text-gray-900 focus:ring-blue-500 focus:outline-none block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  bg-gray-400 dark:bg-[#505050] dark:border-white-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="게시글 카테고리를 입력해주세요."
          readOnly
        />
      ) : (
        <>
          <Label category={LABEL} childs={'게시판'} />
          <select
            id="boardCategory"
            onChange={handleSelectChange}
            value={select}
            className="appearance-none rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-[#505050] dark:border-white-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="none">글 카테고리를 골라주세요</option>
            {selectList.map((data) => (
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
