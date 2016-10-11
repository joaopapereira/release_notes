import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'release_notes',
  getComponent (nextState, next) {
    require.ensure([
      './containers/ReleaseNotesContainer',
      './modules/releaseNotes'
    ], (require) => {
      const ReleaseNotes = require('./containers/ReleaseNotesContainer').default
      const releaseNotesReducer = require('./modules/releaseNotes').default

      injectReducer(store, {
        key: 'rn',
        reducer: releaseNotesReducer
      })

      next(null, ReleaseNotes)
    })
  }
})
