import ReleaseNotesRoute from 'routes/ReleaseNotes'

describe('(Route) Release Notes', () => {
  let _route

  beforeEach(() => {
    _route = ReleaseNotesRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `release_notes`', () => {
    expect(_route.path).to.equal('release_notes')
  })
})
