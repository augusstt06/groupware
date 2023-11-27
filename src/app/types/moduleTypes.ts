export type UseInputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  resetValue: () => void
}

export type ModuleGetFetchProps = {
  params: Record<string, string>
  fetchUrl?: string
  header?: Record<string, string>
}
export type ModulePostFetchProps = {
  data: object
  fetchUrl?: string
  header?: Record<string, string>
}

export type InputValidateProps = {
  inputData: string
  dataType: string
}
