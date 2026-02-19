document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll("button");
  let filterBtn = null;
  let addBtn = null;

  buttons.forEach(btn => {
    const text = btn.textContent.trim();
    if (text === "Filter Articles") filterBtn = btn;
    if (text === "Add New Article") addBtn = btn;
  });

  if (!filterBtn || !addBtn) {
    console.error("Could not find Filter Articles or Add New Article buttons.");
    return;
  }

  function findSectionByHeadingText(headingText) {
    const headings = document.querySelectorAll("h2, h1, h3");
    for (const h of headings) {
      if (h.textContent.trim() === headingText) {
        return h.nextElementSibling; // the section right under the heading
      }
    }
    return null;
  }

  const filterDiv = findSectionByHeadingText("Filter by Article Type");
  const addDiv = findSectionByHeadingText("Add New Article");

  if (!filterDiv || !addDiv) {
    console.error("Could not find filter section or add form section. Check your headings in HTML.");
    return;
  }

  filterDiv.style.display = "none";
  addDiv.style.display = "none";

  filterBtn.addEventListener("click", function () {
    const isHidden = filterDiv.style.display === "none";
    filterDiv.style.display = isHidden ? "block" : "none";
    addDiv.style.display = "none";
  });

  addBtn.addEventListener("click", function () {
    const isHidden = addDiv.style.display === "none";
    addDiv.style.display = isHidden ? "block" : "none";
    filterDiv.style.display = "none";
  });

  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  function getCheckedTypes() {
    const types = [];
    checkboxes.forEach(box => {
      const label = box.closest("label");
      const labelText = label ? label.textContent : box.parentElement.textContent;

      const cleaned = labelText.toLowerCase();
      if (box.checked) {
        if (cleaned.includes("opinion")) types.push("opinion");
        if (cleaned.includes("recipe")) types.push("recipe");
        if (cleaned.includes("update")) types.push("update");
      }
    });
    return types;
  }

  function filterArticles() {
    const articles = document.querySelectorAll(".article");
    const allowedTypes = getCheckedTypes();

    articles.forEach(article => {
      const tag = article.querySelector(".tag");
      if (!tag) return;

      const typeText = tag.textContent.trim().toLowerCase(); // "opinion", "recipe", "update"
      const shouldShow = allowedTypes.some(t => typeText.includes(t));

      article.style.display = shouldShow ? "block" : "none";
    });
  }

  checkboxes.forEach(box => box.addEventListener("change", filterArticles));

  const titleInput = document.querySelector("input[type='text']");
  const textInput = document.querySelector("textarea");
  const radioButtons = document.querySelectorAll("input[type='radio']");
  const submitButton = document.querySelector("input[type='submit'], button[type='submit'], button");

  if (!titleInput || !textInput || radioButtons.length === 0) {
    console.error("Could not find the form fields (title, text, or type radios).");
    return;
  }

  let realSubmitBtn = null;
  document.querySelectorAll("button, input[type='submit']").forEach(el => {
    if (el.textContent && el.textContent.trim() === "Add New Article") {
      realSubmitBtn = el;
    }
    if (el.value && el.value.trim() === "Add New Article") {
      realSubmitBtn = el;
    }
  });

  if (!realSubmitBtn) {
    console.error("Could not find the Add New Article submit button.");
    return;
  }

  const articleListContainer =
    document.querySelector("#articles") ||
    document.querySelector(".articles") ||
    document.querySelector(".article-list") ||
    document.querySelector("main") ||
    document.body;

  realSubmitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const text = textInput.value.trim();

    let selectedType = null;
    radioButtons.forEach(radio => {
      if (radio.checked) selectedType = radio.value.toLowerCase();
    });

    if (!title || !text || !selectedType) {
      alert("Please fill everything out.");
      return;
    }

    const newArticle = document.createElement("div");
    newArticle.classList.add("article");

    const badgeText =
      selectedType === "opinion" ? "Opinion" :
      selectedType === "recipe" ? "Recipe" :
      "Update";

    newArticle.innerHTML = `
      <div class="tag">${badgeText}</div>
      <h2>${title}</h2>
      <p>${text}</p>
      <a href="#">Read more...</a>
    `;

    articleListContainer.appendChild(newArticle);

    titleInput.value = "";
    textInput.value = "";

    filterArticles();
  });

  filterArticles();
});
