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
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ['clean'],
    ['image', 'video'],
  ]

  const module = {
    syntax: true,
    toolbar: toolbarOptions,
  }

  return (
    <ReactQuill
      modules={module}
      theme="snow"
      value={textValue}
      onChange={setTextValue}
      className="text-gray-800 h-1/2"
      style={{ height: '87%' }}
    />
  )
}
