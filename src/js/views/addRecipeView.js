import icons from "url:../../img/icons.svg"; // for Parcel v2

import View from "./View.js";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  _message = "Recipe was successfully added :)";

  // because we just adding listener to button just to show hidden window in UI Controller don`t even need to know about it
  // So we will call handler right in the constructor
  //   but we still need to import this class to Controller in other to run the constructor of this class
  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerCloseWindow();
  }

  toogleWindow() {
    this._window.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }
  //   we manually bind this beecause otherwise this will point to _btnOpen
  addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toogleWindow.bind(this));
  }
  addHandlerCloseWindow() {
    this._btnClose.addEventListener("click", this.toogleWindow.bind(this));
    this._overlay.addEventListener("click", this.toogleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; // destructure to array and make object from array entries
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
