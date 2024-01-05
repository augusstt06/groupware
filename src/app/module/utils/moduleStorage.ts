export const moduleDeleteStorage = (arr: string[]) => {
  arr.forEach((name) => {
    localStorage.removeItem(name)
  })
}
