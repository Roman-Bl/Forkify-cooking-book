import icons from "url:../../img/icons.svg"; // for Parcel v2

import View from "./View.js";

class ResultView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipe for this query. Please try again ;)";
  _generateMarkup() {
    console.log(this._data);
    return this._data.map((res) => this._generateMarkupPreview(res)).join("");
    // return this._data.map(this._generateMarkupPreview).join("");
  }
  // Method to create separate priview for one recipe
  _generateMarkupPreview(res) {
    const id = document.location.hash.slice(1);
    return `
    <li class="preview">
        <a class="preview__link ${
          id === res.id ? "preview__link--active" : ""
        }" href="#${res.id}">
        <figure class="preview__fig">
            <img src="${res.image}" alt="${res.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${res.title}</h4>
            <p class="preview__publisher">${res.publisher}</p>
        </div>
        </a>
    </li>
    `;
  }
}

export default new ResultView();
