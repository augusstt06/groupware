'use client'

import { Viewer } from '@toast-ui/react-editor'

export default function TextViewer(props: { content: string }) {
  return <Viewer initialValue={props.content} />
}
