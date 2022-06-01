import { Button } from "@chakra-ui/react";
import { decrement, fetchArticles, increment } from "../redux/articleSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const PagesNavigation = ({ input }: { input: string }) => {
  const { value, pageNumber } = useAppSelector((state) => state.articles); // the articles and pageNumber
  const dispatch = useAppDispatch(); // dispatch functions to modify the redux store

  const handleNextPage = () => {
    dispatch(increment());
    dispatch(fetchArticles(input));
  };

  const handlePreviusPage = () => {
    if (pageNumber > 1) {
      dispatch(decrement());
      dispatch(fetchArticles(input));
    }
  };

  // show the previus and next button if we have searched for something and we get results
  return (
    <>
      {value.length !== 0 && (
        <nav>
          <Button onClick={handlePreviusPage}>Previous</Button>
          <Button onClick={handleNextPage}>Next</Button>
        </nav>
      )}
    </>
  );
};
