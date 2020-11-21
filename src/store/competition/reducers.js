export const competitionReducers = {
  competitionsLoaded: (state, action) => {
    state.competitions = action.payload || []
    state.isLoading = false
    state.isError = false
  },
  competitionsLoading: state => {
    state.isLoading = true
    state.isError = false
  },
  competitionError: state => {
    state.isLoading = false
    state.isError = true
  },
  loadVotedCompetitions: (state, action) => {
    state.votedCompetitions = action.payload
  },
  saveApplied: state => {
    state.hasApplied = true
  },
  saveAppliedPhoto: (state, action) => {
    state.appliedPhoto = action.payload
  },
}
