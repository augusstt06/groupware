'use client'
import React, { useEffect, useRef, useState } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

import BoardWriteAlert from '../../alert/BoardWriteAlert'
import WriteModalBtnGroup from '../../button/board/writeModal/WriteModalBtnGroup'
import BoardWriteModalCheckBox from '../../checkbox/BoardWriteModalCheckBox'
import BoardModalInputGroup from '../../input/board/BoardModalInputGroup'
import BoardModalSaveListTab from '../../tab/board/BoardModalSaveListTab'

import {
  API_SUCCESS_CODE,
  FALSE,
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
  TRUE,
} from '@/app/constant/constant'
import { ERR_EMPTRY_POSTING_FIELD, errNotEntered } from '@/app/constant/errorMsg'
import { API_URL_POSTINGS, API_URL_POSTINGS_PENDING } from '@/app/constant/route/api-route-constant'
import { ROUTE_POSTING_DETAIL } from '@/app/constant/route/route-constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleCheckContentIsEmpty } from '@/app/module/utils/moduleCheckContent'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleDeleteFetch, moduleGetFetch, modulePostFetch } from '@/app/module/utils/moduleFetch'
import { openBoardWriteModalReducer } from '@/app/store/reducers/board/openBoardWriteModalReducer'
import {
  type ApiResponseType,
  type FailResponseType,
  type ModuleCheckContentIsEmptyProps,
  type ModuleGetFetchProps,
  type ModulePostFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import { type BoardWriteModalprops } from '@/app/types/ui/modalTypes'
import {
  type AlertStateType,
  type BoardListResponsetype,
  type BoardResponseType,
} from '@/app/types/variableTypes'

const Editor = dynamic(async () => import('../../editor/TextEditor'), {
  ssr: false,
})

export default function BoardWriteModal(props: BoardWriteModalprops) {
  const dispatch = useAppDispatch()
  const myBoardState = useAppSelector((state) => state.boardCategory.myBoard)
  const router = useRouter()
  const editorRef = useRef(null)
  const titleInput = useInput('')
  const userId = useAppSelector((state) => state.userInfo.extraInfo.userId)
  const userInfo = useAppSelector((state) => state.userInfo)
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const [isAnnounce, setIsAnnounce] = useState(FALSE)
  const [editorContent, setEditorContent] = useState('')
  const [thumbNailUrl, setThumbNailUrl] = useState<string>('')
  const [saveContent, setSaveContent] = useState('')
  const [saveList, setSaveList] = useState<BoardListResponsetype[]>([])
  const [rerender, setRerender] = useState<boolean>(false)

  const [isOpenSaveList, setIsOpenSaveList] = useState<boolean>(false)
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false)
  const [imgCount, setImgCount] = useState<number>(0)
  const [select, setSelect] = useState('0')
  const selectList = myBoardState.map((data) => ({ id: data.id, name: data.name }))

  const [alertState, setAlertState] = useState<AlertStateType>({
    headDescription: '',
    additianoalDescription: '',
    option: {
      positive: '',
      negative: '',
    },
    onClick: () => {},
    isPromise: false,
  })

  const countImgFiles = () => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(editorContent, 'text/html')
    const imgTags = doc.querySelectorAll('img')
    setImgCount(imgTags.length)
    return imgCount
  }

  const openAlertModal = () => {
    setIsAlertModalOpen(true)
  }
  const closeAlertModal = () => {
    setIsAlertModalOpen(false)
  }

  const handleClick = () => {
    if (isAnnounce === FALSE) setIsAnnounce(TRUE)
    else setIsAnnounce(FALSE)
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
      const res = await moduleGetFetch<BoardResponseType>(fetchProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      const postingList = (res as SuccessResponseType<BoardResponseType>).result.data
      setSaveList(postingList)
    } catch (err) {}
  }
  const fetchDeletePostPending = async (id: number) => {
    try {
      const fetchProps: ModuleGetFetchProps = {
        params: {
          postingId: id,
        },
        fetchUrl: API_URL_POSTINGS_PENDING,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: userInfo[KEY_X_ORGANIZATION_CODE],
        },
      }
      const res = await moduleDeleteFetch<string>(fetchProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      setRerender(!rerender)
    } catch (err) {
      alert('삭제에 실패했습니다.')
    }
  }
  const handleClickDeletePending = (id: number) => {
    void fetchDeletePostPending(id)
    setIsOpenSaveList(false)
  }
  const fetchPostPending = async () => {
    try {
      const fetchProps: ModulePostFetchProps = {
        data: {
          // writerId: userId,
          content: editorContent,
          title: titleInput.value,
          boardId: Number(select),
        },
        fetchUrl: API_URL_POSTINGS_PENDING,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: userInfo[KEY_X_ORGANIZATION_CODE],
        },
      }

      const res = await modulePostFetch<ApiResponseType>(fetchProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      setIsAlertModalOpen(false)
      setRerender(!rerender)
    } catch (err) {}
  }

  const handleClickPostPending = () => {
    if (saveList.length >= 10) {
      setAlertState({
        headDescription: '게시글의 임시저장은 10개까지 가능합니다.',
        additianoalDescription: '',
        option: {
          positive: '확인',
          negative: '',
        },
        onClick: closeAlertModal,
        isPromise: false,
      })
      openAlertModal()
      return
    }
    const moduleProps: ModuleCheckContentIsEmptyProps = {
      fetchFunction: fetchPostPending,
      boardId: Number(select),
      editorContents: editorContent,
      inputValue: titleInput.value,
      setAlertStateFunction: setAlertState,
      handleOpenAlertModal: openAlertModal,
      handleCloseAlertModal: closeAlertModal,
      success: {
        headDescription: '게시글을 임시저장하시겠습니까?',
        additianoalDescription: '확인버튼을 누르면 게시글이 저장됩니다.',
      },
    }
    moduleCheckContentIsEmpty(moduleProps)
    openAlertModal()
  }

  const fetchPostContent = async () => {
    try {
      const fetchProps: ModulePostFetchProps = {
        data: {
          thumbnail: thumbNailUrl,
          boardId: props.currentBoard === null ? Number(select) : props.currentBoard.id,
          content: editorContent,
          title: titleInput.value,
        },
        fetchUrl: API_URL_POSTINGS,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: userInfo[KEY_X_ORGANIZATION_CODE],
        },
      }
      const res = await modulePostFetch<number>(fetchProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      const postingId = (res as SuccessResponseType<number>).result

      dispatch(openBoardWriteModalReducer())
      alert('글이 정상적으로 등록되었습니다.')
      setRerender(!rerender)
      router.push(`${ROUTE_POSTING_DETAIL}/${postingId.toString()}`)
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
  const loadSaveData = (data: BoardListResponsetype) => {
    setSelect(data.boardId.toString())
    setSaveContent(data.content)
    titleInput.setString(data.title)
    setIsOpenSaveList(false)
  }

  const handleClickPosting = () => {
    if (props.currentBoard === null) {
      if (select === '') {
        setAlertState({
          headDescription: '게시판 카테고리를 선택해 주세요',
          additianoalDescription: '',
          option: {
            positive: '확인',
            negative: '',
          },
          onClick: closeAlertModal,
          isPromise: false,
        })
        openAlertModal()
        return
      }
      const moduleProps: ModuleCheckContentIsEmptyProps = {
        fetchFunction: fetchPostContent,
        boardId: Number(select),
        editorContents: editorContent,
        inputValue: titleInput.value,
        setAlertStateFunction: setAlertState,
        handleOpenAlertModal: openAlertModal,
        handleCloseAlertModal: closeAlertModal,
        success: {
          headDescription: '게시글을 등록하시겠습니까?',
          additianoalDescription: '확인버튼을 누르면 게시글이 등록됩니다.',
        },
      }
      moduleCheckContentIsEmpty(moduleProps)
    } else {
      const moduleProps: ModuleCheckContentIsEmptyProps = {
        fetchFunction: fetchPostContent,
        boardId: Number(props.currentBoard.id),
        editorContents: editorContent,
        inputValue: titleInput.value,
        setAlertStateFunction: setAlertState,
        handleOpenAlertModal: openAlertModal,
        handleCloseAlertModal: closeAlertModal,
        success: {
          headDescription: '게시글을 등록하시겠습니까?',
          additianoalDescription: '확인버튼을 누르면 게시글이 등록됩니다.',
        },
      }
      moduleCheckContentIsEmpty(moduleProps)
    }
  }

  const allModalClose = () => {
    closeAlertModal()
    dispatch(openBoardWriteModalReducer())
  }
  const handleClickClose = () => {
    if (editorContent !== '' || titleInput.value !== '') {
      setAlertState({
        headDescription: '작성중인 내용이 있습니다. 나가시겠습니까?',
        additianoalDescription:
          '임시저장 혹은 등록하지 않고 페이지를 벗어날경우 지금까지 작성한 내용이 사라집니다.',
        option: {
          positive: '저장하지 않고 나가기',
          negative: '취소',
        },
        onClick: allModalClose,
        isPromise: false,
      })
      openAlertModal()
      return
    }
    dispatch(openBoardWriteModalReducer())
  }

  useEffect(() => {
    void fetchGetPostPending()
  }, [rerender, select])

  return (
    <>
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-blur-xs"
      >
        <div className="relative p-4 w-5/6">
          <div className="relative rounded-lg shadow dark:bg-gray-700 border-solid border-2 border-indigo-300 bg-white">
            <WriteModalBtnGroup
              handleClickOpenSaveList={handleClickOpenSaveList}
              handleClickPostPending={handleClickPostPending}
              handleClickClose={handleClickClose}
              handleClickPosting={handleClickPosting}
              saveList={saveList}
            />
            <div className="p-2 flex flex-row w-full">
              <BoardModalInputGroup
                titleInput={titleInput}
                select={select}
                setSelect={setSelect}
                selectList={selectList}
                currentBoard={props.currentBoard}
                thumbNailUrl={thumbNailUrl}
                setThumbNailUrl={setThumbNailUrl}
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
                <BoardModalSaveListTab
                  saveList={saveList}
                  loadSaveData={loadSaveData}
                  handleClickDeletePending={handleClickDeletePending}
                />
              ) : (
                <></>
              )}
            </div>
            <BoardWriteModalCheckBox isAnnounce={isAnnounce} handleClick={handleClick} />
            {isAlertModalOpen ? (
              <BoardWriteAlert handleCloseAlertModal={closeAlertModal} alertState={alertState} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
