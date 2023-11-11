import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type RegisterOrnBtnProps } from '@/app/types/ui/btnTypes'

export default function RegisterOrgBtn(props: RegisterOrnBtnProps) {
  const isOrgComplete = useAppSelector((state) => {
    const { name, description } = state.orgInfo.createOrg

    return name !== '' && description !== ''
  })
  const orgState = useAppSelector((state) => {
    return state.orgInfo.createOrg
  })
  // FIXME: 회의 후 req데이터 종류 바꾸기
  const fetchProps = {
    data: {
      description: orgState.description,
      name: orgState.name,
      organizationType: orgState.organizationType,
    },
    fetchUrl: process.env.NEXT_PUBLIC_CREATE_ORGANIZATIONS_SOURCE,
  }
  const fetchCreateOrg = async () => {
    await modulePostFetch(fetchProps)
    alert('조직 생성이 완료되었습니다.')
  }
  const handleClick = () => {
    if (!isOrgComplete) {
      alert('항목을 다 입력해주세요')
      return
    }
    fetchCreateOrg()
      .then(() => {
        // FIXME: 추후에 완료후 실행할 작업 작성하기
        alert('완료')
      })
      .catch(() => {
        alert('조직생성이 실패했습니다.')
      })
  }
  return (
    <button
      type="button"
      className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
      onClick={handleClick}
    >
      {props.title}
    </button>
  )
}
