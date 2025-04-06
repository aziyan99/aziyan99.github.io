(() => {
  // <stdin>
  function displayResults(results, store) {
    const searchResults = document.getElementById("results");
    if (results.length) {
      let resultList = "";
      for (const n in results) {
        const item = store[results[n].ref];
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
      searchResults.innerHTML = resultList;
    } else {
      searchResults.innerHTML = "No results found.";
    }
  }
  var params = new URLSearchParams(window.location.search);
  var query = params.get("query");
  if (query) {
    document.getElementById("search-input").setAttribute("value", query);
    const idx = lunr(function() {
      this.ref("id");
      this.field("title", {
        // boost search to 15
        boost: 15
      });
      this.field("tags");
      this.field("content", {
        // boost search to 10
        boost: 10
      });
      for (const key in window.store) {
        this.add({
          id: key,
          title: window.store[key].title,
          tags: window.store[key].category,
          content: window.store[key].content
        });
      }
    });
    const results = idx.search(query);
    displayResults(results, window.store);
    document.getElementById("search-title").innerText = "Results for " + query;
  }
})();
