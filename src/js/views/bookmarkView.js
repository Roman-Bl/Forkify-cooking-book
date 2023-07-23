import icons from "url:../../img/icons.svg"; // for Parcel v2

import View from "./View.js";
import previewView from "./previewView.js";

class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage =
    "No bookmarks found. Please find a nice recipe and bookmark it ;)";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map((bookmark) => previewView._generateMarkup(bookmark))
      .join("");
  }
  // // alternative implementation
  // _generateMarkup() {
  //   console.log(this._data);
  //   return this._data
  //     .map((bookmark) => previewView.render(bookmark, false))
  //     .join("");
  // }
}

export default new BookmarkView();
