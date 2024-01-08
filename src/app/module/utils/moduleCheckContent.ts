import { type ModuleCheckContentIsEmptyProps } from '@/app/types/moduleTypes'

export const moduleCheckContentIsEmpty = (props: ModuleCheckContentIsEmptyProps) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(props.editorContents, 'text/html')
  const isImageInclude = doc.body.querySelector('img') !== null
  const textContent = Array.from(doc.body.childNodes)
    .map((node) => node.textContent != null || '')
    .join('')
  const isContentEmpty = textContent.trim() === '' && !isImageInclude
  if (props.inputValue === '' || isContentEmpty) {
    props.setAlertStateFunction({
      headDescription: '제목과 내용은 필수 입력 항목입니다.',
      additianoalDescription: '',
      option: {
        positive: '확인',
        negative: '',
      },
      isFetch: false,
    })
    props.setIsModalOpenFunction(true)
    return
  }
  props.setAlertStateFunction({
    headDescription: props.success.headDescription,
    additianoalDescription: props.success.additianoalDescription,
    option: {
      positive: '확인',
      negative: '취소',
    },
    isFetch: true,
  })
  props.setIsModalOpenFunction(true)
}
