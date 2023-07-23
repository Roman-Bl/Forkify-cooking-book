class SearchView {
  _parentEl = document.querySelector(".search");
  _clearSearch() {
    this._parentEl.querySelector(".search__field").value = "";
  }
  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;
    // console.log(query);
    this._clearSearch();
    return query;
  }
  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      //   getQuery();
      handler();
    });
  }
}

export default new SearchView();
