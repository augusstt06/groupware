import Input from '@/_component/input/Input'

const ChangePwd = () => {
  const inputList = [
    { labelContent: '현재 비밀번호' },
    { labelContent: '새 비밀번호' },
    { labelContent: '비밀번호 확인' },
  ]
  return (
    <section className="grid w-full grid-rows-3 gap-4 place-items-center">
      {inputList.map((data) => (
        <div key={data.labelContent} className="justify-start sort-vertical-flex">
          <Input
            isLabel={true}
            labelContent={data.labelContent}
            labelClassName="mr-2"
            className="pt-1 pb-1 pl-2 pr-2 border-2 border-indigo-300 rounded-lg w-60 "
          />
        </div>
      ))}
    </section>
  )
}
export default ChangePwd
