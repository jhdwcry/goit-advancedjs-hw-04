import { fetchImages } from "./js/pixabay-api.js";
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showError,
  showWarning,
} from "./js/render-function.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const loadMoreButton = document.createElement("button");
loadMoreButton.textContent = "Load more";
loadMoreButton.className = "hidden";
loadMoreButton.id = "load-more";

document.querySelector(".container").appendChild(loadMoreButton);

let lightbox;
let currentPage = 1;
let currentQuery = "";
let totalHits = 0;

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();
  if (!query) {
    showError("Search field cannot be empty!");
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  loadMoreButton.classList.add("hidden");
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showWarning(
        "Sorry, there are no images matching your search query. Please try again!"
      );
      return;
    }

    renderGallery(data.hits);
    setupLightbox();

    if (data.totalHits > 15) {
      loadMoreButton.classList.remove("hidden");
    }
  } catch (error) {
    showError("Something went wrong. Please try again later.");
  } finally {
    hideLoader();
  }
});

loadMoreButton.addEventListener("click", async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage);

    renderGallery(data.hits, true);
    setupLightbox();

    const { height: cardHeight } = document
      .querySelector(".gallery-item")
      .getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });

    if (currentPage * 15 >= totalHits) {
      loadMoreButton.classList.add("hidden");
      showWarning("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    showError("Something went wrong. Please try again later.");
  } finally {
    hideLoader();
  }
});

function setupLightbox() {
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox(".gallery a");
  }
}
