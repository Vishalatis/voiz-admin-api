// ----------------------------------------------------------------------

export type ISocialFilterValue = string | string[] | number | number[];

// ----------------------------------------------------------------------

export type ISocialItem = {
  includes(service: string): unknown;
  id: string;
  name: string;
  userImgUrl: string;
  email: string;
  publishedDate: Date;
  title: string;
  postImg: string;
  location: string;
  views: string;
  likes: string;
  comments: string;
  share: string;
  service: string;
};

export type ISocialTableFilterValue = string | string[];

export type ISocialTableFilters = {
  services: string[];
};
