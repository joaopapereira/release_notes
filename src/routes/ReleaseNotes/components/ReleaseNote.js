/* @flow */
import React from 'react'
import classes from './ReleaseNotes.scss'
import DatePicker from 'react-datepicker'
require('react-datepicker/dist/react-datepicker.css')

import type { ReleaseNoteObject, ErrorObject } from '../interfaces/releaseNote'

type Props = {
  rn: ?ReleaseNoteObject,
  saved: Array<ReleaseNoteObject>,
  errors: ErrorObject,
  selectedDate: string,
  repoName: string,
  fetchRepository: Function,
  saveCurrentRN: Function,
  onChangeRepoName: Function,
  onSubmitForm: Function,
  onChangeDatePicker: Function
}

export const ReleaseNote = (props: Props) => {
  var allPRs = []
  if (props.rn !== undefined) {
    props.rn.prs.forEach(pr => {
      allPRs.push(
        <ul key={props.rn.id + pr.id}>
          <li key={props.rn.id + 1 + pr.id}>
            {pr.issue ? pr.issue.title : ''} <a href={pr.issue ? pr.issue.url : '#'}>{pr.issue ? pr.issue.number : ''}</a> by ({pr.user.login})
          </li>
        </ul>
      )
    })
  };
  return (
    <div>
      <div>
        <div className='row'>
          {(props.errors !== undefined) ? <div>
            <p>Something wrong happened while {props.errors.action_done}</p>
            <p>{props.errors.error_message}</p>
            </div>
            : null
          }
        </div>
        <div className='row'>
          {(props.rn && props.errors === undefined) ? <div>
            <h5>
              Repository: {props.rn.full_name}
            </h5>
            <div>
              Release note since {props.selectedDate.format("MMMM Do YYYY")}:<br />
              {allPRs}
            </div>
          </div>
            : null
          }
        </div>
        <form onSubmit={props.onSubmitForm}>
          <input type="text" name="repo_name" value={props.repoName} onChange={props.onChangeRepoName}/>
          <DatePicker selected={props.selectedDate} onChange={props.onChangeDatePicker}/>
        </form>
        <button className='btn btn-default' onClick={props.fetchRepository}>
          Fetch a Release Note
        </button>
        {' '}
        <button className='btn btn-default' onClick={props.saveCurrentRN}>
          Save
        </button>
      </div>
      {props.saved.length
        ? <div className={classes.savedWisdoms}>
          <h3>
            Saved wisdoms
          </h3>
          <ul>
            {props.saved.map(rn =>
              <li key={rn.id}>
                {rn.value}
              </li>
            )}
          </ul>
        </div>
        : null
      }
    </div>
  )
}

ReleaseNote.propTypes = {
  rn: React.PropTypes.object,
  errors: React.PropTypes.object,
  selectedDate: React.PropTypes.object,
  repoName: React.PropTypes.object,
  saved: React.PropTypes.array.isRequired,
  fetchRepository: React.PropTypes.func.isRequired,
  saveCurrentRN: React.PropTypes.func.isRequired,
  onChangeRepoName: React.PropTypes.func.isRequired,
  onSubmitForm: React.PropTypes.func.isRequired,
  onChangeDatePicker: React.PropTypes.func.isRequired
}


export default ReleaseNote
