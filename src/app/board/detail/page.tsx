// 상세페이지
import { Viewer } from '@toast-ui/react-editor'

import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import Sidebar from '@/app/component/ui/sidebar/Sidebar'
import { BOARD } from '@/app/constant/constant'

export default function BoardDetail() {
  // 추후 content reponse 받은것을 바탕으로 Viewer의 props로 넘기기
  return (
    <main className="w-full grid gap-4 grid-cols-4 h-4/5 pt-10 md:ml-10 md:mr-10 ml-5 z-1">
      <Sidebar title={BOARD} />
      <div className="md:col-span-3 mr-10 col-span-4">
        <Viewer />
      </div>
    </main>
  )
}
