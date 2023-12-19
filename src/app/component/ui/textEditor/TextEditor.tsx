'use client'
import { useState } from 'react'

import 'react-quill/dist/quill.snow.css'

import 'highlight.js/styles/monokai-sublime.css'
import hljs from 'highlight.js'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(
  async () => {
    hljs.configure({
      languages: ['javascript', 'CSS', 'HTML', 'python'],
    })
    // @ts-expect-error  code-highlight
    window.hljs = hljs
    return import('react-quill')
  },
  {
    ssr: false,
    loading: () => <p>Editor Loading</p>,
  },
)
export default function TextEditor() {
  const [textValue, setTextValue] = useState('')
  const toolbarOptions = [
    ['bold', 'italic'],
    ['link', 'image'],
    ['blockquote', 'code-block'],
  ]

  const module = {
    syntax: true,
    toolbar: toolbarOptions,
  }
  return <ReactQuill modules={module} theme="snow" value={textValue} onChange={setTextValue} />
}
