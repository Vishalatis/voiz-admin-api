// ----------------------------------------------------------------------

export type ILegislativeTableFilterValue = string | string[];

export type ILegislativeTableFilters = {
  name: string;
  ministry: string[];
};

// ----------------------------------------------------------------------
export type ILegislativeItem = {
  id: string;
  title: string;
  ministry: string;
  introducedInLsRS: Date;
  passedInLs: Date;
  passedInRs: Date;
};
