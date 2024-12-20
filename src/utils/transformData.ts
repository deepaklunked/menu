/**
 * the utils in this file work with the assumption that
 * we are using data from https://dummyjson.com/products
 */

import { APIResponse, DataByCategory, MenuOption, Product } from "../types";
import startCase from "lodash.startcase";
import uniqBy from "lodash.uniqby";

export const simplifyProducts = (data: APIResponse): Product[] => {
  return data.products.map((item) => ({
    title: item.title,
    price: item.price,
    category: item.category,
  }));
};

export const groupProductsByCategory = (data: Product[]): DataByCategory => {
  return data.reduce(
    (result, product) => ({
      ...result,
      [product.category]: [...(result[product.category] ?? []), product],
    }),
    {} as DataByCategory
  );
};

export const fillDummyCategory = (data: DataByCategory): DataByCategory => {
  data["emptyCategory1"] = [];
  data["emptyCategory2"] = [];

  return data;
};

const generateRandomMenuItem = (): MenuOption => ({
  title: `Random Menu ${Math.floor(Math.random() * 10 + 1)}`,
  subMenus: [],
  isSelected: false,
});

const fillDummySubMenu = (): MenuOption[] => {
  return uniqBy(
    Array.from(new Array(Math.floor(Math.random() * 10 + 1))).map(
      generateRandomMenuItem
    ),
    "title"
  );
};

const productToMenuItem = (product: Product, index: number): MenuOption => ({
  title: product.title,
  detail: product.price,
  subMenus: index % 3 === 0 ? fillDummySubMenu() : [],
  isSelected: false,
});

export const prepareMenuOptions = (data: DataByCategory): MenuOption[] => {
  return Object.entries(data).reduce((result, [category, products]) => {
    return [
      ...result,
      {
        title: startCase(category),
        subMenus: products.map(productToMenuItem),
        isSelected: false,
      },
    ];
  }, [] as MenuOption[]);
};

export const filterMenuOptions = (data: MenuOption[], searchQuery: string) => {
  const filter = (_data: MenuOption[]): MenuOption[] => {
    if (_data.length === 0) {
      return [];
    }

    return _data.reduce((result, item) => {
      const isItemMatching = item.title
        .trim()
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());

      const filteredSubMenus = filter(item.subMenus);

      const isSubMenuMatching = filteredSubMenus.length > 0;

      if (isItemMatching) {
        return [...result, item];
      }

      if (isSubMenuMatching) {
        return [
          ...result,
          {
            ...item,
            subMenus: filteredSubMenus,
          },
        ];
      }

      return result;
    }, [] as MenuOption[]);

    // return _data.filter(
    //   (item) =>
    //     item.title
    //       .trim()
    //       .toLowerCase()
    //       .includes(searchQuery.trim().toLowerCase()) ||
    //     filter(item.subMenus).length > 0
    // );
  };

  return filter(data);
};

export const updateMenuSelection = (
  data: MenuOption[],
  parentIndex: number[],
  newState: boolean
): MenuOption[] => {
  let itemToUpdate: MenuOption | undefined = undefined;

  for (const i of parentIndex) {
    itemToUpdate = itemToUpdate == null ? data[i] : itemToUpdate.subMenus[i];
    if (itemToUpdate && newState) {
      itemToUpdate.isSelected = newState;
    }
  }

  if (itemToUpdate && !newState) {
    itemToUpdate.isSelected = newState;
  }

  return data;
};
