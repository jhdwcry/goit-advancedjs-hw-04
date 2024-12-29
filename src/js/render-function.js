import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");

export function renderGallery(images, append = false) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <a href="${largeImageURL}" class="gallery-item">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p><b>Likes:</b> ${likes}</p>
          <p><b>Views:</b> ${views}</p>
          <p><b>Comments:</b> ${comments}</p>
          <p><b>Downloads:</b> ${downloads}</p>
        </div>
      </a>
    `
    )
    .join("");

  if (append) {
    gallery.insertAdjacentHTML("beforeend", markup);
  } else {
    gallery.innerHTML = markup;
  }
}

export function clearGallery() {
  gallery.innerHTML = "";
}

export function showLoader() {
  loader.classList.remove("hidden");
}

export function hideLoader() {
  loader.classList.add("hidden");
}

export function showError(message) {
  iziToast.error({ title: "Error", message });
}

export function showWarning(message) {
  iziToast.warning({ title: "Warning", message });
}
