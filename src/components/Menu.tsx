import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useFetch } from "../hooks/useFetch";
import {
  fillDummyCategory,
  filterMenuOptions,
  groupProductsByCategory,
  prepareMenuOptions,
  updateMenuSelection,
} from "../utils/transformData";
import MenuList from "./MenuList";
import { MenuOption } from "../types";

const MenuContainer = styled.span``;

const LoadingContainer = styled.div`
  padding: 16px;
`;

interface Props {
  fetchURL: string;
  isExternalFilter?: boolean;
}

export default function Menu({ fetchURL, isExternalFilter = false }: Props) {
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useFetch(fetchURL, isExternalFilter ? searchQuery : undefined);

  const toggleMenuSelection = useCallback(
    (parentIndex: number[]) => {
      setMenuOptions((prev) =>
        updateMenuSelection(prev, parentIndex)
      );
    },
    []
  );

  const handleSearchInputChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);


  useEffect(() => {
    const dataByCategory = fillDummyCategory(
      groupProductsByCategory(data ?? [])
    );
    const menuOptions = prepareMenuOptions(dataByCategory);
    const filteredMenuOptions = isExternalFilter ? menuOptions : filterMenuOptions(menuOptions, searchQuery);
    setMenuOptions(filteredMenuOptions);
  }, [data, isExternalFilter, searchQuery]);

  return (
    <MenuContainer>
      {data == null ? (
        <LoadingContainer>Loading...</LoadingContainer>
      ) : (
        <MenuList
          data={menuOptions}
          parentIndex={[]}
          searchQuery={searchQuery}
          onInputChange={handleSearchInputChange}
          onSelect={toggleMenuSelection}
        />
      )}
    </MenuContainer>
  );
}
