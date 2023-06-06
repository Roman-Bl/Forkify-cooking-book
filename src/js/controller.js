import { async } from "regenerator-runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

///////////////////////////////////////

// console.log("Test");
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // taking hash of the page
    console.log(id);
    recipeView.renderSpinner();
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
    // console.log(model.state.search);
    resultView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResults();
// controlRecipes();
// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);
// instead of writing it two times we can optimise the code:
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
