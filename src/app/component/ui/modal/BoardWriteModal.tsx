'use client'
import React, { useRef, useState } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { IoClose } from 'react-icons/io5'

import BoardWriteAlert from '../alert/BoardWriteAlert'
import BoardWriteModalCheckBox from '../checkbox/BoardWriteModalCheckBox'
import BoardModalInputGroup from '../input/board/BoardModalInputGroup'

import { FALSE, KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE, TRUE } from '@/app/constant/constant'
import { ERR_EMPTRY_POSTING_FIELD, errNotEntered } from '@/app/constant/errorMsg'
import { API_URL_POSTINGS_ORG } from '@/app/constant/route/api-route-constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { openBoardWriteModalReducer } from '@/app/store/reducers/board/openBoardWriteModalReducer'
import { type ApiRes, type FailResponseType, type FetchResponseType } from '@/app/types/moduleTypes'
import { type BoardWriteModalprops } from '@/app/types/ui/modalTypes'

const Editor = dynamic(async () => import('../editor/TextEditor'), {
  ssr: false,
})

export default function BoardWriteModal(props: BoardWriteModalprops) {
  const dispatch = useAppDispatch()
  const params = useAppSelector((state) => state.boardCategory.category)
  const router = useRouter()
  const editorRef = useRef(null)
  const titleInput = useInput('')
  const userInfo = useAppSelector((state) => state.userInfo)
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const [isAnnounce, setIsAnnounce] = useState(FALSE)
  const [editorContent, setEditorContent] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imgCount, setImgCount] = useState<number>(0)
  const [alertState, setAlertState] = useState({
    headDescription: '',
    additianoalDescription: '',
    option: {
      positive: '',
      negative: '',
    },
  })

  const countImgFiles = () => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(editorContent, 'text/html')
    const imgTags = doc.querySelectorAll('img')
    setImgCount(imgTags.length)
    return imgCount
  }
  const handleModalState = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleClick = () => {
    if (isAnnounce === FALSE) setIsAnnounce(TRUE)
    else setIsAnnounce(FALSE)
  }

  const convertBoardCategory = (): number => {
    switch (params) {
      case '공지사항':
        return 1
      default:
        return 0
    }
  }

  const fetchPostContent = async () => {
    try {
      const boardCategory = convertBoardCategory()
      const fetchProps = {
        data: { boardId: boardCategory, content: editorContent, title: titleInput.value },
        fetchUrl: API_URL_POSTINGS_ORG,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: userInfo[KEY_X_ORGANIZATION_CODE],
        },
      }

      const res = await modulePostFetch<FetchResponseType<ApiRes>>(fetchProps)

      if (res.status !== 200) throw new Error((res as FailResponseType).message)

      dispatch(openBoardWriteModalReducer())
      alert('글이 정상적으로 등록되었습니다.')
      // TODO:  FIXME: checkList - 10

      router.refresh()
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case ERR_EMPTRY_POSTING_FIELD:
            alert(errNotEntered('필수항목'))
            break
        }
      }
    }
  }

  const handleClickPosting = () => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(editorContent, 'text/html')
    const isContentEmpty = doc.body.textContent?.trim() === ''
    if (titleInput.value === '' || isContentEmpty) {
      alert('제목과 내용은 필수 입력항목입니다.')
      return
    }
    setAlertState({
      headDescription: '게시글을 등록하시겠습니까?',
      additianoalDescription: '확인버튼을 누르면 게시글이 등록됩니다.',
      option: {
        positive: '확인',
        negative: '취소',
      },
    })
    setIsModalOpen(true)
  }

  return (
    <>
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="absolute top-20 left-20 right-20 p-4 w-5/6">
          <div className="relative rounded-lg shadow dark:bg-gray-700 border-solid border-2 border-indigo-300 bg-white">
            <div className="flex flex-row justify-between items-center border-b rounded-t dark:border-gray-600 w-full p-3">
              <div className="w-1/6 text-center">
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="static-modal"
                  onClick={props.onClick}
                >
                  <IoClose className="w-4 h-4" />
                </button>
              </div>
              <div className="w-2/3 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">게시글 설정</h3>
              </div>
              <div className="w-2/5 flex flex-row items-center justify-around">
                <button className="mt-3 mb-3 w-2/5 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75">
                  임시저장
                </button>
                <button
                  className="mt-3 mb-3 w-2/5 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75"
                  onClick={handleClickPosting}
                >
                  등록
                </button>
              </div>
            </div>
            <div className="p-2 flex flex-row w-full">
              <BoardModalInputGroup titleInput={titleInput} />
              <div className="w-2/3 bg-gray-100 dark:bg-gray-300 dark:text-black">
                <Editor
                  editorContent={editorContent}
                  setEditorContent={setEditorContent}
                  editorRef={editorRef}
                  countImgFiles={countImgFiles}
                />
              </div>
            </div>
            <BoardWriteModalCheckBox isAnnounce={isAnnounce} handleClick={handleClick} />
            {isModalOpen ? (
              <BoardWriteAlert
                handleModalState={handleModalState}
                alertState={alertState}
                fetchPost={fetchPostContent}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
