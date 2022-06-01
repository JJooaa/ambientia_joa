import { useAppSelector } from "../redux/store";

const Errors = () => {
  const { status, value } = useAppSelector((state) => state.articles);

  return (
    <>
      {status === "failed" && (
        <p>Error, try to refresh page and type a new keyword!</p>
      )}
      {value.length === 0 && status === "succeeded" && (
        <p>Found no matches, try a different keyword!</p>
      )}
    </>
  );
};

export default Errors;
