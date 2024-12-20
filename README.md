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

On load, a checkbox with label `External filter?` and a button with text `Show products` is rendered.

## Known bugs

 - On selecting a menu item, the selection does not reflect immediately, renders fine on hovering out (the updated state is not triggering a re-render, to be debugged)
 - When `External filter?` is unchecked and a search query is entered to filter items in a sub menu, then the list is updated correctly. However, when the search query is changed (or removed) while the filtered submenu is being rendered, the filter does not apply immediately to the submenu list (this too is happening due to a re-render not being triggered)


## Scope of expansion

These are the items that can be picked up next in order to improve the working of the component

 - Tests can be written
 - Debounce API call when `External filter?` is checked
 - Styles and interactions can be improved

