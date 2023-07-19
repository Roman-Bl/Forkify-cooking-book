import icons from "url:../../img/icons.svg"; // for Parcel v2

import View from "./View.js";

class PriviewView extends View {
  _parentElement = "";

  _generateMarkup(res) {
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
  // // Alternative
  // _generateMarkup() {
  //   const id = document.location.hash.slice(1);
  //   return `
  //   <li class="preview">
  //       <a class="preview__link ${
  //         id === this._data.id ? "preview__link--active" : ""
  //       }" href="#${this._data.id}">
  //       <figure class="preview__fig">
  //           <img src="${this._data.image}" alt="${this._data.title}" />
  //       </figure>
  //       <div class="preview__data">
  //           <h4 class="preview__title">${this._data.title}</h4>
  //           <p class="preview__publisher">${this._data.publisher}</p>
  //       </div>
  //       </a>
  //   </li>
  //   `;
  // }
}

export default new PriviewView();
