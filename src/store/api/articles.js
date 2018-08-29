import { post } from './https'

export const getNoteSelectionList = data => post({
  url: `/beacon/community/operationTag`,
  data
})