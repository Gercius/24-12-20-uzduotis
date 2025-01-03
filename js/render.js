import { capitalizeString } from "./utils.js";

export function renderMovieCard(data) {
    const movieCard = createMovieCard(data);
    document.querySelector(".search-results .results").appendChild(movieCard);

    function createMovieCard(data) {
        const movieCardEl = document.createElement("article");
        movieCardEl.classList.add("movie-card");

        // Title
        const titleEl = document.createElement("h3");
        titleEl.classList.add("title");
        titleEl.textContent = data.Title;
        movieCardEl.appendChild(titleEl);

        // Other info
        const otherInfoEl = document.createElement("p");
        otherInfoEl.classList.add("hidden", "other-info");
        // prettier-ignore
        otherInfoEl.innerHTML = `
                <span>${data.Year}</span> • <span>${capitalizeString(data.Type)}</span> • 
                <span>${data.Rated}</span> • <span>${data.Runtime}</span>
        `;
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
        ratingEl.textContent = `IMDB įvertinimas: ${data.Ratings[0]?.Value ? data.Ratings[0].Value : "-"}`;

        // Summary
        const plotDescriptionEl = document.createElement("p");
        plotDescriptionEl.classList.add("hidden", "plot-description");
        plotDescriptionEl.textContent = "Aprašymas: " + data.Plot;

        // Actors
        const actorsEl = document.createElement("p");
        actorsEl.classList.add("hidden", "actors");
        actorsEl.textContent = `Aktoriai: ${data.Actors}`;

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
