(()=>{function c(e,i){let t=document.getElementById("results");if(e.length){let o="";for(let r in e){let n=i[e[r].ref];o+=`
            <li>
                <h2>
                    <a href="${n.url}">${n.title}</a>
                </h2>'
                <p>${n.content.substring(0,150)}...</p>
                <p>${n.tags}</p>
            </li>
        `}t.innerHTML=o}else t.innerHTML="No results found."}var l=new URLSearchParams(window.location.search),s=l.get("query");if(s){document.getElementById("search-input").setAttribute("value",s);let i=lunr(function(){this.ref("id"),this.field("title",{boost:15}),this.field("tags"),this.field("content",{boost:10});for(let t in window.store)this.add({id:t,title:window.store[t].title,tags:window.store[t].category,content:window.store[t].content})}).search(s);c(i,window.store),document.getElementById("search-title").innerText="Search Results for "+s}})();
