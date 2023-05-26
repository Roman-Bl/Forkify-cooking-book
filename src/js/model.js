import { async } from "regenerator-runtime";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      // "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd07"
    );
    const data = await res.json(); // converting from json returned data from fetch
    console.log(res, data);
    if (!res.ok) throw new Error(`${data.message} ${res.status}`); // here we creating custom Error that then catch in catch block
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
    console.log(state.recipe);
  } catch (err) {
    alert(err);
  }
};
