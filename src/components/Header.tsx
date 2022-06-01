import { Spinner } from "@chakra-ui/react";
import { useAppSelector } from "../redux/store";

const Header = () => {
  const status = useAppSelector((state) => state.articles.status);

  return (
    <header style={{ textAlign: "center" }}>
      {status === "loading" && <Spinner className="spinner" size="xl" />}
      <h1>
        The latest <strong>HOT </strong>news articles
      </h1>
      <p>
        Search for popular news by <span style={{ color: "red" }}>keyword</span>
      </p>
    </header>
  );
};

export default Header;
