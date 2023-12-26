'use client'
import { useRef } from 'react'

import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { Editor } from '@toast-ui/react-editor'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import 'prismjs/themes/prism.css'
import Prism from 'prismjs'

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
      plugins={[colorSyntax, [codeSyntaxHighlightPlugin, { highlighter: Prism }]]}
    />
  )
}
