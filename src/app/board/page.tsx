import MainHub from '../component/page/main/hub/MainHub'
import Sidebar from '../component/ui/sidebar/Sidebar'

export default function Board() {
  /**
   * TODO: 접근 제한사항
   * 1. 로그인 여부
   * 2. 조직은 물어봐야함
   */
  return (
    <main className="w-full grid gap-4 grid-cols-4 h-4/5 pt-10 md:ml-10 md:mr-10 ml-5 z-1">
      <Sidebar />
      <div className="md:col-span-3 mr-10 col-span-4">
        <MainHub title="게시판" />
      </div>
    </main>
  )
}
