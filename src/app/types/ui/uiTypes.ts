export type InputIconLabelProps = {
  icon: React.ReactNode
}

export type ProgressbarProps = {
  allItems: number
  completedItems: number
}

export type SidebarProps = {
  nav: boolean
}

export type SelectboxProps = {
  compoenetType: string
  title: string
  apiKey: string
  selectList: Array<{ name: string; value: string }>
}
