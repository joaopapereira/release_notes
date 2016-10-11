/* @flow */
import moment from 'moment'
import type { IssueObject,
              ReleaseNoteObject, ReleaseNoteStateObject,
              PRObject } from '../interfaces/releaseNote.js'
import Action from 'redux'
// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_RN = 'REQUEST_RELEASE_NOTE'
export const RECEIVE_RN = 'RECIEVE_RELEASE_NOTE'
export const SAVE_CURRENT_RN = 'SAVE_CURRENT_RELEASE_NOTE'
export const REQUEST_COMMITS = 'REQUEST_COMMITS'
export const RECEIVE_COMMITS = 'RECEIVE_COMMITS'
export const REQUEST_ISSUES = 'REQUEST_ISSUES'
export const RECEIVE_ISSUES = 'RECEIVE_ISSUES'
export const CHANGE_REPO_NAME = 'CHANGE_REPO_NAME'
export const ON_SUBMIT_FORM = 'ON_SUBMIT_FORM'
export const FETCH_ERROR = 'FETCH_ERROR'
export const CHANGE_DATE = 'CHANGE_DATE'

// ------------------------------------
// Actions
// ------------------------------------

export const onSubmitForm = (evt): Function => {
  evt.preventDefault()
  return fetchRepository()
}

export function onChangeRepoName (evt): Action {
  return {
    type: CHANGE_REPO_NAME,
    payload: {
      value: evt.target.value
    }
  }
}

export function onChangeDatePicker (date): Action {
  return {
    type: CHANGE_DATE,
    payload: {
      date
    }
  }
}

export function requestRN (): Action {
  return {
    type: REQUEST_RN
  }
}
export function fetchError (actionDone, errorMessage): Action {
  return {
    type: FETCH_ERROR,
    payload: {
      actionDone,
      errorMessage
    }
  }
}

let availableId = 0
export function recieveRN (value): Action {
  return {
    type: RECEIVE_RN,
    payload: {
      value,
      id: availableId++
    }
  }
}

export function requestCommits (url): Action {
  return {
    type: REQUEST_COMMITS,
    payload: {
      url
    }
  }
}

export function recieveCommits (_filter: Object, value: Array<PRObject>): Action {
  var prs = []
  var oldestDate = new Date(_filter.since)
  for (var i = 0, len = value.length; i < len; i++) {
    if (value[i].merged_at == null) {
      continue
    } else if (new Date(value[i].merged_at) < oldestDate) {
      break
    }
    prs.push(value[i])
  }
  return {
    type: RECEIVE_COMMITS,
    payload: {
      prs
    }
  }
}

export function requestIssue (): Action {
  return {
    type: REQUEST_ISSUES
  }
}
export function receiveIssue (pr: PRObject, issue: IssueObject): Action {
  return {
    type: RECEIVE_ISSUES,
    payload: {
      pr,
      issue
    }
  }
}

export function saveCurrentRN (): Action {
  return {
    type: SAVE_CURRENT_RN
  }
}

function getHeaders () {
  var headers = {}
  return headers
}

export const fetchRepository = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    dispatch(requestRN())
    var state = getState()

    return fetch('https://api.github.com/repos/' + state.rn.repoName,
                  { headers: getHeaders() })
      .then(response => response.json())
      .then(json => {
        if (json.message !== undefined) {
          return dispatch(fetchError(' while retrieving the repository', json.message))
        }
        dispatch(recieveRN(json))
        return dispatch(fetchCommits(json.pulls_url))
      }
      )
  }
}

export const fetchCommits = (url): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    var state = getState()
    var _filter = state.rn.filter
    var composedUrl = url.split(/[{]+/)[0]
    composedUrl += '?state=' + state.rn.filter.state
    composedUrl += '&sort=updated&direction=desc'
    return fetch(composedUrl, { headers: getHeaders() })
      .then(response => response.json())
      .then(json => {
        if (json.message !== undefined) {
          return dispatch(fetchError(' while retrieving the PRs', json.message))
        }
        var result = dispatch(recieveCommits(_filter, json))
        var allIssues = []
        for (var i = 0; i < result.payload.prs.length; i++) {
          var pr = result.payload.prs[i]
          if (pr.title.toLowerCase().match(/closes? .*#\d+/)) {
            var id = pr.title.split(/#/)[1].split(/ /)[0]
            var repositoryNameArr = pr.title.split(/#/)[0].split(/ /)
            var repositoryName = repositoryNameArr[repositoryNameArr.length - 1]
            allIssues.push(dispatch(fetchIssue(pr, repositoryName, id)))
          } else {
            allIssues.push(dispatch(receiveIssue(pr, { id: pr.id, title: pr.title })))
          }
        }
        return allIssues
      }
    )
  }
}

export const fetchIssue = (pr, repository, id): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    var composedUrl = 'https://api.github.com/repos/' + repository + '/issues/' + id
    return fetch(composedUrl, { headers: getHeaders() })
      .then(response => response.json())
      .then(json => {
        if (json.message !== undefined) {
          return dispatch(fetchError(' while retrieving the issue: ' + repository + '#' + id, json.message))
        }
        return dispatch(receiveIssue(pr, json))
      }
      )
  }
}

export const actions = {
  requestRN,
  recieveRN,
  fetchRepository,
  saveCurrentRN
}

const RN_ACTION_HANDLERS = {
  [CHANGE_DATE]:  (state: ReleaseNoteStateObject, action: {payload: {date: string}}): ReleaseNoteStateObject => {
    return ({ ...state, filter: { ...state.filter, since: action.payload.date } })
  },
  [FETCH_ERROR]:  (state: ReleaseNoteStateObject, action: {payload: {actionDone: string, errorMessage: string}}):
    ReleaseNoteStateObject => {
    return ({ ...state,
              fetching: false,
              errors: [{ actionDone: action.payload.actionDone, errorMessage: action.payload.errorMessage }] })
  },
  [REQUEST_RN]: (state: ReleaseNoteStateObject): ReleaseNoteStateObject => {
    return ({ ...state, fetching: true, errors: [] })
  },
  [RECEIVE_RN]: (state: ReleaseNoteStateObject, action: {payload: ReleaseNoteObject}): ReleaseNoteStateObject => {
    var releaseNote = {
      ...action.payload.value,
      prs: []
    }

    return ({ ...state, rns: state.rns.concat(releaseNote), current: releaseNote.id })
  },
  [SAVE_CURRENT_RN]: (state: ReleaseNoteStateObject): ReleaseNoteStateObject => {
    return state.current != null ? ({ ...state, saved: state.saved.concat(state.current) }) : state
  },
  [REQUEST_COMMITS]: (state: ReleaseNoteStateObject): ReleaseNoteStateObject => {
    return ({ ...state, fetching: true })
  },
  [RECEIVE_COMMITS]: (state: ReleaseNoteStateObject, action: {payload: Array<PRObject>}): ReleaseNoteStateObject => {
    var currentId = 0
    for (currentId = 0; currentId < state.rns.length; currentId++) {
      if (state.rns[currentId].id === state.current) {
        break
      }
    }
    var rn = {
      ...state.rns[currentId],
      prs: action.payload.prs
    }

    var releaseNotes = sliceIndex(state.rns, rn, currentId)
    return ({ ...state, rns: releaseNotes, fetching: false })
  },
  [REQUEST_ISSUES]: (state: ReleaseNoteStateObject): ReleaseNoteStateObject => {
    return ({ ...state, fetching: true, missingIssues: state.missingIssues + 1 })
  },
  [CHANGE_REPO_NAME]: (state: ReleaseNoteStateObject, action: {payload: {value: string}}): ReleaseNoteStateObject => {
    return ({ ...state, repoName: action.payload.value })
  },
  [RECEIVE_ISSUES]: (state: ReleaseNoteStateObject, action: {payload: {pr: PRObject, issue: IssueObject}}):
    ReleaseNoteStateObject => {
    var newPR = {
      ...action.payload.pr,
      issue: action.payload.issue
    }
    var currentId = 0
    for (currentId = 0; currentId < state.rns.length; currentId++) {
      if (state.rns[currentId].id === state.current) {
        break
      }
    }

    var prIndex = 0
    for (prIndex = 0; prIndex < state.rns[currentId].prs.length; prIndex++) {
      if (state.rns[currentId].prs[prIndex].id === action.payload.pr.id) {
        break
      }
    }
    var allPRs = sliceIndex(state.rns[currentId].prs, newPR, prIndex)
    var rn = {
      ...state.rns[currentId],
      prs: allPRs
    }
    var releaseNotes = sliceIndex(state.rns, rn, currentId)
    return ({ ...state,
              rns: releaseNotes,
              fetching: state.missingIssues === 1,
              missingIssues: state.missingIssues - 1 })
  }
}

function sliceIndex (arr, newValue, indexValue) {
  var releaseNotes = []
  if (indexValue === 0) {
    releaseNotes = [
      newValue,
      ...arr.slice(indexValue + 1)
    ]
  } else {
    releaseNotes = [
      ...arr.slice(0, indexValue),
      newValue,
      ...arr.slice(indexValue + 1)
    ]
  }
  return releaseNotes
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: ReleaseNoteStateObject =
  { fetching: false,
    current: null,
    rns: [],
    saved: [],
    filter: { state: 'closed', since:  moment() },
    missingIssues: 0,
    repoName: '',
    errors: [],
    date: moment() }
export default function rnReducer (state: ReleaseNoteStateObject = initialState,
                                   action: Action): ReleaseNoteStateObject {
  const handler = RN_ACTION_HANDLERS[action.type]

  var v = handler ? handler(state, action) : state
  return v
}
