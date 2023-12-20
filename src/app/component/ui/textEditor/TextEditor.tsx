'use client'
import { useMemo, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/monokai-sublime.css'
import ReactQuill, { Quill } from 'react-quill'

import hljs from 'highlight.js'
import { ImageResize } from 'quill-image-resize-module-ts'

Quill.register('modules/ImageResize', ImageResize)

export default function TextEditor() {
  const [textValue, setTextValue] = useState('')
  hljs.configure({
    languages: ['javascript', 'CSS', 'HTML', 'python'],
  })

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

  const module = useMemo(() => {
    return {
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
      },
      toolbar: toolbarOptions,
      ImageResize: { modules: ['Resize'] },
    }
  }, [])

  return (
    <ReactQuill
      modules={module}
      theme="snow"
      value={textValue}
      // onChange={setTextValue}
      onChange={(content, delta, source, editor) => {
        setTextValue(editor.getHTML())
      }}
      className="text-gray-800 h-1/2"
      style={{ height: '87%' }}
    />
  )
}
