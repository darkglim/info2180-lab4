document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");
  const result = document.getElementById("result");

  function searchSuperheroes() {
    // Encode the input so special characters can't break or alter the query string
    const query = encodeURIComponent(searchInput.value.trim());

    fetch("superheroes.php?query=" + query)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }
        return response.text();
      })
      .then(function (html) {
        // The server returns escaped, sanitized markup
        result.innerHTML = html;
      })
      .catch(function (error) {
        result.textContent = "Something went wrong: " + error.message;
      });
  }

  searchBtn.addEventListener("click", searchSuperheroes);

  // Pressing Enter in the text field also searches
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchSuperheroes();
    }
  });
});
