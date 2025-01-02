import { capitalizeString, getMovie } from "./utils.js";

export function searchMovie() {
    const searchButton = document.querySelector(".search-btn");
    const searchBar = document.querySelector('input[name="search"]');
    const searchResultsEl = document.querySelector(".search-results");

    // Disable search button when input is epmty
    searchBar.addEventListener("input", (e) => {
        searchButton.toggleAttribute("disabled", e.target.value.trim() === "");
    });

    // Handle search
    searchButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const data = await getMovie(searchBar.value);
        renderMovieCard(data);
        searchBar.value = "";
        searchButton.disabled = true;
    });

    function renderMovieCard(data) {
        if (!data.Title) {
            searchResultsEl.textContent = "";
            document.querySelector(".general-error").textContent = "Tokio filmo duomenų bazėje nėra!";
            return;
        }

        const movieCard = createMovieCard(data);
        searchResultsEl.innerHTML = "";
        searchResultsEl.appendChild(movieCard);

        function createMovieCard(data) {
            const movieCardEl = document.createElement("article");
            movieCardEl.classList.add("movie-card");

            // Title, Year
            const titleEl = document.createElement("h3");
            titleEl.classList.add("title");
            titleEl.textContent = data.Title;
            const yearEl = document.createElement("span");
            yearEl.classList.add("year");
            yearEl.textContent = ` (${data.Year})`;
            titleEl.appendChild(yearEl);
            movieCardEl.appendChild(titleEl);

            // Other info
            const otherInfoEl = document.createElement("p");
            otherInfoEl.classList.add("hidden", "other-info");
            otherInfoEl.innerHTML = `<span>${capitalizeString(data.Type)}</span> / <span>${data.Rated}</span> / <span>${
                data.Runtime
            }</span>`;
            movieCardEl.appendChild(otherInfoEl);

            // Poster
            if (data.Poster.includes("https")) {
                const posterImgEl = document.createElement("img");
                posterImgEl.classList.add("hidden", "poster");
                posterImgEl.src = data.Poster;
                posterImgEl.alt = `${data.Title} movie poster`;
                movieCardEl.appendChild(posterImgEl);
            }

            // Genre/Genres
            const genreData = data.Genre.split(",");
            const genreWrapperEl = document.createElement("p");
            genreWrapperEl.classList.add("hidden", "genre-wrapper");
            genreData.forEach((genre) => {
                const genreEl = document.createElement("span");
                genreEl.classList.add("genre");
                genreEl.textContent = genre;
                genreWrapperEl.appendChild(genreEl);
            });

            // Rating
            const ratingEl = document.createElement("p");
            ratingEl.classList.add("hidden", "rating");
            ratingEl.textContent = `IMDB Rating: ${data.Ratings[0].Value}`;

            // Summary
            const plotDescriptionEl = document.createElement("p");
            plotDescriptionEl.classList.add("hidden", "plot-description");
            plotDescriptionEl.textContent = "Summary: " + data.Plot;

            // Actors
            const actorsEl = document.createElement("p");
            actorsEl.classList.add("hidden", "actors");
            actorsEl.textContent = `Actors: ${data.Actors}`;

            // Show More Button
            const showMoreBtn = document.createElement("button");
            showMoreBtn.classList.add("show-more");
            showMoreBtn.textContent = "Rodyti daugiau";

            // Append the rest of the elements
            movieCardEl.append(genreWrapperEl, ratingEl, plotDescriptionEl, actorsEl, showMoreBtn);

            // Show more movie card info
            showMoreBtn.addEventListener("click", () => {
                const movieCardEl = document.querySelector(".movie-card");
                movieCardEl.childNodes.forEach((childEl) => {
                    if (childEl.classList.contains("hidden")) childEl.classList.remove("hidden");
                });
                showMoreBtn.classList.add("hidden");
            });

            return movieCardEl;
        }
    }
}
