import {
  CreateProjectModalColorSelect,
  CreateProjectModalInput,
} from '../../input/project/modal/CreateProjectModalInputs'

import { type CreateProjectModalProps } from '@/app/types/ui/modalTypes'

export default function CreateProjectModal(props: CreateProjectModalProps) {
  return (
    <div className="p-5">
      <span className="font-bold">새 프로젝트 만들기</span>
      <CreateProjectModalInput projectName={props.projectName} />
      <CreateProjectModalColorSelect
        colorList={props.colorList}
        handleSelectColor={props.handleSelectColor}
        selectColor={props.selectColor}
      />
    </div>
  )
}
