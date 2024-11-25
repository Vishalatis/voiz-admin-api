import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const _legislativeList = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.legislativeTitle(index),
  ministry: _mock.ministry(index),
  introducedInLsRS: new Date(_mock.introducedInLsRS(index)).toDateString(), // Ensure this returns a Date object
  passedInLs: new Date(_mock.passedInLs(index)).toDateString(), // Ensure this returns a Date object
  passedInRs: new Date(_mock.passedInRs(index)).toDateString(), // Ensure this returns a Date object
}));
