export type Pack = {
  [prop: string]: any
}

export type Item = {
  key: string,
  [prop: string]: any
}

export interface PickOptions {
  value: Item[]
  options?: Item[]
  radio?: boolean
  paging?: boolean
  request?: Function
  alias?: {
    key: string,
    title: string
  }
}

export type PickResult = {
  success: boolean
  data: Pack | any
}
