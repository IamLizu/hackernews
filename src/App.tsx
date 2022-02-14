import React from "react";
import { Route, Routes } from "react-router-dom";
import News from "./components/News";
import NewsItem from "./components/News/Item";
import { NewsProvider } from "./context/NewsContext";

function App() {
  return (
    <>
      <NewsProvider>
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/news/:id" element={<NewsItem />} />
          <Route path="*" element={<p>404</p>} />
        </Routes>
      </NewsProvider>
    </>
  );
}

export default App;
