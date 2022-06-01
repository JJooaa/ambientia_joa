import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleContext } from "../App";
import { useAppSelector } from "../redux/store";

const ArticlesList = () => {
  const [currentArticle, setCurrentArticle] = useContext(ArticleContext);
  const { status, value } = useAppSelector((state) => state.articles);
  const navigate = useNavigate();

  return (
    <section id="articles-list">
      {status === "succeeded" &&
        value.map((article: { title: string; urlToImage: string }) => (
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
    </section>
  );
};

export default ArticlesList;
