const container = document.querySelector("#pokemon-detail");

const params = new URLSearchParams(window.location.search);
const name = params.get("name");

async function loadDetail() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.json();

  container.innerHTML = `
    <h1>${data.name.toUpperCase()}</h1>
     <img src="${data.sprites.front_default}" />    
    <p><strong>Height:</strong> ${data.height}</p>
    <p><strong>Weight:</strong> ${data.weight}</p>
    <p><strong>Types:</strong> ${data.types.map(t => t.type.name).join(", ")}</p>
  `;
}

loadDetail();