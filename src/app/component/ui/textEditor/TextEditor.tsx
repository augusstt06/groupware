'use client'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function TextEditor() {
  const [textValue, setTextValue] = useState('')
  const toolbarOptions = [
    ['bold', 'italic'],
    ['link', 'image'],
    ['blockquote', 'code-block'],
  ]
  const module = {
    toolbar: toolbarOptions,
  }
  return <ReactQuill modules={module} theme="snow" value={textValue} onChange={setTextValue} />
}
