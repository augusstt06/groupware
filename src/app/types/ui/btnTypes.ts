export type HamburgerProps = {
  nav: boolean
  setNav: (nav: boolean) => void
}

export type BtnProps = {
  title: string
}

export type ConditionBtnProps = {
  handleStep: () => void
}

export type ConditionBtnElementProps = ConditionBtnProps & {
  title: string
  tailwindClass: string
}
