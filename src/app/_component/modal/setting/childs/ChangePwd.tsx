import Button from '@/_component/button/Button'
import Input from '@/_component/input/Input'
import useInput from '@/module/hooks/reactHooks/useInput'

type Props = {
  handleChangeSetting: (setting: string) => void
}
// FIXME: reset-password api 사용
const ChangePwd = (props: Props) => {
  const { handleChangeSetting } = props

  const currentPwd = useInput('')
  const newPwd = useInput('')
  const confirmPwd = useInput('')
  const inputList = [
    { labelContent: '현재 비밀번호', input: currentPwd },
    { labelContent: '새 비밀번호', input: newPwd },
    { labelContent: '비밀번호 확인', input: confirmPwd },
  ]
  const buttonList = [
    { buttonContent: '변경', onClick: () => {}, className: 'bg-indigo-300 hover:bg-indigo-500' },
    {
      buttonContent: '이전',
      onClick: () => {
        handleChangeSetting('')
      },
      className: 'bg-red-300 hover:bg-red-500',
    },
  ]
  return (
    <>
      <h1 className="text-xl font-bold">비밀번호 변경</h1>
      <section className="grid w-full grid-rows-3 gap-4 place-items-center">
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
      <section className="justify-between w-32 sort-row-flex">
        {buttonList.map((data) => (
          <Button
            key={data.buttonContent}
            buttonContent={data.buttonContent}
            onClick={data.onClick}
            className={`p-2 pl-3 pr-3 text-white rounded-lg smooth-transition ${data.className}`}
          />
        ))}
      </section>
    </>
  )
}
export default ChangePwd
