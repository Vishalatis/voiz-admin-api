// ----------------------------------------------------------------------

export type IOpinionFilterValue = string | string[] | number | number[];

// ----------------------------------------------------------------------

export type IOpinionItem = {
  includes(service: string): unknown;
  id: string;
  region: string;
  img: string;
  votingCount: string;
  publishedDate: Date;
  desc: string;
  service: string;
};

export type IOpinionTableFilterValue = string | string[];

export type IOpinionTableFilters = {
  services: string[];
};
