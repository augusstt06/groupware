'use client'
import React, { useRef, useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

import BoardWriteModalCheckBox from '@/_components/checkbox/BoardWriteModalCheckBox'
import BoardModalInputGroup from '@/_components/input/group/board/BoardModalInputGroup'
import Dialog from '@/_components/modal/dialog/Dialog'
import BoardModalSaveListTab from '@/_components/tab/board/BoardModalSaveListTab'
import BoardWriteModalBtnTab from '@/_components/tab/board/BoardWriteModalBtnTab'
import { FALSE, KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE, TRUE } from '@/_constant/constant'
import { errNotEntered } from '@/_constant/errorMsg'
import { API_URL_POSTINGS, API_URL_POSTINGS_PENDING } from '@/_constant/route/api-route-constant'
import { ROUTE_POSTING_DETAIL } from '@/_constant/route/route-constant'
import useInput from '@/_module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/_module/hooks/reduxHooks'
import { moduleCheckContentIsEmpty } from '@/_module/utils/check/moduleCheckContent'
import { moduleGetCookie } from '@/_module/utils/moduleCookie'
import { moduleDeleteFetch, moduleGetFetch, modulePostFetch } from '@/_module/utils/moduleFetch'
import { openBoardWriteModalReducer } from '@/_store/reducers/board/openBoardWriteModalReducer'
import {
  type ApiResponseType,
  type DialogBtnValueType,
  type ModuleCheckContentIsEmptyProps,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '@/_types/module'
import { type BoardWriteModalprops } from '@/_types/ui/modal'
import { type BoardListResponseType, type BoardResponseType } from '@/_types/variable'

const Editor = dynamic(async () => import('../../../../_components/editor/TextEditor'), {
  ssr: false,
})

export default function BoardWriteModal(props: BoardWriteModalprops) {
  const queryClient = useQueryClient()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const handleDialogClose = () => {
    dialogRef.current?.close()
  }
  const [dialogText, setDialogText] = useState<{
    main: string
    sub: string
  }>({
    main: '',
    sub: '',
  })
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

  const [isOpenSaveList, setIsOpenSaveList] = useState<boolean>(false)
  const [imgCount, setImgCount] = useState<number>(0)
  const currentBoardId = props.currentBoard !== null ? props.currentBoard?.id : '0'
  const [select, setSelect] = useState(currentBoardId)
  const selectList = myBoardState.map((data) => ({ id: data.id, name: data.name }))
  const [dialogBtnValue, setDialogBtnValue] = useState<DialogBtnValueType>({
    isCancel: false,
    cancleFunc: () => {},
    cancelText: '',
    confirmFunc: handleDialogClose,
    confirmText: '확인',
  })

  const countImgFiles = () => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(editorContent, 'text/html')
    const imgTags = doc.querySelectorAll('img')
    setImgCount(imgTags.length)
    return imgCount
  }

  const handleClick = () => {
    if (isAnnounce === FALSE) setIsAnnounce(TRUE)
    else setIsAnnounce(FALSE)
  }

  const { data: saveData, refetch } = useQuery({
    queryKey: ['save'],
    queryFn: async () => {
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
      return res as SuccessResponseType<BoardResponseType>
    },
  })

  let saveList: [BoardListResponseType] | []
  if (saveData !== undefined) saveList = saveData.result.data
  else saveList = []

  const { mutate: deleteSave } = useMutation({
    mutationKey: ['delete-pending'],
    mutationFn: async (id: number) =>
      await moduleDeleteFetch<string>({
        params: {
          postingId: id,
        },
        fetchUrl: API_URL_POSTINGS_PENDING,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: userInfo[KEY_X_ORGANIZATION_CODE],
        },
      }),
    onSuccess: async () => {
      await refetch()
      await queryClient.invalidateQueries({ queryKey: ['save'] })
    },
    onError: () => {
      setDialogText({
        main: '삭제에 실패했습니다.',
        sub: '',
      })
      dialogRef.current?.showModal()
    },
  })

  const handleClickDeletePending = (id: number) => {
    deleteSave(id)
    setIsOpenSaveList(false)
  }

  const { mutate: postSave } = useMutation({
    mutationKey: ['post-save'],
    mutationFn: async () =>
      await modulePostFetch<ApiResponseType>({
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
      }),
    onSuccess: async () => {
      await refetch()
      await queryClient.invalidateQueries({ queryKey: ['save'] })
    },
  })

  const handleClickPostPending = () => {
    if (saveList.length >= 10) {
      setDialogText({
        main: '게시글의 임시저장은 10개까지 가능합니다.',
        sub: '',
      })
      dialogRef.current?.showModal()
      return
    }
    setDialogBtnValue({
      isCancel: false,
      cancelText: '',
      cancleFunc: () => {},
      confirmText: '확인',
      confirmFunc: handleDialogClose,
    })
    const moduleProps: ModuleCheckContentIsEmptyProps = {
      successText: '게시글이 임시저장되었습니다.',
      dialog: dialogRef,
      setBtnValue: setDialogBtnValue,
      setDialogAlertState: setDialogText,
      fetchFunction: postSave,
      boardId: Number(select),
      editorContents: editorContent,
      inputValue: titleInput.value,
    }
    moduleCheckContentIsEmpty(moduleProps)
  }

  const { mutate: postContent } = useMutation({
    mutationKey: ['post-content'],
    mutationFn: async () => {
      const res = await modulePostFetch<number>({
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
      })
      return res as SuccessResponseType<number>
    },
    onSuccess: (data) => {
      dispatch(openBoardWriteModalReducer())
      const postingId = data.result
      router.push(`${ROUTE_POSTING_DETAIL}/${postingId.toString()}`)
    },
    onError: () => {
      alert(errNotEntered('필수항목'))
    },
  })

  const handleClickOpenSaveList = () => {
    setIsOpenSaveList(!isOpenSaveList)
  }
  const loadSaveData = (data: BoardListResponseType) => {
    setSelect(data.boardId.toString())
    setSaveContent(data.content)
    titleInput.setString(data.title)
    setIsOpenSaveList(false)
  }

  const handleClickPosting = () => {
    if (select === '0') {
      setDialogText({
        main: '게시판 카테고리를 선택해 주세요.',
        sub: '',
      })
      setDialogBtnValue({
        isCancel: false,
        cancleFunc: () => {},
        cancelText: '',
        confirmFunc: handleDialogClose,
        confirmText: '확인',
      })
      dialogRef.current?.showModal()
      return
    }
    const moduleProps: ModuleCheckContentIsEmptyProps = {
      successText: '게시글이 등록되었습니다.',
      dialog: dialogRef,
      setBtnValue: setDialogBtnValue,
      setDialogAlertState: setDialogText,
      fetchFunction: postContent,
      boardId: Number(select),
      editorContents: editorContent,
      inputValue: titleInput.value,
    }
    moduleCheckContentIsEmpty(moduleProps)
  }

  const allModalClose = () => {
    dialogRef.current?.close()
    dispatch(openBoardWriteModalReducer())
  }
  const handleClickClose = () => {
    if (editorContent !== '' || titleInput.value !== '') {
      setDialogText({
        main: '작성중인 내용이 있습니다. 나가시겠습니까?',
        sub: '임시저장 혹은 등록하지 않고 페이지를 벗어날경우 지금까지 작성한 내용이 사라집니다.',
      })
      setDialogBtnValue({
        isCancel: true,
        cancleFunc: handleDialogClose,
        cancelText: '취소',
        confirmFunc: allModalClose,
        confirmText: '저장하지 않고 나가기',
      })
      dialogRef.current?.showModal()
      return
    }
    dispatch(openBoardWriteModalReducer())
  }

  return (
    <>
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="modal-base"
      >
        <div className="relative w-5/6 p-4">
          <div className="relative bg-white border-2 border-indigo-300 border-solid rounded-lg shadow dark:bg-[#2e2e2e]">
            <BoardWriteModalBtnTab
              handleClickOpenSaveList={handleClickOpenSaveList}
              handleClickPostPending={handleClickPostPending}
              handleClickClose={handleClickClose}
              handleClickPosting={handleClickPosting}
              saveList={saveList}
            />
            <div className="flex flex-row w-full p-2">
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
          </div>
        </div>
        <Dialog dialog={dialogRef} dialogAlertText={dialogText} dialogBtnValue={dialogBtnValue} />
      </div>
    </>
  )
}
