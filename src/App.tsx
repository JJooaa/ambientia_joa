import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ArticlesPage from "./components/ArticlesPage";
import Article from "./components/Article";
import { createContext, useState } from "react";
import "./styles/index.css";

export const ArticleContext = createContext<any>(null);

function App() {
  const [currentArticle, setCurrentArticle] = useState(null);

  return (
    <ArticleContext.Provider value={[currentArticle, setCurrentArticle]}>
      <ChakraProvider>
        <Router>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<ArticlesPage />} />
              <Route path="/:articleId" element={<Article />} />
              <Route path="*" element={<div>Error...</div>} />
            </Routes>
          </Provider>
        </Router>
      </ChakraProvider>
    </ArticleContext.Provider>
  );
}

export default App;
