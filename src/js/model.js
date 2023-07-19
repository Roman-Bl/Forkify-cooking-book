import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;
    // here we create custom object with formatted property names instead of default one that were returned from fetch request
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    // Check if our current recipe in the state was marked as bookmarked before
    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(state.recipe);
  } catch (err) {
    // Temp custom error
    // console.error(`${err} from model!!!!`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log(data);
    const { recipes } = data.data;
    state.search.results = recipes.map((res) => {
      return {
        id: res.id,
        image: res.image_url,
        publisher: res.publisher,
        title: res.title,
      };
    });
    state.search.page = 1; // reset page on new search;
  } catch (err) {
    console.error(`${err} from model!!!!`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  // console.log(`res per page- `, state.search.resultsPerPage);
  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // slice not include last el, so number 10 will give from 0 to 9;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(
    (ing) =>
      (ing.quantity = (ing.quantity * newServings) / state.recipe.servings)
  );
  // Formula: old Quant * new Servings / old Servings || 2 * 8 \ 4  = 4
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);
  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  // Unmark current recipe
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const data = JSON.parse(localStorage.getItem("bookmarks"));
  // console.log(data);
  if (data) state.bookmarks = data;
  // console.log("state after load form localStor - ", state.bookmarks);
};

init();
