import { competitionSlice } from './slice'

export const {
  competitionsLoaded,
  competitionsLoading,
  competitionError,
  loadVotedCompetitions,
} = competitionSlice.actions
