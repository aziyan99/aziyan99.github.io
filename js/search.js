function displayResults(results, store) {
  const searchResults = document.getElementById("results");
  if (results.length) {
    let resultList = "<p class='ml-2 mt-5'>search results</p>";
    resultList += "<div class='border border-gray-400 p-2'>";
    // Iterate and build result list elements
    for (const n in results) {
      const item = store[results[n].ref];
      resultList +=`
        <a href="${item.url}" class="text-blue-700 hover:underline block focus:outline focus:outline-blue-700">${item.title.substring(0, 12)} ...</a> 
      `;
    }
    resultList += "</div>";
    searchResults.innerHTML = resultList;
  } else {
    resultList += "</div>";
    searchResults.innerHTML = "No results found.";
  }
}

// Get the query parameter(s)
const params = new URLSearchParams(window.location.search);
const query = params.get("query");

// Perform a search if there is a query
if (query) {
  // Retain the search input in the form when displaying results
  document.getElementById("search-input").setAttribute("value", query);

  const idx = lunr(function () {
    this.ref("id");
    this.field("title", {
      boost: 15,
    });
    this.field("tags");
    this.field("content", {
      boost: 10,
    });

    for (const key in window.store) {
      this.add({
        id: key,
        title: window.store[key].title,
        tags: window.store[key].category,
        content: window.store[key].content,
      });
    }
  });

  // Perform the search
  const results = idx.search(query);
  // Update the list with results
  displayResults(results, window.store);
}
