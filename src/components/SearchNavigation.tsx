import { Button, Input } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { fetchArticles, reset } from "../redux/articleSlice";
import { useAppDispatch } from "../redux/store";

interface Props {
  input: string;
  setInput: (value: string) => void;
}

const SearchNavigation: React.FC<Props> = ({ input, setInput }) => {
  const dispatch = useAppDispatch(); // dispatch functions to modify the redux store
  const inputRef = useRef<HTMLInputElement>(null); // reference to input element so on component mount we can focus it

  // Search button fetch function, input cannot be empty
  const fetchByKeyword = () => {
    if (inputRef.current?.value.length !== 0) {
      dispatch(reset());
      dispatch(fetchArticles(input));
    }
  };

  // on component mount we focus the input element
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <nav>
        <Input
          ref={inputRef}
          type="text"
          width="auto"
          placeholder="Keyword"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={fetchByKeyword}>Search</Button>
      </nav>
      <p style={{ color: "red" }}>
        {inputRef.current?.value.length === 0 && "Cant be empty!"}
      </p>
    </>
  );
};

export default SearchNavigation;
