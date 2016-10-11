/* @flow */
import { connect } from 'react-redux'
import { fetchRepository, saveCurrentRN } from '../modules/releaseNotes'

import ReleaseNote from '../components/ReleaseNote'

import type { ReleaseNoteObject } from '../interfaces/releaseNote'

const mapActionCreators: {fetchRepository: Function, saveCurrentRN: Function} = {
  fetchRepository,
  saveCurrentRN
}

const mapStateToProps = (state): { rn: ?ReleaseNoteObject, saved: Array<ReleaseNoteObject> } => ({
  rn: state.rn.rns.find(rn => rn.id === state.rn.current),
  saved: state.rn.rns.filter(rn => state.rn.saved.indexOf(rn.id) !== -1)
})

export default connect(mapStateToProps, mapActionCreators)(ReleaseNote)
