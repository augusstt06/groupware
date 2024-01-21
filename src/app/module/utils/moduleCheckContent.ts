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
    props.setDialogAlertState({
      main: '제목은 최소 1자 이상 작성 후 임시저장이 가능합니다.',
      sub: '',
    })
    props.dialog.current?.showModal()
    return
  } else if (isContentEmpty) {
    props.setDialogAlertState({
      main: '게시글 내용은 최소 1자 이상 작성 후 임시저장이 가능합니다.',
      sub: '',
    })
    props.dialog.current?.showModal()
    return
  } else if (props.boardId === 0 || Number.isNaN(props.boardId)) {
    props.setDialogAlertState({
      main: '게시판 카테고리를 선택해주세요.',
      sub: '',
    })
    props.dialog.current?.showModal()
    return
  }
  props.setDialogAlertState({
    main: props.successText,
    sub: '',
  })
  props.dialog.current?.showModal()
}
