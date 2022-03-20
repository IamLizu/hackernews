import React from "react";
import { useNews } from "../../context/NewsContext";
import NewsBlock from "./Block";
import { Pagination, PaginationItem } from "@mui/material";

export default function News() {
  const { currentItems, handlePageClick, pageCount, currentPage } = useNews();

  return (
    <div data-testid="news-list" className="m-10 space-y-10">
      <p className="text-2xl font-medium text-gray-700 tracking-widest ">
        HackerNews
      </p>

      {currentItems?.length !== 0 ? (
        <div className="space-y-5" data-testid="news-block">
          {currentItems && <NewsBlock newsArray={currentItems} />}

          <Pagination
            data-testid={"pagination"}
            count={pageCount}
            page={currentPage}
            onChange={handlePageClick}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
