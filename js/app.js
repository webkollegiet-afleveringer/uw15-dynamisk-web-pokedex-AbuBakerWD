const listContainer = document.querySelector("#pokemon-list");
const paginationContainer = document.querySelector("#pagination");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

const params = new URLSearchParams(window.location.search);
let offset = Number(params.get("offset")) || 0;
let search = params.get("search");

const limit = 20;

async function loadPokemon() {
  listContainer.innerHTML = "Loading...";

  if (search) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
      const data = await res.json();
      displayPokemonCard(data);
      paginationContainer.innerHTML = "";
    } catch {
      listContainer.innerHTML = "Pokemon not found.";
    }
    return;
  }

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await res.json();

  listContainer.innerHTML = "";

  for (let pokemon of data.results) {
    const pokeRes = await fetch(pokemon.url);
    const pokeData = await pokeRes.json();
    displayPokemonCard(pokeData);
  }

  const totalPages = Math.ceil(data.count / limit);
  const currentPage = offset / limit + 1;

  paginationContainer.innerHTML = `
    ${data.previous ? `<a class="pagination-btn" href="?offset=${offset - limit}">Previous</a>` : ""}
    <span>Page ${currentPage} of ${totalPages}</span>
    ${data.next ? `<a class="pagination-btn" href="?offset=${offset + limit}">Next</a>` : ""}
  `;
}

function displayPokemonCard(data) {
  listContainer.innerHTML += `
    <a href="detail.html?name=${data.name}" class="card">
      <h3>${data.name.toUpperCase()}</h3>
      <img src="${data.sprites.front_default}" />
    </a>
  `;
}

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const value = searchInput.value.toLowerCase();
  window.location.href = `?search=${value}`;
});

loadPokemon();