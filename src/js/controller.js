import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
// console.log(icons);

// const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log("Test");

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

// controlRecipes();
// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);
// instead of writing it two times we can optimise the code:
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
