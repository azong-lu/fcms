export interface ItagStore {
  tagsView: Itags[]
}

export interface Itags {
  path: string
  title?: string
  notCloseable?: boolean
}
