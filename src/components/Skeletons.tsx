import { Skeleton } from "@chakra-ui/react";
import { useAppSelector } from "../redux/store";

const Skeletons = () => {
  const { status } = useAppSelector((state) => state.articles);
  return (
    <>
      {status === "loading" && (
        <div className="skeletons">
          <Skeleton height="100px" width="600px" />
          <Skeleton height="100px" width="600px" />
          <Skeleton height="100px" width="600px" />
          <Skeleton height="100px" width="600px" />
          <Skeleton height="100px" width="600px" />
        </div>
      )}
    </>
  );
};

export default Skeletons;
