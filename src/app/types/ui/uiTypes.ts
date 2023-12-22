export type InputIconLabelProps = {
  icon: React.ReactNode
}

export type ProgressbarProps = {
  allItems: number
  completedItems: number
}

export type SidebarProps = {
  title: string
}

export type SelectboxProps = {
  compoenetType: string
  title: string
  apiKey: string
  selectList: Array<{ name: string; value: string }>
}

export type ToggleProps = {
  title: string
  value: string
  componentType: string
}

export type ToggleGroupProps = {
  compoenetType: string
  toggleData: Array<{ title: string; value: string }>
}
