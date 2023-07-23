import icons from "url:../../img/icons.svg"; // for Parcel v2

import View from "./View.js";
import previewView from "./previewView.js";

class ResultView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipe for this query. Please try again ;)";
  _generateMarkup() {
    // console.log(this._data);
    return this._data.map((res) => previewView._generateMarkup(res)).join("");
  }
  // // Alternative
  // _generateMarkup() {
  //   console.log(this._data);
  //   return this._data.map((res) => previewView.render(res, false)).join("");
  // }
}

export default new ResultView();
