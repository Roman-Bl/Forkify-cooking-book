import { async } from "regenerator-runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";
import bookmarkView from "./views/bookmarkView.js";
import addRecipeView from "./views/addRecipeView.js";
import { MODAL_WINDOW_CLOSE_SEC } from "./config.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

///////////////////////////////////////

// console.log("Test");
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // taking hash of the page
    // console.log(id);
    if (!id) return;

    recipeView.renderSpinner();
    // 0) Update result view to markup selected search result
    resultView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks); // in bookmarks tab
    // 1) Loading recipe
    await model.loadRecipe(id); // updating the state
    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err, " - from controller!!!");
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    // 2) Loading search result
    await model.loadSearchResults(query);
    // 3) Rendering search res
    // resultView.render(model.state.search.results); // all res
    resultView.render(model.getSearchResultsPage()); // only per_page_res
    // 4) Render pagination btns
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goTo) {
  console.log("Pagination control ", goTo);
  // 1) Rendering NEW search res
  resultView.render(model.getSearchResultsPage(goTo));
  // 2) Render NEW pagination btns
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Updating the state
  model.updateServings(newServings);
  // Update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  console.log(model.state.recipe);
  console.log(model.state.bookmarks);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Rendering the spinner
    addRecipeView.renderSpinner();
    // Uploading recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // Render recipe and bookmark
    recipeView.render(model.state.recipe);
    bookmarkView.render(model.state.bookmarks);
    // Showing success message
    addRecipeView.renderMessage();
    // Updating the hash of the page
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    // Closing the modal window
    // setTimeout(function () {
    //   addRecipeView.toogleWindow();
    // }, MODAL_WINDOW_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
