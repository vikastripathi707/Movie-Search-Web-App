// Get the HTML elements we need to interact with
let searchInput = document.querySelector("#search-input");
let searchButton = document.querySelector("#search-button");
let resultsElement = document.querySelector("#results");
let wishlistElement = document.querySelector("#wishlist");
let wishlist = [];

// Check if there is any saved wishlist in the local storage
if (localStorage.getItem("wishlist") !== null) {
  wishlist = JSON.parse(localStorage.getItem("wishlist"));
  displayWishlist();
}

// Event listener for the search button
searchButton.addEventListener("click", function() {
  // When the search button is clicked, search for movies with the OMDB API
  let searchTerm = searchInput.value;
  let url = "https://www.omdbapi.com/?s=" + searchTerm+ "&apikey=915cbc57&s=";
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // When the response is received, display the search results
      let movies = data.Search;
      if (!movies) {
        // If there are no search results, display "No Movie Found"
        resultsElement.innerHTML = "No Movie Found";
       
        return;
      }
      resultsElement.innerHTML = "";
      for (let i = 0; i < movies.length; i++) {
        let movie = movies[i];

        // Create an HTML element to display the movie poster and title
        let movieElement = document.createElement("div");
        movieElement.className = "movie";

        let posterElement = document.createElement("img");
        posterElement.src = movie.Poster;

        let titleElement = document.createElement("h3");
        titleElement.innerHTML = movie.Title;

        let addToWishlistButton = document.createElement("button");
        addToWishlistButton.innerHTML = "Add to Wishlist";
        addToWishlistButton.addEventListener("click", function() {
          
          // When the "Add to Wishlist" button is clicked, add the movie to the wishlist array and save it to local storage
          let movieData = {
            title: movie.Title,
            poster: movie.Poster
          };
          wishlist.push(movieData);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          displayWishlist();
        });

        movieElement.appendChild(posterElement);
        movieElement.appendChild(titleElement);
        movieElement.appendChild(addToWishlistButton);
        resultsElement.appendChild(movieElement);
      }
    });
});

// Function to display the wishlist
function displayWishlist() {
  wishlistElement.innerHTML = "";
  for (var i = 0; i < wishlist.length; i++) {
    var movieData = wishlist[i];

    // Create an HTML element to display the movie poster and title in the wishlist
    var movieElement = document.createElement("div");
    movieElement.className = "wishlist-movie";

    var posterElement = document.createElement("img");
    posterElement.src = movieData.poster;

    var titleElement = document.createElement("h3");
    titleElement.innerHTML = movieData.title;

    var removeFromWishlistButton = document.createElement("button");
    removeFromWishlistButton.innerHTML = "Remove Movie from Wishlist";
    removeFromWishlistButton.addEventListener("click", function() {
      // When the "Remove from Wishlist" button is clicked, remove the movie from the wishlist array and save it to local storage
      wishlist.pop(i, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      displayWishlist();
    });

    movieElement.appendChild(posterElement);
    movieElement.appendChild(titleElement);
    movieElement.appendChild(removeFromWishlistButton);
    wishlistElement.appendChild(movieElement);
  }
}
