/* @flow */
import { connect } from 'react-redux'
import { fetchRepository, saveCurrentRN, onChangeRepoName, onSubmitForm } from '../modules/releaseNotes'

import ReleaseNote from '../components/ReleaseNote'

import type { ReleaseNoteObject } from '../interfaces/releaseNote'

const mapActionCreators: {fetchRepository: Function, saveCurrentRN: Function, onChangeRepoName: Function, onSubmitForm: Function} = {
  fetchRepository,
  saveCurrentRN,
  onChangeRepoName,
  onSubmitForm
}

const mapStateToProps = (state): { rn: ?ReleaseNoteObject, saved: Array<ReleaseNoteObject> } => ({
  rn: state.rn.rns.find(rn => rn.id === state.rn.current),
  saved: state.rn.rns.filter(rn => state.rn.saved.indexOf(rn.id) !== -1),
  errors: state.rn.errors.length > 0 ? state.rn.errors[0] : undefined
})


export default connect(mapStateToProps, mapActionCreators)(ReleaseNote)
