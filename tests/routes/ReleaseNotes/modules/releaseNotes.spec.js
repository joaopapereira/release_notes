import {
  REQUEST_RN,
  RECEIVE_RN,
  SAVE_CURRENT_RN,
  REQUEST_COMMITS,
  RECEIVE_COMMITS,
  REQUEST_ISSUES,
  RECEIVE_ISSUES,
  CHANGE_REPO_NAME,
  ON_SUBMIT_FORM,
  FETCH_ERROR,
  CHANGE_DATE,
  onChangeRepoName,
  // increment,
  // doubleAsync,
  default as rnReducer
} from 'routes/ReleaseNotes/modules/releaseNotes'

describe('(Redux Module) ReleaseNotes', () => {
  it('Should export a constant REQUEST_RN.', () => {
    expect(REQUEST_RN).to.equal('REQUEST_RELEASE_NOTE')
  })
  it('Should export a constant RECEIVE_RN.', () => {
    expect(RECEIVE_RN).to.equal('RECIEVE_RELEASE_NOTE')
  })
  it('Should export a constant SAVE_CURRENT_RN.', () => {
    expect(SAVE_CURRENT_RN).to.equal('SAVE_CURRENT_RELEASE_NOTE')
  })
  it('Should export a constant REQUEST_COMMITS.', () => {
    expect(REQUEST_COMMITS).to.equal('REQUEST_COMMITS')
  })
  it('Should export a constant RECEIVE_COMMITS.', () => {
    expect(RECEIVE_COMMITS).to.equal('RECEIVE_COMMITS')
  })
  it('Should export a constant REQUEST_ISSUES.', () => {
    expect(REQUEST_ISSUES).to.equal('REQUEST_ISSUES')
  })
  it('Should export a constant RECEIVE_ISSUES.', () => {
    expect(RECEIVE_ISSUES).to.equal('RECEIVE_ISSUES')
  })
  it('Should export a constant CHANGE_REPO_NAME.', () => {
    expect(CHANGE_REPO_NAME).to.equal('CHANGE_REPO_NAME')
  })
  it('Should export a constant ON_SUBMIT_FORM.', () => {
    expect(ON_SUBMIT_FORM).to.equal('ON_SUBMIT_FORM')
  })
  it('Should export a constant FETCH_ERROR.', () => {
    expect(FETCH_ERROR).to.equal('FETCH_ERROR')
  })
  it('Should export a constant CHANGE_DATE.', () => {
    expect(CHANGE_DATE).to.equal('CHANGE_DATE')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(rnReducer).to.be.a('function')
    })

    it('Should initialize with a state', () => {
      expect(rnReducer(undefined, {}).fetching).to.equal(false)
      expect(rnReducer(undefined, {}).current).to.equal(null)
      expect(rnReducer(undefined, {}).rns).to.be.empty
      expect(rnReducer(undefined, {}).saved).to.be.empty
      expect(rnReducer(undefined, {}).missingIssues).to.equal(0)
      expect(rnReducer(undefined, {}).repoName).to.equal('')
      expect(rnReducer(undefined, {}).errors).to.be.empty
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = rnReducer(undefined, {})
      expect(state.repoName).to.equal('')
      state = rnReducer(state, { type: '@@@@@@@' })
      expect(state.repoName).to.equal('')
      state = rnReducer(state, onChangeRepoName({ target: { value: 'new name' } }))
      expect(state.repoName).to.equal('new name')
      state = rnReducer(state, { type: '@@@@@@@' })
      expect(state.repoName).to.equal('new name')
    })
  })
/*
  describe('(Action Creator) increment', () => {
    it('Should be exported as a function.', () => {
      expect(increment).to.be.a('function')
    })

    it('Should return an action with type "COUNTER_INCREMENT".', () => {
      expect(increment()).to.have.property('type', COUNTER_INCREMENT)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(increment(5)).to.have.property('payload', 5)
    })

    it('Should default the "payload" property to 1 if not provided.', () => {
      expect(increment()).to.have.property('payload', 1)
    })
  })

  describe('(Action Creator) doubleAsync', () => {
    let _globalState
    let _dispatchSpy
    let _getStateSpy

    beforeEach(() => {
      _globalState = {
        counter : counterReducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          counter : counterReducer(_globalState.counter, action)
        }
      })
      _getStateSpy = sinon.spy(() => {
        return _globalState
      })
    })

    it('Should be exported as a function.', () => {
      expect(doubleAsync).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(doubleAsync()).to.be.a('function')
    })

    it('Should return a promise from that thunk that gets fulfilled.', () => {
      return doubleAsync()(_dispatchSpy, _getStateSpy).should.eventually.be.fulfilled
    })

    it('Should call dispatch and getState exactly once.', () => {
      return doubleAsync()(_dispatchSpy, _getStateSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
          _getStateSpy.should.have.been.calledOnce
        })
    })

    it('Should produce a state that is double the previous state.', () => {
      _globalState = { counter: 2 }

      return doubleAsync()(_dispatchSpy, _getStateSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
          _getStateSpy.should.have.been.calledOnce
          expect(_globalState.counter).to.equal(4)
          return doubleAsync()(_dispatchSpy, _getStateSpy)
        })
        .then(() => {
          _dispatchSpy.should.have.been.calledTwice
          _getStateSpy.should.have.been.calledTwice
          expect(_globalState.counter).to.equal(8)
        })
    })
  })

  // NOTE: if you have a more complex state, you will probably want to verify
  // that you did not mutate the state. In this case our state is just a number
  // (which cannot be mutated).
  describe('(Action Handler) COUNTER_INCREMENT', () => {
    it('Should increment the state by the action payload\'s "value" property.', () => {
      let state = counterReducer(undefined, {})
      expect(state).to.equal(0)
      state = counterReducer(state, increment(1))
      expect(state).to.equal(1)
      state = counterReducer(state, increment(2))
      expect(state).to.equal(3)
      state = counterReducer(state, increment(-3))
      expect(state).to.equal(0)
    })
  })
  */
})
