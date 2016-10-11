/* @flow */
import React from 'react'
import classes from './ReleaseNotes.scss'

import type { ReleaseNoteObject } from '../interfaces/releaseNote'

type Props = {
  rn: ?ReleaseNoteObject,
  saved: Array<ReleaseNoteObject>,
  fetchRepository: Function,
  saveCurrentRN: Function
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
          {props.rn ? <div>
            <h5>
              Repository: {props.rn.full_name}
            </h5>
            <div>
              Release note:<br />
              {allPRs}
            </div>
          </div>
            : null
          }
        </div>
        <form>
          <input type="text" name="repo_name" onChange={this.handleChange}/>
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
  saved: React.PropTypes.array.isRequired,
  fetchRepository: React.PropTypes.func.isRequired,
  saveCurrentRN: React.PropTypes.func.isRequired
}
ReleaseNote.prototype.handleChange = function() {
  
}

export default ReleaseNote
