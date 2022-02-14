import axios from "axios";
import React from "react";
import { useIsMounted } from "../hooks/useIsMounted";
import { NewsArrayType, NewsContextType } from "../types";

const NewsContext = React.createContext<NewsContextType>({
  oldPosts: [],
  currentItems: [],
  handlePageClick: () => {},
  pageCount: 0,
  currentPage: 1,
});

export const useNews = () => React.useContext(NewsContext);

export function NewsProvider({
  children,
}: {
  children: React.ReactChild | React.ReactChild[];
}) {
  const REQUEST_URL =
    "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=";

  const page = React.useRef(0);
  const itemsPerPage = 20;

  const [oldPosts, setOldPosts] = React.useState<NewsArrayType | []>([]);
  const [currentItems, setCurrentItems] = React.useState<NewsArrayType | null>(
    null
  );
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const isMounted = useIsMounted();

  const fetchNews = React.useCallback(async () => {
    try {
      const { data } = await axios.get(REQUEST_URL + page.current);
      isMounted() && setOldPosts((o) => o.concat(data.hits));
      page.current++;
    } catch (error) {
      console.log(error);
    }
  }, [isMounted]);

  const handlePageClick = (e: unknown, selectedPage: number) => {
    const newOffset = ((selectedPage - 1) * itemsPerPage) % oldPosts.length;
    setItemOffset(newOffset);
    setCurrentPage(selectedPage);
  };

  React.useEffect(() => {
    let source = axios.CancelToken.source();

    fetchNews();

    return () => source.cancel();
  }, [fetchNews]);

  React.useEffect(() => {
    let source = axios.CancelToken.source();

    setInterval(() => {
      fetchNews();
    }, 10000);

    return () => source.cancel();
  }, [fetchNews]);

  React.useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(oldPosts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(oldPosts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, oldPosts]);

  const contextValue = {
    oldPosts,
    currentItems,
    handlePageClick,
    pageCount,
    currentPage,
  };

  return (
    <NewsContext.Provider value={contextValue}>{children}</NewsContext.Provider>
  );
}
