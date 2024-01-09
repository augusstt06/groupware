'use client'
import React, { useEffect, useRef, useState } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

import BoardWriteAlert from '../alert/BoardWriteAlert'
import WriteModalBtnGroup from '../button/board/writeModal/WriteModalBtnGroup'
import BoardWriteModalCheckBox from '../checkbox/BoardWriteModalCheckBox'
import BoardModalInputGroup from '../input/board/BoardModalInputGroup'
import BoardModalSaveListTab from '../tab/BoardModalSaveListTab'

import { FALSE, KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE, TRUE } from '@/app/constant/constant'
import { ERR_EMPTRY_POSTING_FIELD, errNotEntered } from '@/app/constant/errorMsg'
import {
  API_URL_POSTINGS_ORG,
  API_URL_POSTINGS_PENDING,
} from '@/app/constant/route/api-route-constant'
import { ROUTE_POSTING_DETAIL } from '@/app/constant/route/route-constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleCheckContentIsEmpty } from '@/app/module/utils/moduleCheckContent'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch, modulePostFetch } from '@/app/module/utils/moduleFetch'
import { openBoardWriteModalReducer } from '@/app/store/reducers/board/openBoardWriteModalReducer'
import {
  type ApiRes,
  type FailResponseType,
  type ModuleCheckContentIsEmptyProps,
  type ModuleGetFetchProps,
  type ModulePostFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import { type BoardWriteModalprops } from '@/app/types/ui/modalTypes'
import { type boardListResponsetype, type resType } from '@/app/types/variableTypes'

const Editor = dynamic(async () => import('../editor/TextEditor'), {
  ssr: false,
})

export default function BoardWriteModal(props: BoardWriteModalprops) {
  const [boardCategoryNumber, setBoardCategoryNumber] = useState<number>(0)
  const dispatch = useAppDispatch()
  const params = useAppSelector((state) => state.boardCategory.category)
  const router = useRouter()
  const editorRef = useRef(null)
  const titleInput = useInput('')
  const userId = useAppSelector((state) => state.userInfo.extraInfo.userId)
  const userInfo = useAppSelector((state) => state.userInfo)
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const [isSave, setIsSave] = useState<boolean>(false)
  const [isAnnounce, setIsAnnounce] = useState(FALSE)
  const [editorContent, setEditorContent] = useState('')
  const [saveContent, setSaveContent] = useState('')
  const [saveList, setSaveList] = useState<boardListResponsetype[]>([])

  const [isOpenSaveList, setIsOpenSaveList] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [imgCount, setImgCount] = useState<number>(0)
  const [select, setSelect] = useState('')
  const selectList = [{ title: '공지사항' }, { title: '프로젝트' }]
  const [alertState, setAlertState] = useState({
    headDescription: '',
    additianoalDescription: '',
    option: {
      positive: '',
      negative: '',
    },
    isFetch: false,
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

  const convertBoardCategory = (title: string): number => {
    switch (title) {
      case '공지사항':
        return 1
      default:
        return 0
    }
  }
  const fetchGetPostPending = async () => {
    try {
      const fetchProps: ModuleGetFetchProps = {
        params: {
          limit: 10,
          offset: 0,
          writerId: userId,
        },
        fetchUrl: API_URL_POSTINGS_PENDING,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: userInfo[KEY_X_ORGANIZATION_CODE],
        },
      }
      const res = await moduleGetFetch<resType>(fetchProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      const postingList = (res as SuccessResponseType<resType>).result.postings
      setSaveList(postingList)
    } catch (err) {}
  }

  const fetchPostPending = async () => {
    try {
      const fetchProps: ModulePostFetchProps = {
        data: {
          writerId: userId,
          content: editorContent,
          title: titleInput.value,
        },
        fetchUrl: API_URL_POSTINGS_PENDING,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: userInfo[KEY_X_ORGANIZATION_CODE],
        },
      }
      const res = await modulePostFetch<ApiRes>(fetchProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      dispatch(openBoardWriteModalReducer())
      setIsSave(false)
    } catch (err) {}
  }

  const handleClickPostPending = () => {
    const moduleProps: ModuleCheckContentIsEmptyProps = {
      boardId: boardCategoryNumber,
      editorContents: editorContent,
      inputValue: titleInput.value,
      setAlertStateFunction: setAlertState,
      setIsModalOpenFunction: setIsModalOpen,
      success: {
        headDescription: '게시글을 임시저장하시겠습니까?',
        additianoalDescription: '확인버튼을 누르면 게시글이 저장됩니다.',
      },
    }
    moduleCheckContentIsEmpty(moduleProps)
    setIsSave(true)
    handleModalState()
  }
  const fetchPostContent = async () => {
    try {
      const fetchProps: ModulePostFetchProps = {
        data: { boardId: boardCategoryNumber, content: editorContent, title: titleInput.value },
        fetchUrl: API_URL_POSTINGS_ORG,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: userInfo[KEY_X_ORGANIZATION_CODE],
        },
      }

      const res = await modulePostFetch<ApiRes>(fetchProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      const detailUrl = (res as SuccessResponseType<ApiRes>).result.id
      dispatch(openBoardWriteModalReducer())
      alert('글이 정상적으로 등록되었습니다.')
      // TODO:  FIXME: checkList - 10

      router.push(`${ROUTE_POSTING_DETAIL}/${detailUrl}`)
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
  const handleClickOpenSaveList = () => {
    setIsOpenSaveList(!isOpenSaveList)
  }
  const loadSaveData = (data: boardListResponsetype) => {
    setSaveContent(data.content)
    titleInput.setString(data.title)
    setIsOpenSaveList(false)
  }

  const handleClickPosting = () => {
    if (boardCategoryNumber === 0) {
      setAlertState({
        headDescription: '게시판 카테고리를 선택해 주세요',
        additianoalDescription: '',
        option: {
          positive: '확인',
          negative: '',
        },
        isFetch: false,
      })
      handleModalState()
      return
    }

    const moduleProps: ModuleCheckContentIsEmptyProps = {
      boardId: boardCategoryNumber,
      editorContents: editorContent,
      inputValue: titleInput.value,
      setAlertStateFunction: setAlertState,
      setIsModalOpenFunction: setIsModalOpen,
      success: {
        headDescription: '게시글을 등록하시겠습니까?',
        additianoalDescription: '확인버튼을 누르면 게시글이 등록됩니다.',
      },
    }
    moduleCheckContentIsEmpty(moduleProps)
  }
  useEffect(() => {
    if (params === '') {
      setBoardCategoryNumber(convertBoardCategory(select))
    } else {
      setBoardCategoryNumber(convertBoardCategory(params))
    }
    void fetchGetPostPending()
  }, [select, params])
  return (
    <>
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center items-center w-full h-full"
      >
        <div className="absolute top-20 left-20 right-20 p-4 w-5/6">
          <div className="relative rounded-lg shadow dark:bg-gray-700 border-solid border-2 border-indigo-300 bg-white">
            <WriteModalBtnGroup
              handleClickOpenSaveList={handleClickOpenSaveList}
              handleClickPostPending={handleClickPostPending}
              handleClickClose={props.onClick}
              handleClickPosting={handleClickPosting}
              saveList={saveList}
            />
            <div className="p-2 flex flex-row w-full">
              <BoardModalInputGroup
                titleInput={titleInput}
                select={select}
                setSelect={setSelect}
                selectList={selectList}
              />
              <div className="w-2/3 bg-gray-100 dark:bg-gray-300 dark:text-black">
                <Editor
                  saveContent={saveContent}
                  editorContent={editorContent}
                  setEditorContent={setEditorContent}
                  editorRef={editorRef}
                  countImgFiles={countImgFiles}
                />
              </div>
              {isOpenSaveList ? (
                <BoardModalSaveListTab saveList={saveList} loadSaveData={loadSaveData} />
              ) : (
                <></>
              )}
            </div>
            <BoardWriteModalCheckBox isAnnounce={isAnnounce} handleClick={handleClick} />
            {isModalOpen ? (
              <BoardWriteAlert
                handleModalState={handleModalState}
                alertState={alertState}
                fetchPost={isSave ? fetchPostPending : fetchPostContent}
                boardCategoryNumber={boardCategoryNumber}
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
