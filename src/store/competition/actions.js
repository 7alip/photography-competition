import { competitionSlice } from './slice'

export const {
  competitionsLoaded,
  competitionsLoading,
  competitionError,
  loadVotedCompetitions,
  saveApplied,
  saveAppliedPhoto,
} = competitionSlice.actions
