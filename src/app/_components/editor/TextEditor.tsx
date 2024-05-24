'use client'
import { useEffect } from 'react'

import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { Editor } from '@toast-ui/react-editor'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import 'prismjs/themes/prism.css'
import Prism from 'prismjs'

import { API_SUCCESS_CODE, KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '@/_constant/constant'
import { API_URL_UPLOAD_IMG } from '@/_constant/route/api-route-constant'
import { useAppSelector } from '@/_module/hooks/reduxHooks'
import { moduleGetCookie } from '@/_module/utils/moduleCookie'
import { modulePostFileFetch } from '@/_module/utils/moduleFetch'
import {
  type FailResponseType,
  type ModulePostFileFetchProps,
  type SuccessResponseType,
} from '@/_types/module'
import { type EditorProps } from '@/_types/ui/extra'

export default function TextEditor(props: EditorProps) {
  let imgList: string[] = []
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  type HookCallback = (url: string, text?: string) => void
  const checkImgCount = () => {
    const img = props.editorRef.current?.getInstance().getHTML()
    imgList = imgList.filter((data) => img?.includes(data))
  }
  const onUploadImage = async (blob: File | Blob, callback: HookCallback) => {
    try {
      if (imgList.length >= 5) {
        alert('파일첨부는 5개를 초과할수 없습니다.')
        return
      }
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
      const res = await modulePostFileFetch<string>(fetchImgProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      const imgUrl = (res as SuccessResponseType<string>).result
      imgList.push(imgUrl)
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
    const editorHtml = props.editorRef.current?.getInstance().getMarkdown()

    props.setEditorContent(editorHtml as string)
    checkImgCount()
  }

  useEffect(() => {
    if (props.saveContent !== '') {
      props.editorRef.current?.getInstance().setHTML(props.saveContent)
      props.setEditorContent(props.saveContent)
    }
  }, [props.saveContent])

  return (
    <>
      <Editor
        ref={props.editorRef}
        placeholder="게시글을 작성해주세요"
        initialValue={props.editorContent}
        initialEditType="markdown"
        toolbarItems={toolbarItems}
        height={'100%'}
        previewStyle="vertical"
        plugins={[colorSyntax, [codeSyntaxHighlightPlugin, { highlighter: Prism }]]}
        onChange={onEditorChange}
        hooks={{ addImageBlobHook: onUploadImage }}
      />
    </>
  )
}
