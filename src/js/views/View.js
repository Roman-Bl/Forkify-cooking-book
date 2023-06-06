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
