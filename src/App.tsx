import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ArticlesPage from "./components/ArticlesPage";
import Article from "./components/Article";
import { createContext, useState } from "react";
import "./styles/index.css";


/*

Moikka Ambientian väki. 

Tein tälläsen artikkeli etsintä sivun, tein sen antamienne ohjeiden mukaisesti.
Käytin Reactin erilaisia toimintoja kuten;

Siinä on muutamia bugeja kuten se, että jos menee sivuja eteenpäin niin jossain vaiheessa se API ei enään anna niitä artikkeleita. NewsApi on vähän kömpelö.

---- Hookit ----
  - createContext, useContext
  - useState
  - useRef
  - useEffect
----------------

---- Kirjastot ----
  - React Router
  - Redux Toolkit
  - Axios
  - Chakra UI
  - Vite 
------------------- 
*/


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
