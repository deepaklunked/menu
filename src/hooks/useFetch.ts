import { useEffect, useMemo, useState } from "react";
import { APIResponse, Product } from "../types";
import { simplifyProducts } from "../utils/transformData";

export const useFetch = (url: string, searchQuery?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  // assuming we are using data from https://dummyjson.com/products
  const [data, setData] = useState<Product[]>();

  const constructedUrl = useMemo(
    () => `${url}${searchQuery ? `/search?q=${searchQuery}` : ""}`,
    [searchQuery, url]
  );

  useEffect(() => {
    setIsLoading(true);
    fetch(constructedUrl)
      .then((response) => response.json())
      .then((data: APIResponse) => {
        console.log("@@@ API Response", data);
        setData(simplifyProducts(data));
      })
      .catch((error) => {
        console.log("Fetch errored: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [constructedUrl]);

  return {
    isLoading,
    data,
  };
};
