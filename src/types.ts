export interface Product {
  title: string;
  price: number;
  category: string;
}

export interface APIResponse {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
}

export type DataByCategory = Record<string, Product[]>

export interface MenuOption {
  title: string;
  detail?: string | number;
  subMenus: MenuOption[];
  isSelected: boolean;
}
