import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { MenuOption } from "../types";
import SearchInput from "./SearchInput";

const MenuListWrapper = styled.div`
  position: relative;
  padding: 8px 0;
  box-sizing: border-box;
  min-width: 200px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 2px 2px 2px #9c9c9c;

  /* border: 1px solid green; */
`;

const MenuItemWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 8px 16px;
  gap: 8px;

  /* border: 1px solid red; */

  &:hover {
    background-color: #f0f0f0;
  }

  &:hover > div {
    display: flex;
  }
`;

const MenuItem = styled.div`
  flex: 1;

  /* border: 1px solid blue; */
`;

const MenuDetail = styled.div`
  display: flex;
  align-items: center;

  /* border: 1px solid brown; */
`;

const SubMenuWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  display: none;
  z-index: 10;
  background: white;
  border: 1px solid #ccc;
`;

interface Props {
  data: MenuOption[];
  parentIndex: number[];
  searchQuery?: string;
  onInputChange?: (query: string) => void;
  onSelect: (parentIndex: number[]) => void;
}

export default function MenuList({
  data,
  parentIndex,
  searchQuery,
  onInputChange,
  onSelect,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSubMenu, setShowSubMenu] = useState<MenuOption[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleMouseEnter = (index: number, subMenus: MenuOption[]) => {
    setShowSubMenu(subMenus);
    setSelectedIndex(index);
  };

  const handleMouseLeave = () => {
    setShowSubMenu([]);
    setSelectedIndex(-1);
  };

  const handleClick = useCallback(
    (index: number) => {
      onSelect([...parentIndex, index]);
      setSelectedIndex(index);
    },
    [onSelect, parentIndex]
  );

  useEffect(() => {
    if (selectedIndex !== -1) {
      setShowSubMenu(data[selectedIndex].subMenus)
    }
  }, [data, selectedIndex])

  return (
    <MenuListWrapper>
      {onInputChange ? (
        <SearchInput
          type="search"
          placeholder="search.."
          value={searchQuery}
          onChange={(event) => onInputChange(event.target.value)}
        />
      ) : null}
      {data.map(({ title, detail, subMenus, isSelected }, index) => {
        return (
          <MenuItemWrapper
            key={`${title}-${parentIndex.join('-')}`}
            onMouseEnter={() => {
              handleMouseEnter(index, subMenus);
            }}
            onMouseLeave={() => {
              handleMouseLeave();
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(index);
            }}
          >
            {isSelected ? <MenuDetail>x</MenuDetail> : null}
            <MenuItem>{title}</MenuItem>
            <MenuDetail>{subMenus.length > 0 ? ">" : detail}</MenuDetail>
            {showSubMenu.length > 0 ? (
              <SubMenuWrapper>
                <MenuList
                  data={showSubMenu}
                  parentIndex={[...parentIndex, selectedIndex]}
                  onSelect={onSelect}
                />
              </SubMenuWrapper>
            ) : null}
          </MenuItemWrapper>
        );
      })}
    </MenuListWrapper>
  );
}
