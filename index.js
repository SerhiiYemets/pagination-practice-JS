import{a as c}from"./assets/vendor-CWxt7QI6.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const a="https://api.themoviedb.org/3",l="/trending/movie/week",u="345007f9ab440e5b86cef51be6397df1",d=document.querySelector(".js-movie-list");document.querySelector(".js-load-more");async function f(r=1){const{data:o}=await c(`${a}${l}`,{params:{api_key:u}});return o}f().then(r=>{console.log(r),d.insertAdjacentHTML("beforeend",p(r.results))}).catch(r=>{alert(r.message)});function p(r){return r.map(({original_title:o,release_date:i,poster_path:s,vote_average:e})=>`
        <li class="movie-card">
            <img src="https://image.tmdb.org/t/p/w300${s}" alt="${o}"/>
            <div class="movie-info">
                <h2>${o}</h2>
                <p>Release Date: ${i}</p>
                <p>Vote Average: ${e}</p>
            </div>
        </li>
    `).join("")}
//# sourceMappingURL=index.js.map
