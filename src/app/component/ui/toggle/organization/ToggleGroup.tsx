import Toggle from '../Toggle'

import { type ToggleGroupProps } from '@/app/types/ui/uiTypes'

export default function ToggleGroup(props: ToggleGroupProps) {
  return (
    <>
      <div className="flex flex-row justify-around">
        {props.toggleData.map((data) => (
          <div key={data.title} className="w-full">
            <Toggle title={data.title} value={data.value} componentType={props.compoenetType} />
          </div>
        ))}
      </div>
    </>
  )
}
