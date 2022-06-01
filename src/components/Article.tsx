import { useContext, useEffect } from "react";
import { ArticleContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import Header from "./Header";

const Article = () => {
  const [currentArticle, setCurrentArticle] = useContext(ArticleContext);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checkIfAuthorExists = () => {
    return currentArticle.author === null
      ? "No specified author"
      : currentArticle.author;
  };

  if (!currentArticle) {
    return (
      <div style={errorStyle}>
        Failed to load current article, go back home and try again
        <Button onClick={() => navigate("/")}>Home</Button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <Button onClick={() => navigate("/")}>Go back</Button>
      </div>
      <article className="article-detail">
        <h1>{currentArticle.title}</h1>
        <div>
          <p>{checkIfAuthorExists()}</p>
          <time>{currentArticle.publishedAt.slice(0, 10)}</time>
        </div>
        <img src={currentArticle.urlToImage} alt="" />
        <br />
        <p>{currentArticle.content}</p>
        <br />
        <p>
          Read more here{" "}
          <span style={{ color: "blue", textDecoration: "underline" }}>
            <a href={currentArticle.url}>Link</a>
          </span>
        </p>
        <p>
          Source:{" "}
          <span style={{ fontWeight: "bold" }}>
            {currentArticle.source.name}
          </span>
        </p>
      </article>
    </>
  );
};

const errorStyle = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: 20,
  justifyContent: "center",
  alignItems: "center",
} as any;

export default Article;
