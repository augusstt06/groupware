import { useState } from 'react'

import { InputLabel } from '../../label/Inputlabel'

import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { type BoardModalInputGruopProps } from '@/app/types/ui/inputTypes'

export default function BoardModalInputGroup(props: BoardModalInputGruopProps) {
  const userInfo = useAppSelector((state) => state.userInfo)
  const params = useAppSelector((state) => state.boardCategory.category)
  const [select, setSelect] = useState('')
  const selectList = [
    { value: 'announce', title: '공지사항' },
    { value: 'project', title: '프로젝트' },
  ]
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value)
  }

  return (
    <div className="w-1/3 h-full p-2 mb-5">
      <div className="p-2">
        <InputLabel title="게시판" />
        {params !== '' ? (
          <input
            type="text"
            value={params}
            className="rounded rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-600 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="게시글 제목을 입력해주세요"
            readOnly
          />
        ) : (
          <select
            id="boardCategory"
            onChange={handleChange}
            value={select}
            className="appearance-none rounded rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="none">글 카테고리를 골라주세요</option>
            {selectList.map((data) => (
              <option value={data.value} key={data.title}>
                {data.title}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="p-2">
        <InputLabel title="제목" />
        <input
          type="text"
          value={props.titleInput.value}
          onChange={props.titleInput.onChange}
          className="rounded rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="게시글 제목을 입력해주세요"
        />
      </div>
      <div className="p-2">
        <InputLabel title="작성자" />
        <input
          type="text"
          value={userInfo.extraInfo.name}
          className="rounded rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-600 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="게시글 제목을 입력해주세요"
          readOnly
        />
      </div>
      <div className="p-2">
        <InputLabel title="이메일" />
        <input
          type="text"
          value={userInfo.extraInfo.email}
          className="rounded rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-600 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="게시글 제목을 입력해주세요"
          readOnly
        />
      </div>
      <div className="p-2 h-40 ">
        <InputLabel title="썸네일" />
        <div className="h-full flex border-2 dark:border-white-500 justify-center items-center">
          + 이미지 업로드
        </div>
      </div>
    </div>
  )
}
