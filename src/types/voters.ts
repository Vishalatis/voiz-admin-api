// ----------------------------------------------------------------------

export type IVotersFilterValue = string | string[];

export type IVotersFilters = {
  roles: string[];
  experience: string;
  locations: string[];
  benefits: string[];
  employmentTypes: string[];
};

// ----------------------------------------------------------------------

export type IVotersCandidate = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
};

export type IVotersCompany = {
  name: string;
  logo: string;
  phoneNumber: string;
  fullAddress: string;
};

export type IVotersSalary = {
  type: string;
  price: number;
  negotiable: boolean;
};

export type IVotersItem = {
  id: string;
  role: string;
  title: string;
  content: string;
  publish: string;
  createdAt: Date;
  skills: string[];
  expiredDate: Date;
  totalViews: number;
  totalVoters: string;
  salary: IVotersSalary;
  benefits: string[];
  locations: string[];
  company: IVotersCompany;
  employmentTypes: string[];
  workingSchedule: string[];
  candidates: IVotersCandidate[];
};
