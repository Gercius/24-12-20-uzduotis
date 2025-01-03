import { renderMovieCard } from "./render.js";
import { clearErrorMessages, getMovie } from "./utils.js";

export function searchMovie() {
    const searchButton = document.querySelector(".search-btn");
    const searchBar = document.querySelector('input[name="search"]');
    const searchResultsEl = document.querySelector(".search-results .results");
    const searchingMessageEl = document.querySelector(".searching-msg");
    const generalErrorEl = document.querySelector(".general-error");
    const placeholderImg = document.querySelector(".placeholder-img");

    // Disable search button when input is epmty
    searchBar.addEventListener("input", (e) => {
        searchButton.toggleAttribute("disabled", e.target.value.trim() === "");
    });

    // Handle search
    searchButton.addEventListener("click", async (e) => {
        e.preventDefault();
        clearErrorMessages();
        searchResultsEl.innerHTML = "";

        // Show "ieškoma..." while fetching data
        searchingMessageEl.classList.remove("hidden");
        const data = await getMovie(searchBar.value);
        searchingMessageEl.classList.add("hidden");

        if (!data) {
            placeholderImg.classList.remove("hidden");
            return;
        }
        if (!data.Title) {
            placeholderImg.classList.remove("hidden");
            generalErrorEl.textContent = `Filmo "${searchBar.value}" duomenų bazėje nėra`;
            return;
        }
        placeholderImg.classList.add("hidden");

        renderMovieCard(data);

        searchBar.value = "";
        searchButton.disabled = true;
    });
}
