import Input from '@/components/input/Input'
import useInput from '@/module/hooks/reactHooks/useInput'

// FIXME: reset-password api 사용
const ChangePwd = () => {
  const currentPwd = useInput('')
  const newPwd = useInput('')
  const confirmPwd = useInput('')
  const inputList = [
    { labelContent: '현재 비밀번호', input: currentPwd },
    { labelContent: '새 비밀번호', input: newPwd },
    { labelContent: '비밀번호 확인', input: confirmPwd },
  ]

  return (
    <>
      <h1 className="text-xl font-bold">비밀번호 변경</h1>
      <section className="w-full grid grid-rows-3 gap-4 place-items-center">
        {inputList.map((data) => (
          <div key={data.labelContent} className="justify-start sort-vertical-flex">
            <Input
              isLabel={true}
              labelContent={data.labelContent}
              value={data.input.value}
              onChange={data.input.onChange}
              labelClassName="mr-2"
              className="pt-1 pb-1 pl-2 pr-2 border-2 border-indigo-300 rounded-lg w-60 "
            />
          </div>
        ))}
      </section>
    </>
  )
}
export default ChangePwd
