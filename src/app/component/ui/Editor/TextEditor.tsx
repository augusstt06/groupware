'use client'
import { useRef } from 'react'

import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'

export default function TextEditor() {
  const editorRef = useRef(null)
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['code', 'codeblock'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['scrollSync'],
  ]

  return (
    <Editor
      ref={editorRef}
      placeholder="게시글을 작성해주세요"
      initialEditType="markdown"
      toolbarItems={toolbarItems}
      height={'100%'}
      previewStyle="vertical"
    />
  )
}
