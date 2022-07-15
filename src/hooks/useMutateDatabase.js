import { useMoralisQuery } from "react-moralis";

export const useMutateDatabase = (classTableName) => {
  const { data, fetch } = useMoralisQuery(
    classTableName,
    (query) => query,
    [],
    { live: true }
  );
  return { data, fetch };
};

export default useMutateDatabase;
