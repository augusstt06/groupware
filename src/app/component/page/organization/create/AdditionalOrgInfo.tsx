// FIXME: grade, team 선택
// 1. 조직안의 팀 생성
// 2. 팀 등급 설정 (grade)
// 조직생성이후 팀 생성이나 등급생성 데이터 형식대로 다 input value화 시켜서 상태관리

import SelectBox from '@/app/component/ui/selectbox/SelectBox'

export default function AdditionalOrgInfo() {
  const selectData = [
    'DeleteAccess',
    'InviteAccess',
    'MaintainAccess',
    'ReadAccess',
    'UpdateAccess',
    'WriteAccess',
  ]

  const valueList = [
    { value: 'TRUE', name: 'true' },
    { value: 'FALSE', name: 'false' },
  ]
  return (
    <>
      {selectData.map((title) => (
        <div key={title}>
          <SelectBox compoenetType="grades" title={title} selectList={valueList} />
        </div>
      ))}
    </>
  )
}
