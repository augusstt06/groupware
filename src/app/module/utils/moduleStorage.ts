export const deleteStorage = (arr: string[]) => {
  arr.forEach((name) => {
    localStorage.removeItem(name)
  })
}
