/* @flow */

export type IssueObject = {
  number: string,
  title: string,
  description: string
}

export type CommitObject = {
  id: string,
  commiter: string,
  issues: Array<IssueObject>
}

export type PRObject = {
  number: string,
  title: string,
  user: string,
  issues: Array<IssueObject>,
}

export type ReleaseNoteObject = {
  id: number,
  value: Array<CommitObject>,
  pulls_url: string,
  prs: Array<PRObject>,
}

export type ReleaseNoteStateObject = {
  current: ?number,
  fetching: boolean,
  saved: Array<number>,
  rns: Array<ReleaseNoteObject>,
  filter: Object
}
export type ErrorObject = {
  actionDone: string,
  errorMessage: string
}
