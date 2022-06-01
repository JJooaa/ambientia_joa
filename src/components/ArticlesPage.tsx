import { useState } from "react";
import "../styles/main.css";
import Header from "./Header";
import SearchNavigation from "./SearchNavigation";
import { PagesNavigation } from "./PagesNavigation";
import Skeletons from "./Skeletons";
import Errors from "./Errors";
import ArticlesList from "./ArticlesList";

function ArticlesPage() {
  const [input, setInput] = useState(""); // input for text field keyword criteria

  return (
    <div className="main">
      <Header />
      <SearchNavigation setInput={setInput} input={input} />
      <PagesNavigation input={input} />
      <Skeletons />
      <ArticlesList />
      <Errors />
    </div>
  );
}

export default ArticlesPage;
