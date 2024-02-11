import InputWithLabel from '../../input/InputWithLabel'

import { type InviteLoginModalProps } from '@/app/types/ui/modalTypes'

export default function InviteLoginModal(props: InviteLoginModalProps) {
  const { inputList } = props
  return (
    <div className="p-5">
      {inputList.map((data) => (
        <InputWithLabel
          key={data.title}
          isHeadLabel={true}
          isTailLabel={data.isTailLabel}
          headLabelContent={data.headLabelContent}
          tailLabelContent={data.tailLabelContent}
          title={data.title}
          placeholder={data.placeholder}
          useInput={data.useInput}
          type={data.type}
          className=""
        />
      ))}
    </div>
  )
}
