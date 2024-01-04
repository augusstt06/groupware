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

import { KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '@/app/constant/constant'
import { API_URL_UPLOAD_IMG } from '@/app/constant/route/api-route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { modulePostFileFetch } from '@/app/module/utils/moduleFetch'
import { type ModulePostFileFetchProps, type SuccessResponseType } from '@/app/types/moduleTypes'

type EditorProps = {
  editorContent: string
  setEditorContent: Dispatch<SetStateAction<string>>
  editorRef: React.MutableRefObject<Editor | null>
}
// TODO: checkList.md - 8
// FIXME: checkList.md - 7
export default function TextEditor({ editorContent, setEditorContent, editorRef }: EditorProps) {
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])

  type HookCallback = (url: string, text?: string) => void
  const onUploadImage = async (blob: File, callback: HookCallback) => {
    try {
      const formData = new FormData()
      formData.append('image', blob)
      const fetchImgProps: ModulePostFileFetchProps = {
        file: formData,
        fetchUrl: API_URL_UPLOAD_IMG,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res = await modulePostFileFetch(fetchImgProps)
      const imgUrl = (res as SuccessResponseType<string>).result

      callback(imgUrl, 'image')
    } catch (err) {}
  }

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
      hooks={{ addImageBlobHook: onUploadImage }}
    />
  )
}
