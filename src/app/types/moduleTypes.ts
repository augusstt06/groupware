export type UseInputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  resetValue: () => void
}

export type ModuleGetFetchProps = {
  keyName: string[]
  keyValue: Array<string | number>
  fetchUrl?: string
  header?: object
}
export type ModulePostFetchProps = {
  data: object
  fetchUrl?: string
  header?: object
}

export type InputValidateProps = {
  inputData: string
  dataType: string
}
