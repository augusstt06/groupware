'use client'
import { type Dispatch, type SetStateAction } from 'react'

import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { Editor } from '@toast-ui/react-editor'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import 'prismjs/themes/prism.css'
import Prism from 'prismjs'

type EditorProps = {
  editorContent: string
  setEditorContent: Dispatch<SetStateAction<string>>
  editorRef: React.MutableRefObject<Editor | null>
}
export default function TextEditor({ editorContent, setEditorContent, editorRef }: EditorProps) {
  // type HookCallback = (url: string, text?: string) => void
  // const onUploadImage = async (blob: File, callback: HookCallback) => {
  //   const formData = new FormData()
  //   formData.append('image', blob)
  //   // 회의 후 imgUrl 부분에서 post 요청을 날려 이미지를 서버에 저장후 url를 리턴받기
  //   const imgUrl = 'http://localhost:3000/test'
  //   callback(imgUrl, 'image')
  // }

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['code', 'codeblock'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['scrollSync'],
  ]
  const onEditorChange = () => {
    const editorHtml = editorRef.current?.getInstance().getHTML()
    setEditorContent(editorHtml)
  }
  return (
    <Editor
      ref={editorRef}
      placeholder="게시글을 작성해주세요"
      initialValue={editorContent}
      initialEditType="markdown"
      toolbarItems={toolbarItems}
      height={'100%'}
      previewStyle="vertical"
      plugins={[colorSyntax, [codeSyntaxHighlightPlugin, { highlighter: Prism }]]}
      onChange={onEditorChange}
      // hooks={{ addImageBlobHook: onUploadImage }}
    />
  )
}
