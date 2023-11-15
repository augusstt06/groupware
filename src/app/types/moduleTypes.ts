export type UseInputType = {
  state: string
  title?: string
  teamDependency?: object[]
}

export type ModuleGetFetchProps = {
  keyName: string
  keyValue: string
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
