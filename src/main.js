import './css/styles.css'
import axios from 'axios'


// Створи фільмотеку з популярними фільмами, для цього використай
// https://developer.themoviedb.org/reference/trending-movies

// Щоб отримати постер фільму потрібно підставити url з відповіді від бекенду та url з документації
// https://developer.themoviedb.org/docs/image-basics

// Відмалюй картки з фільмами
// Приклад картки  => https://prnt.sc/Hi_iLLg7Nd1F

// Реалізуй пагінацію
// 1 Кнопка "Load More"
// 2 Infinity scroll (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

const BASE_URL = "https://api.themoviedb.org/3";
const END_POINT = "/trending/movie/week";
const API_KEY = "345007f9ab440e5b86cef51be6397df1";

const container = document.querySelector(".js-movie-list");
const loadMore = document.querySelector(".js-load-more");

loadMore.addEventListener("click", onLoadMore);

let page = 1;

async function serviceMovie(page = 1) {
    const { data } = await axios.get(`${BASE_URL}${END_POINT}`, {
        params: {
            api_key: API_KEY,
            page
        },
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjU2NGJhNDBkMTk3OWY0YzFmMzE2NmQzNmFiMTdjNSIsIm5iZiI6MTc2MTQ5MzExMC45MTM5OTk4LCJzdWIiOiI2OGZlNDA3NjI4MjFiZWZkNzZlYWFlY2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vbylhF6rwMOYEqlP0Cl-z6-U5SxCWucPy_OsRQDkPww'
        }
    });
    return data;
}

serviceMovie(page)
    .then((data) => {
        console.log(data);
        container.insertAdjacentHTML("beforeend", createMarkup(data.results));

        if (data.page < data.total_pages) {
            loadMore.classList.replace("load-more-hidden", "load-more");
        }
    })
    .catch((error) => {
        alert(error.message);
    });

function createMarkup(arr) {
    return arr.map(({ original_title, release_date, poster_path, vote_average }) => `
        <li class="movie-card">
            <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}"/>
            <div class="movie-info">
                <h2>${original_title}</h2>
                <p>Release Date: ${release_date}</p>
                <p>Vote Average: ${vote_average}</p>
            </div>
        </li>
    `).join("");
}
async function onLoadMore() {
    page++;
    loadMore.disabled = true;

    try {
        const data = await serviceMovie(page);
        console.log(data);
        container.insertAdjacentHTML("beforeend", createMarkup(data.results))
        
        if (data.page >= data.total_pages) {
            loadMore.classList.replace( "load-more", "load-more-hidden");
        }

    } catch (error) {
        alert(error.message)
    } finally {
        loadMore.disabled = false;
    }
}
