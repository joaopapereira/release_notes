/* @flow */
import React from 'react'
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
        <div className='pr-merged-element' key={props.rn.id + pr.id}>
          {pr.issue ? pr.issue.title : ''}
          <a href={pr.issue ? pr.issue.html_url : '#'}>{pr.issue ? pr.issue.number : ''}</a>
          by ({pr.user.login})
        </div>
      )
    })
  };
  return (
    <div className='col-md-12'>
      <div className='row'>
        {(props.errors !== undefined) ? <div>
          <p>Something wrong happened while {props.errors.actionDone}</p>
          <p>{props.errors.errorMessage}</p>
        </div>
        : null
        }
      </div>

      <div className='col-md-6 pull-right'>
        <div className='row'>
          {(props.rn && props.errors === undefined) ? <div className='white-bg'>
            <div className='rn-box-title'>
              <div className='col-md-2'>
                Repository: {props.rn.full_name}
              </div>
              <div className='col-md-4 pull-right'>
                {props.selectedDate.format('MMMM Do YYYY')}<br />
              </div>
            </div>
            <div className='rn-box-content'>
              <div className='pr-list'>
                {allPRs}
              </div>
            </div>
          </div>
            : null
          }
        </div>
      </div>
      <div className='col-md-6 pull-left'>
        <form onSubmit={props.onSubmitForm}>
          <div className='row white-bg'>
            <div className='rn-box-title'>
              Parameters for release note
            </div>
            <div className='rn-box-content'>
              <div className='col-md-8'>
                Repository name(Ex: gitusername/repository_name):
              </div>
              <div className='col-md-4'>
                <input type='text' name='repo_name' value={props.repoName} onChange={props.onChangeRepoName} />
              </div>
              <div className='row'>
                <div className='col-md-8'>
                  Release initial date
                </div>
                <div className='col-md-4'>
                  <DatePicker selected={props.selectedDate} onChange={props.onChangeDatePicker} />
                </div>
              </div>
            </div>
          </div>
        </form>
        <button className='btn btn-default' onClick={props.fetchRepository}>
          Fetch a Release Note
        </button>
      </div>
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
