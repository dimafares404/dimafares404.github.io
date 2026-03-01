const API = "https://pokeapi.co/api/v2/pokemon/";
const CACHE_PREFIX = "poke_cache_v1:";
const TEAM_KEY = "poke_team_v1";

function $(id){
  return document.getElementById(id);
}

const el = {
  query: $("query"),
  findBtn: $("findBtn"),
  addBtn: $("addBtn"),
  img: $("pokeImg"),
  cry: $("cry"),
  m1: $("m1"),
  m2: $("m2"),
  m3: $("m3"),
  m4: $("m4"),
  teamLeft: $("teamLeft"),
  teamRight: $("teamRight"),
  status: $("status"),
  error: $("error")
};

let currentPokemon = null;

function setStatus(text){
  el.status.textContent = text || "";
}

function setError(text){
  el.error.textContent = text || "";
}

function normalizeQuery(q){
  return q.trim().toLowerCase();
}

function cacheKey(query){
  return CACHE_PREFIX + query;
}

function readCache(query){
  const raw = localStorage.getItem(cacheKey(query));
  if(!raw) return null;
  try{
    return JSON.parse(raw);
  }catch{
    return null;
  }
}

function writeCache(query, data){
  const payload = {
    savedAt: Date.now(),
    data: data
  };
  localStorage.setItem(cacheKey(query), JSON.stringify(payload));
}

const TTL_MS = 24 * 60 * 60 * 1000;

function cacheValid(entry){
  if(!entry || !entry.savedAt) return false;
  return (Date.now() - entry.savedAt) < TTL_MS;
}

async function fetchPokemon(query){

  const cached = readCache(query);

  if(cached && cacheValid(cached)){
    setStatus("Loaded from cache");
    return cached.data;
  }

  setStatus("Fetching from API...");

  const response = await fetch(API + encodeURIComponent(query));

  if(!response.ok){
    throw new Error("Pokemon not found.");
  }

  const data = await response.json();

  writeCache(query, data);

  setStatus("Fetched and cached");

  return data;
}

function getBestSprite(pokemon){
  return (
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    ""
  );
}

function getCryUrl(pokemon){
  return (
    pokemon.cries?.latest ||
    pokemon.cries?.legacy ||
    ""
  );
}

function renderPokemon(pokemon){

  el.img.src = getBestSprite(pokemon);
  el.img.alt = pokemon.name;

  el.cry.src = getCryUrl(pokemon);
}

function fillDropdown(selectElement, moves){

  selectElement.innerHTML = "";

  for(let i = 0; i < moves.length; i++){

    const option = document.createElement("option");
    option.value = moves[i];
    option.textContent = moves[i];

    selectElement.appendChild(option);
  }
}

function loadMoves(pokemon){

  const moves = pokemon.moves.map(function(item){
    return item.move.name;
  });

  fillDropdown(el.m1, moves);
  fillDropdown(el.m2, moves);
  fillDropdown(el.m3, moves);
  fillDropdown(el.m4, moves);
}

function getTeam(){
  try{
    return JSON.parse(localStorage.getItem(TEAM_KEY)) || [];
  }catch{
    return [];
  }
}

function saveTeam(team){
  localStorage.setItem(TEAM_KEY, JSON.stringify(team));
}

function renderTeam(){

  const team = getTeam();

  el.teamLeft.innerHTML = "";
  el.teamRight.innerHTML = "";

  for(let i = 0; i < team.length; i++){

    const member = team[i];

    const leftRow = document.createElement("div");
    leftRow.className = "team-row";

    const img = document.createElement("img");
    img.className = "team-thumb";
    img.src = member.sprite;

    leftRow.appendChild(img);
    el.teamLeft.appendChild(leftRow);

    const rightRow = document.createElement("div");
    rightRow.className = "right-row";

    const ul = document.createElement("ul");
    ul.className = "moves-list";

    for(let j = 0; j < member.moves.length; j++){
      const li = document.createElement("li");
      li.textContent = member.moves[j];
      ul.appendChild(li);
    }

    rightRow.appendChild(ul);
    el.teamRight.appendChild(rightRow);
  }
}

el.findBtn.addEventListener("click", async function(){

  setError("");

  const input = normalizeQuery(el.query.value);

  if(input === ""){
    setError("Enter a Pokemon name or ID.");
    return;
  }

  try{

    const pokemon = await fetchPokemon(input);

    currentPokemon = pokemon;

    renderPokemon(pokemon);
    loadMoves(pokemon);

  }catch(err){

    currentPokemon = null;
    el.img.removeAttribute("src");
    el.cry.removeAttribute("src");

    setError(err.message);
    setStatus("");
  }
});

el.addBtn.addEventListener("click", function(){

  if(currentPokemon === null){
    setError("Find a Pokemon first.");
    return;
  }

  const team = getTeam();

  if(team.length >= 6){
    setError("Team is full.");
    return;
  }

  const member = {
    name: currentPokemon.name,
    sprite: getBestSprite(currentPokemon),
    moves: [el.m1.value, el.m2.value, el.m3.value, el.m4.value]
  };

  team.push(member);
  saveTeam(team);
  renderTeam();
});

renderTeam();
