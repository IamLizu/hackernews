export type NewsType = {
  created_at: Date;
  title: string;
  url: string;
  author: string;
  objectID: string;
  created_at_i: number;
};

export type NewsArrayType = NewsType[];

export type NewsContextType = {
  oldPosts: NewsArrayType;
  currentItems: NewsArrayType | null;
  handlePageClick: (e: unknown, selectedPage: number) => void;
  pageCount: number;
  currentPage: number;
};

export type NewsParamType = {
  id: string;
};
