import View from "./View.js";
import icons from "url:../../img/icons.svg"; // for Parcel v2

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      console.log(btn);
      const goTo = +btn.dataset.goto;
      console.log(goTo);
      handler(goTo);
      // handler();
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1)
      return `
      <button data-goto = ${
        curPage + 1
      } class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
      `;
    // return `first page`;
    // Last page
    if (curPage === numPages && numPages > 1)
      return `
      <button data-goto = ${
        curPage - 1
      } class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
      </button>
      `;
    // return `last page`;
    // Other pages
    if (curPage < numPages)
      return `
      <button data-goto = ${
        curPage - 1
      } class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto = ${
        curPage + 1
      } class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
      `;
    // return `other page`;
    // Only one page
    return "";
    // return `only one page`;
  }
}

export default new PaginationView();
