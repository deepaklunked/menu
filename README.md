# Multilevel Menu component

This is built using react + vite + ts.

## Deployment

This repo is deployed at [deepaklunked-menu.netlify.app](https://deepaklunked-menu.netlify.app/)

## Local Setup

Clone the repo and run the following commands after cd'ing into the cloned directory
 - `npm i`
 - `npm run dev`

## Building the functionality

Used a sample JSON REST API for products, `https://dummyjson.com/products`, provided by [dummyjson.com](www.dummyjson.com) to fetch a list of items to be rendered.
For simulating external filtering, used this API: `https://dummyjson.com/products/search?q=phone`

The data structure used to represent each menu item is as follows:
```
export interface MenuOption {
  title: string;
  detail?: string | number;
  subMenus: MenuOption[];
  isSelected: boolean;
}
```

But the data returned by the API was in a different format, hence wrote util functions to transform data as per the requirement.
Wrote a hook to fetch data, which also supports filtering via API, and returns loading state and fetched data.
Used styled-components for quick styling, and kept the css to a bare minimum.

## Usage

 - On load, a checkbox with label `External filter?` and a button with text `Show products` is rendered.
 - Clicking on the button toggles the menu.
 - A search component is displayed only for the first level of the menu.
 - Nested menus are indicated with a `>` in the right end of the menu item
 - Clicking on a menu item selects it; selected menus are indicated with a `x` in left end of the menu item
 - When `External filter?` is unchecked, searching will occur internally; this is implmented such that if the search query matches any first-level menu item, it will be displayed. Also, if the search query matches any sub menu item, then its parent menu will be displayed, and the filtered submenu will also be displayed.
 - When `External filter?` is checked, then the filtering happens via API, and the response is displayed as received from the backend, after the transformations done as mentioned above.

## Known bugs

 - On selecting a menu item, the selection does not reflect immediately, renders fine on hovering out (the updated state is not triggering a re-render, to be debugged)


## Scope of expansion

These are the items that can be picked up next in order to improve the working of the component

 - Tests can be written
 - Debounce API call when `External filter?` is checked
 - Styles and interactions can be improved

