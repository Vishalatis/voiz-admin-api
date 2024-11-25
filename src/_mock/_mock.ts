import { sub } from 'date-fns';

import { ASSETS_API } from 'src/config-global';

import {
  _id,
  _dob,
  _ages,
  _roles,
  _prices,
  _emails,
  _gender,
  _states,
  _ratings,
  _nativeS,
  _nativeM,
  _nativeL,
  _regions,
  _percents,
  _booleans,
  _ministry,
  _district,
  _sentences,
  _lastNames,
  _fullNames,
  _tourNames,
  _jobTitles,
  _taskNames,
  _ageGroups,
  _postTitles,
  _firstNames,
  _IssueNames,
  _passedInLs,
  _passedInRs,
  _fullAddress,
  _companyNames,
  _productNames,
  _descriptions,
  _phoneNumbers,
  _constituency,
  _introducedInLsRS,
  _legislativeTitles,
} from './assets';

// ----------------------------------------------------------------------

export const _mock = {
  id: (index: number) => _id[index],
  time: (index: number) => sub(new Date(), { days: index, hours: index }),
  boolean: (index: number) => _booleans[index],
  role: (index: number) => _roles[index],
  regions: (index: number) => _regions[index],
  states: (index: number) => _states[index],
  district: (index: number) => _district[index],
  constituency: (index: number) => _constituency[index],
  ageGroups: (index: number) => _ageGroups[index],
  // Text
  taskNames: (index: number) => _taskNames[index],
  postTitle: (index: number) => _postTitles[index],
  jobTitle: (index: number) => _jobTitles[index],
  tourName: (index: number) => _tourNames[index],
  IssueName: (index: number) => _IssueNames[index],
  productName: (index: number) => _productNames[index],
  sentence: (index: number) => _sentences[index],
  description: (index: number) => _descriptions[index],
  // Contact
  email: (index: number) => _emails[index],
  gender: (index: number) => _gender[index],
  dob: (index: number) => _dob[index],
  phoneNumber: (index: number) => _phoneNumbers[index],
  fullAddress: (index: number) => _fullAddress[index],
  // Name
  firstName: (index: number) => _firstNames[index],
  lastName: (index: number) => _lastNames[index],
  fullName: (index: number) => _fullNames[index],
  companyName: (index: number) => _companyNames[index],
  // Number
  number: {
    percent: (index: number) => _percents[index],
    rating: (index: number) => _ratings[index],
    age: (index: number) => _ages[index],
    price: (index: number) => _prices[index],
    nativeS: (index: number) => _nativeS[index],
    nativeM: (index: number) => _nativeM[index],
    nativeL: (index: number) => _nativeL[index],
  },

  // legislative

  legislativeTitle: (index: number) => _legislativeTitles[index],
  ministry: (index: number) => _ministry[index],
  introducedInLsRS: (index: number) => _introducedInLsRS[index],
  passedInLs: (index: number) => _passedInLs[index],
  passedInRs: (index: number) => _passedInRs[index],
  // Image
  image: {
    cover: (index: number) => `${ASSETS_API}/assets/images/cover/cover_${index + 1}.jpg`,
    avatar: (index: number) => `${ASSETS_API}/assets/images/avatar/avatar_${index + 1}.jpg`,
    travel: (index: number) => `${ASSETS_API}/assets/images/travel/travel_${index + 1}.jpg`,
    company: (index: number) => `${ASSETS_API}/assets/images/company/company_${index + 1}.png`,
    product: (index: number) => `${ASSETS_API}/assets/images/company/company${index + 1}.jpg`,
    portrait: (index: number) => `${ASSETS_API}/assets/images/portrait/portrait_${index + 1}.jpg`,
  },
};
