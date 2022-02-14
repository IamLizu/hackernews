import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNews } from "../../context/NewsContext";
import { NewsParamType, NewsType } from "../../types";

export default function NewsItem() {
  const params = useParams<keyof NewsParamType>() as NewsParamType;
  const { oldPosts } = useNews();
  const navigate = useNavigate();

  const newsCreatedAtI = parseInt(params.id);

  const news = oldPosts.find(
    (item: NewsType) => item.created_at_i === newsCreatedAtI
  );

  const newsString = JSON.stringify(news, null, 2);

  return (
    <>
      <div
        className="flex justify-center items-center flex-col space-y-4 my-5"
        data-testid="news-details"
      >
        <div>
          {news?.url ? (
            <pre>{newsString}</pre>
          ) : (
            <pre className="text-center">{newsString}</pre>
          )}
        </div>
      </div>
    </>
  );
}
