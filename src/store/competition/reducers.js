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
  loadVotedCompetitions: (state, payload) => {
    state.votedCompetitions = payload.payload
  },
}
