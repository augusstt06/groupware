import { type ModuleCheckContentIsEmptyProps } from '@/app/types/moduleTypes'

export const moduleCheckContentIsEmpty = (props: ModuleCheckContentIsEmptyProps) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(props.editorContents, 'text/html')
  const isImageInclude = doc.body.querySelector('img') !== null
  const textContent = Array.from(doc.body.childNodes)
    .map((node) => node.textContent != null || '')
    .join('')
  const isContentEmpty = textContent.trim() === '' && !isImageInclude
  if (props.inputValue === '') {
    props.setAlertStateFunction({
      headDescription: '제목은 최소 1자 이상 작성 후 임시저장이 가능합니다.',
      additianoalDescription: '',
      option: {
        positive: '확인',
        negative: '',
      },
      onClick: props.handleCloseAlertModal,
      isPromise: false,
    })
    props.handleOpenAlertModal()
    return
  } else if (isContentEmpty) {
    props.setAlertStateFunction({
      headDescription: '게시글 내용은 최소 1자 이상 작성 후 임시저장이 가능합니다.',
      additianoalDescription: '',
      option: {
        positive: '확인',
        negative: '',
      },
      onClick: props.handleCloseAlertModal,
      isPromise: false,
    })
    props.handleOpenAlertModal()
    return
  } else if (props.boardId === 0) {
    props.setAlertStateFunction({
      headDescription: '게시판 카테고리를 선택해주세요',
      additianoalDescription: '',
      option: {
        positive: '확인',
        negative: '',
      },
      onClick: props.handleCloseAlertModal,
      isPromise: false,
    })
    props.handleOpenAlertModal()
    return
  }
  props.setAlertStateFunction({
    headDescription: props.success.headDescription,
    additianoalDescription: props.success.additianoalDescription,
    option: {
      positive: '확인',
      negative: '취소',
    },
    onClick: props.fetchFunction,
    isPromise: true,
  })
  props.handleOpenAlertModal()
}
