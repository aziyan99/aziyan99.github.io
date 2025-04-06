function displayResults(results, store) {
  // grab the element that we will use to place our search results
  const searchResults = document.getElementById("results");
  // if the result(s) found
  if (results.length) {
    let resultList = "";
    // iterate over the results
    for (const n in results) {
      // get the data
      const item = store[results[n].ref];
      // build result list elements
      // if you want to style the list, edit this

      resultList += `
        <li>
          <article class="flex flex-row items-center">
            <header class="grow">
              <h3>
                <a
                  href="${item.url}"
                  class="truncate text-sm underline decoration-slate-300 decoration-2 underline-offset-4 hover:decoration-inherit"
                  title="${item.title}">${item.title}</a>
              </h3>
            </header>
          </article>
        </li>
        `;
    }
    // place the result list
    searchResults.innerHTML = resultList;
  } else {
    // if no result return this feedback
    searchResults.innerHTML = "No results found.";
  }
}

// Get the query parameter(s)
const params = new URLSearchParams(window.location.search);
const query = params.get("query");

// if query exists, perform the search
if (query) {
  // Retain the query in the search form after redirecting to the search page
  document.getElementById("search-input").setAttribute("value", query);

  // Search these fields
  const idx = lunr(function () {
    this.ref("id");
    this.field("title", {
      // boost search to 15
      boost: 15,
    });
    this.field("tags");
    this.field("content", {
      // boost search to 10
      boost: 10,
    });

    // provide search index data to lunr function / idx
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
  // get the result and build the result list
  displayResults(results, window.store);

  // Replace the title to 'Search Results for <query>' so user know if the search is successful
  document.getElementById("search-title").innerText =
    "Results for " + query;
}
