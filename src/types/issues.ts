// ----------------------------------------------------------------------

export type IIssuesFilterValue = string | string[] | Date | IIssuesGuide[] | null;

export type IIssuesFilters = {
  IssuesGuides: IIssuesGuide[];
  destination: string[];
  services: string[];
  startDate: Date | null;
  endDate: Date | null;
};

// ----------------------------------------------------------------------

export type IIssuesGuide = {
  id: string;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
};

export type IIssuesBooker = {
  id: string;
  name: string;
  avatarUrl: string;
  guests: number;
};

export type IIssuesItem = {
  id: string;
  name: string;
  price: number;
  totalViews: number;
  tags: string[];
  content: string;
  publish: string;
  images: string[];
  durations: string;
  priceSale: number;
  services: string[];
  destination: string;
  ratingNumber: number;
  bookers: IIssuesBooker[];
  IssuesGuides: IIssuesGuide[];
  createdAt: Date;
  available: {
    startDate: Date;
    endDate: Date;
  };
};
