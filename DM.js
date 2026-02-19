
function $(id) {
  return document.getElementById(id);
}

function showFilter() {
  const filterForm = $("filterContent"); 
  const addForm = $("newContent");       

  filterForm.style.display = "block";
  addForm.style.display = "none";
}

function showAddNew() {
  const filterForm = $("filterContent");
  const addForm = $("newContent");

  addForm.style.display = "flex";
  filterForm.style.display = "none";
}

function filterArticles() {
  const showOpinion = $("opinionCheckbox").checked;
  const showRecipe = $("recipeCheckbox").checked;
  const showUpdate = $("updateCheckbox").checked;
  const opinionArticles = document.querySelectorAll("article.opinion");
  const recipeArticles = document.querySelectorAll("article.recipe");
  const updateArticles = document.querySelectorAll("article.update");

  opinionArticles.forEach(article => {
    article.style.display = showOpinion ? "" : "none";
  });

  recipeArticles.forEach(article => {
    article.style.display = showRecipe ? "" : "none";
  });

  updateArticles.forEach(article => {
    article.style.display = showUpdate ? "" : "none";
  });
}

function addNewArticle() {
  const title = $("inputHeader").value.trim();
  const text = $("inputArticle").value.trim();

  const opinionChecked = $("opinionRadio").checked;
  const recipeChecked = $("recipeRadio").checked;
  const lifeChecked = $("lifeRadio").checked; 

  if (title === "" || text === "") {
    alert("Please enter BOTH a title and text for your article 🙂");
    return;
  }

  let articleClass = ""; 
  let markerText = "";   

  if (opinionChecked) {
    articleClass = "opinion";
    markerText = "Opinion";
  } else if (recipeChecked) {
    articleClass = "recipe";
    markerText = "Recipe";
  } else if (lifeChecked) {
    articleClass = "update";     // IMPORTANT: Life Update uses class "update"
    markerText = "Update";
  } else {
    alert("Please choose an article type (Opinion / Recipe / Life Update) 🙂");
    return;
  }

  const newArticle = document.createElement("article");
  newArticle.classList.add(articleClass);

  const currentCount = document.querySelectorAll("#articleList article").length;
  newArticle.id = "a" + (currentCount + 1);

  const marker = document.createElement("span");
  marker.classList.add("marker");
  marker.textContent = markerText;

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const p = document.createElement("p");
  p.textContent = text;

  const moreP = document.createElement("p");
  const moreLink = document.createElement("a");
  moreLink.href = "moreDetails.html";
  moreLink.textContent = "Read more...";
  moreP.appendChild(moreLink);

  newArticle.appendChild(marker);
  newArticle.appendChild(h2);
  newArticle.appendChild(p);
  newArticle.appendChild(moreP);

  const articleList = $("articleList");
  articleList.appendChild(newArticle);

  $("inputHeader").value = "";
  $("inputArticle").value = "";
  $("opinionRadio").checked = false;
  $("recipeRadio").checked = false;
  $("lifeRadio").checked = false;

  filterArticles();
}

filterArticles();
