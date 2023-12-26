import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import { Viewer } from '@toast-ui/react-editor'
import Prism from 'prismjs'

export default function TextViewer() {
  return <Viewer plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]} />
}
