import { useContext, useEffect, useRef, useState } from "react";
import { fetchArticles } from "../redux/articleSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import "./Articles.css";
import { useNavigate } from "react-router-dom";
import { Input, Button, Spinner, Skeleton } from "@chakra-ui/react";
import { ArticleContext } from "../App";
import Header from "./Header";
import { increment } from "../redux/articleSlice";

function ArticlesList() {
  const dispatch = useAppDispatch(); // dispatch functions to modify the redux store

  const articles = useAppSelector((state) => state.articles.value); // lists all the articles from redux store
  const status = useAppSelector((state) => state.articles.status); // gives me status of redux async thunk
  const pageNumber = useAppSelector((state) => state.articles.pageNumber);
  const navigate = useNavigate(); // react router dom navigate hook to allow going to different urls

  const [input, setInput] = useState(""); // input for text field keyword criteria

  const [currentArticle, setCurrentArticle] = useContext(ArticleContext); // the clicked article, we can access it globally with react context

  const inputRef = useRef<HTMLInputElement>(null); // reference to input element so on component mount we can focus it

  const handleNextPage = () => {
    dispatch(increment());
    dispatch(fetchArticles(input));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="main">
      {status === "loading" && <Spinner className="spinner" size="xl" />}
      <Header />
      <nav>
        <Input
          ref={inputRef}
          type="text"
          width="auto"
          placeholder="Keyword"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          onClick={() =>
            dispatch(
              fetchArticles({ keyword: input, page: pageNumber.toString() })
            )
          }
        >
          Search
        </Button>
      </nav>
      {articles.length !== 0 && (
        <nav>
          <Button onClick={handleNextPage}>Next</Button>
        </nav>
      )}

      <section id="articles-list">
        {status === "loading" && (
          <div className="skeletons">
            <Skeleton height="100px" width="600px" />
            <Skeleton height="100px" width="600px" />
            <Skeleton height="100px" width="600px" />
            <Skeleton height="100px" width="600px" />
            <Skeleton height="100px" width="600px" />
          </div>
        )}

        {status === "succeeded" &&
          articles.map((article: { title: string; urlToImage: string }) => (
            <article
              key={article.title}
              className="article-small"
              onClick={() => {
                setCurrentArticle(article);
                navigate(`${article.title}`);
              }}
            >
              <img src={article.urlToImage} alt="" />
              <h4>{article.title}</h4>
            </article>
          ))}

        {status === "failed" && (
          <p>Failed to retrieve data, try typing in a keyword!</p>
        )}
        {articles.length === 0 && status === "succeeded" && (
          <p>Found no matches, try a different keyword!</p>
        )}
      </section>
    </div>
  );
}

export default ArticlesList;
