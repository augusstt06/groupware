// FIXME: grade, team 선택
// 1. 조직안의 팀 생성
// 2. 팀 등급 설정 (grade)
// 조직생성이후 팀 생성이나 등급생성 데이터 형식대로 다 input value화 시켜서 상태관리

import SelectBox from '@/app/component/ui/selectbox/SelectBox'

export default function AdditionalOrgInfo() {
  const selectData = [
    { title: 'Delete Access', value: 'deleteAccess' },
    { title: 'Invite Access', value: 'inviteAccess' },
    { title: 'Maintain Access', value: 'maintainAccess' },
    { title: 'Read Access', value: 'readAccess' },
    { title: 'Update Access', value: 'updateAccess' },
    { title: 'Write Access', value: 'writeAccess' },
  ]

  const valueList = [
    { value: 'TRUE', name: 'true' },
    { value: 'FALSE', name: 'false' },
  ]
  return (
    <>
      {selectData.map((data) => (
        <div key={data.title}>
          <SelectBox
            compoenetType="grades"
            title={data.title}
            apiKey={data.value}
            selectList={valueList}
          />
        </div>
      ))}
    </>
  )
}
