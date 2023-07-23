const movieCards = document.querySelectorAll(".movieCard");
const searchBar = document.getElementById("searchText");
const searchButton = document.getElementById("searchButton");
const logo = document.getElementById("logo");

const getId = (element) => {
  let movieId = element.id;
  window.location.href = `/movie/${movieId}`;
};

const search = () => {
  let query = searchBar.value.trim();
  if (query.length != 0) {
    window.location.href = `/?search=${query}`;
  } else {
    console.log("ERROR: field is empty");
  }
};

const home = () => {
  window.location.href = window.location.origin;
};

logo.addEventListener("click", home);
searchButton.addEventListener("click", search);
movieCards.forEach(function (el) {
  el.addEventListener("click", getId.bind(null, el));
});
