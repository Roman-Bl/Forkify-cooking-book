# Forkify - cooking book project

Recipe application with custom recipe uploads.

Stack that was used for this project:

- JS
- HTML/CSS/SCSS
- Parcel

App features:

- Searching for receips (search queries limited to the API from - https://forkify-api.herokuapp.com/v2)
- Adding/deleting recipes to favorites
- Creatign and uploading own recipes

Technical description of the app:

- Project is build according to the MVC design pattern
- Implemented integration with few 3rd-paty APIs - https://forkify-api.herokuapp.com/v2 and https://www.npmjs.com/package/fractional
- User's info like own recepies and bookmarks saved in local storage of the browser
- Pagination between search result pages
- DOM updates/re-render only in the blocks that was actually changed
- Ingredients dynamically changing according to the number of servings
