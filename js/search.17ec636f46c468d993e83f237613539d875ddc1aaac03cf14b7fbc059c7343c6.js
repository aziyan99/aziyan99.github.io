(()=>{function l(t,i){let e=document.getElementById("results");if(t.length){let o="";for(let r in t){let s=i[t[r].ref];o+=`
        <li>
          <article class="flex flex-row items-center">
            <header class="grow">
              <h3>
                <a
                  href="${s.url}"
                  class="truncate text-sm underline decoration-slate-300 decoration-2 underline-offset-4 hover:decoration-inherit"
                  title="${s.title}">${s.title}</a>
              </h3>
            </header>
          </article>
        </li>
        `}e.innerHTML=o}else e.innerHTML="No results found."}var c=new URLSearchParams(window.location.search),n=c.get("query");if(n){document.getElementById("search-input").setAttribute("value",n);let i=lunr(function(){this.ref("id"),this.field("title",{boost:15}),this.field("tags"),this.field("content",{boost:10});for(let e in window.store)this.add({id:e,title:window.store[e].title,tags:window.store[e].category,content:window.store[e].content})}).search(n);l(i,window.store),document.getElementById("search-title").innerText="Results for "+n}})();
