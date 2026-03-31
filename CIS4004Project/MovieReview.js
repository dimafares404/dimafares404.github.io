
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const roleSelect = document.getElementById("roleSelect");
const loginMessage = document.getElementById("loginMessage");
const registerBtn = document.getElementById("registerBtn");

const dashboardSection = document.getElementById("dashboard");
const welcomeText = document.getElementById("welcomeText");
const roleText = document.getElementById("roleText");

const adminSection = document.getElementById("admin");

const scrollToMoviesBtn = document.getElementById("scrollToMoviesBtn");

const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const movieTickets = document.querySelectorAll(".movie-ticket");

const detailsButtons = document.querySelectorAll(".details-btn");
const detailsTitle = document.getElementById("detailsTitle");
const detailsGenre = document.getElementById("detailsGenre");
const detailsYear = document.getElementById("detailsYear");
const detailsDirector = document.getElementById("detailsDirector");
const detailsRating = document.getElementById("detailsRating");

const watchlistButtons = document.querySelectorAll(".watchlist-btn");
const watchlistContent = document.getElementById("watchlistContent");
const tabButtons = document.querySelectorAll(".tab-btn");

const movieData = {
  "Moonlit Letters": {
    genre: "Drama",
    year: "2024",
    director: "Ava Monroe",
    rating: "8.7 / 10"
  },
  "Golden Velvet": {
    genre: "Romance",
    year: "2023",
    director: "Elena Hart",
    rating: "9.1 / 10"
  },
  "Starlight Corridor": {
    genre: "Sci-Fi",
    year: "2025",
    director: "Orion Wells",
    rating: "8.9 / 10"
  },
  "The Velvet Lantern": {
    genre: "Fantasy",
    year: "2022",
    director: "Clara Wren",
    rating: "8.3 / 10"
  }
};

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const role = roleSelect.value;

  if (username === "" || password === "") {
    loginMessage.textContent = "Please enter both username and password.";
    return;
  }

  loginMessage.textContent = "Login successful! Welcome to the theater.";

  dashboardSection.classList.remove("hidden");

  welcomeText.textContent = `Welcome, ${username}!`;
  roleText.textContent = `Role: ${role === "admin" ? "Administrator" : "Standard User"}`;

  if (role === "admin") {
    adminSection.classList.remove("hidden");
  } else {
    adminSection.classList.add("hidden");
  }
});

registerBtn.addEventListener("click", function () {
  loginMessage.textContent = "Registration form can go here later.";
});

scrollToMoviesBtn.addEventListener("click", function () {
  document.getElementById("movies").scrollIntoView({
    behavior: "smooth"
  });
});

function filterMovies() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const selectedGenre = genreFilter.value;

  movieTickets.forEach(function (ticket) {
    const title = ticket.dataset.title.toLowerCase();
    const genre = ticket.dataset.genre;

    const matchesSearch = title.includes(searchValue);
    const matchesGenre = selectedGenre === "all" || genre === selectedGenre;

    if (matchesSearch && matchesGenre) {
      ticket.style.display = "flex";
    } else {
      ticket.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);

detailsButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const ticket = button.closest(".movie-ticket");

    const movieTitle = ticket.querySelector("h3").textContent;

    const movie = movieData[movieTitle];

    detailsTitle.textContent = movieTitle;
    detailsGenre.innerHTML = `<strong>Genre:</strong> ${movie.genre}`;
    detailsYear.innerHTML = `<strong>Year:</strong> ${movie.year}`;
    detailsDirector.innerHTML = `<strong>Director:</strong> ${movie.director}`;
    detailsRating.innerHTML = `<strong>Rating:</strong> ${movie.rating}`;

    document.getElementById("movieDetails").scrollIntoView({
      behavior: "smooth"
    });
  });
});

watchlistButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const ticket = button.closest(".movie-ticket");
    const movieTitle = ticket.querySelector("h3").textContent;

    const newCard = document.createElement("div");
    newCard.classList.add("watchlist-card");

    newCard.innerHTML = `
      <h3>${movieTitle}</h3>
      <p>Status: Want to Watch</p>
    `;

    watchlistContent.appendChild(newCard);

    alert(`${movieTitle} was added to your watchlist!`);
  });
});

tabButtons.forEach(function (tab) {
  tab.addEventListener("click", function () {
    // Remove active style from all tabs
    tabButtons.forEach(function (btn) {
      btn.classList.remove("active-tab");
    });

    tab.classList.add("active-tab");

    const selectedTab = tab.dataset.tab;

    if (selectedTab === "want") {
      watchlistContent.innerHTML = `
        <div class="watchlist-card">
          <h3>Moonlit Letters</h3>
          <p>Status: Want to Watch</p>
        </div>
        <div class="watchlist-card">
          <h3>Starlight Corridor</h3>
          <p>Status: Want to Watch</p>
        </div>
      `;
    } else if (selectedTab === "watched") {
      watchlistContent.innerHTML = `
        <div class="watchlist-card">
          <h3>Golden Velvet</h3>
          <p>Status: Watched</p>
        </div>
      `;
    }
  });
});
