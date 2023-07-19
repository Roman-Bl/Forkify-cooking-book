import icons from "url:../../img/icons.svg"; // for Parcel v2

export default class View {
  #message = "test_inherit";
  _data;
  render(data) {
    // guard block
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  // Alternative
  // render(data, render = true) {
  //   // guard block
  //   if (!data || (Array.isArray(data) && data.length === 0))
  //     return this.renderError();
  //   this._data = data;
  //   const markup = this._generateMarkup();
  //   if (!render) return markup;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML("afterbegin", markup);
  // }

  update(data) {
    // guard block
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    // 1) creating Markup with new/changed data
    const newMarkup = this._generateMarkup();
    // 2) creating virtual(like real but not on the page) DOM element
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // 3) Transforming Node list af all elements into real array
    const newElements = Array.from(newDOM.querySelectorAll("*")); // for new Virtual DOM
    const curElements = Array.from(this._parentElement.querySelectorAll("*")); // for current real DOM
    // console.log(newElements, curElements);
    // 4) Itarate and Compare in what Node we have different text and UPDATE TEXT in current DOM
    // isEqualNode - it could be not exactly the same node, but the CONTENT should be the same
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));
      // Here we have second condition to select only those Nodes that contain only TEXT
      // because Parent Node also will not be equal if there is a change in child el. But we don`t want to change whole parent container
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }
      // 5) Iterate through El attributes and UPDATE only attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError() {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${this._errorMessage}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
