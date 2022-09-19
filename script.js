// TMDB API

const API_KEY = "api_key=e268a8402565fab4906feb7627c2b219";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const main = document.getElementById("main-section");
const form = document.getElementById("form");
const searchBar = document.querySelector(".search-bar");

const genreEl = document.getElementById("genre-tags");

//====Genre function====//

let selectedGenre = [];

setGenre();
function setGenre() {
  genreEl.innerHTML = "";

  genres.forEach((genre) => {
    const t = document.createElement("a");
    t.classList.add("genre-tag");
    t.id = genre.id;
    t.innerText = genre.name;
    // Event Listener and functions for selecting genre
    t.addEventListener("click", () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      getMovies(API_URL + "&with_genres=" + encodeURI(selectedGenre.join(",")));
    });
    genreEl.append(t);
  });
}

//===========
getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

//===Show Movies Data===//

function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, release_date, id } =
      movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-card");
    movieElement.id = id;
    movieElement.innerHTML = `
    <button id="add-button" class="add-movie remove-movie"></button>
     <img
              class="movie-poster"
              src="${
                poster_path
                  ? IMG_URL + poster_path
                  : "https://media.istockphoto.com/photos/popcorn-and-clapperboard-picture-id1191001701"
              }"
              alt="${title}"
            />
            <div class="movie-info">
              <div class="year-genre">
                <h4 class="year-made">${release_date}</h4>
                <span class="${getColor(vote_average)}">${vote_average}</span>
              </div>
              <h3 class="movie-title">${title}</h3>
            </div>
            <div class="overview">
              <h3>Overview</h3>
              ${overview}
            </div>
    `;

    main.appendChild(movieElement);

    //==========================================================//

    function getColor(vote) {
      if (vote >= 8) {
        return "green";
      } else if (vote >= 5) {
        return "orange";
      } else {
        return "red";
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      searchTerm = searchBar.value;

      if (searchTerm) {
        getMovies(SEARCH_URL + "&query=" + searchTerm);
      } else {
        getMovies(API_URL);
      }
    });

    //===Add to Collection===//

    const addMovieBtn = document.getElementById(movieElement.id).firstChild
      .nextSibling;
    const myCollection = document.getElementById("my-collection-list");

    addMovieBtn.addEventListener("click", () => {
      console.log(movieElement.id);

      const node = movieElement;
      const clone = node.cloneNode(true);
      myCollection.appendChild(clone);
      addMovieBtn.style.display = "none";
      //======================================

      //===Remove from Collection===//

      const removeMovie = myCollection.querySelectorAll(".remove-movie");

      for (let i = 0; i < removeMovie.length; i++) {
        removeMovie[i].addEventListener("click", () => {
          removeMovie[i].parentElement.remove();
          addMovieBtn.style.display = "flex";
        });
      }
    });
  });
}

const searchMovies = document.getElementById("search-movies");

searchMovies.addEventListener("click", () => {
  searchBar.focus();
});

//==== Scroll to top button logic ==== // // ==== Retracting Header Logic ==== //

window.onload = function () {
  document.querySelector(".to-top-btn").style.display = "none";
};

let prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  if (window.scrollY == 0) {
    document.querySelector(".to-top-btn").style.display = "none";
  } else {
    document.querySelector(".to-top-btn").style.display = "block";
  }
  let currentScrollPos = window.pageYOffset;

  if (prevScrollpos > currentScrollPos) {
    document.getElementById("top-header").style.marginTop = "0px";
    document.getElementById("top-header").style.transition = "0.5s";
  } else {
    document.getElementById("top-header").style.marginTop = "-200px";
    document.getElementById("top-header").style.transition = "0.5s";
  }

  if (prevScrollpos > currentScrollPos) {
    document.getElementById("side-nav").style.top = "25";
    document.getElementById("side-nav").style.marginTop = "13rem";
    document.getElementById("side-nav").style.transition = "0.5s";
  } else {
    document.getElementById("side-nav").style.top = "0";
    document.getElementById("side-nav").style.margin = "0";
    document.getElementById("side-nav").style.transition = "0.5s";
  }

  prevScrollpos = currentScrollPos;
};

//==== Scroll to top logic ==== //

if (window.innerWidth > 500) {
  document.querySelector(".to-top-btn").style.display = "none";
}
const scrollToTopBtn = document.querySelector(".to-top-btn");

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

scrollToTopBtn.addEventListener("click", scrollToTop);

//================================================

//================================================
