document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("button");
    let filterBtn;
    let addBtn;
  
    buttons.forEach(button => {
        if (button.textContent.includes("Filter Articles")) {
            filterBtn = button;
        }
        if (button.textContent.includes("Add New Article")) {
            addBtn = button;
        }
    });

    const filterSection = document.querySelector("h2:contains('Filter by Article Type')");
    const addSection = document.querySelector("h2:contains('Add New Article')");
    const filterDiv = document.querySelector(".filter-section");
    const addDiv = document.querySelector(".add-section");

    if (filterDiv) filterDiv.style.display = "none";
    if (addDiv) addDiv.style.display = "none";

    filterBtn.addEventListener("click", function () {
        if (filterDiv.style.display === "none") {
            filterDiv.style.display = "block";
            addDiv.style.display = "none";
        } else {
            filterDiv.style.display = "none";
        }
    });

    addBtn.addEventListener("click", function () {
        if (addDiv.style.display === "none") {
            addDiv.style.display = "block";
            filterDiv.style.display = "none";
        } else {
            addDiv.style.display = "none";
        }
    });
  

    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const articles = document.querySelectorAll(".article");

    function filterArticles() {

        articles.forEach(article => {
            const label = article.querySelector(".tag");
          
            if (!label) return;

            const typeText = label.textContent.trim().toLowerCase();

            let show = false;

            checkboxes.forEach(box => {
                const boxText = box.parentElement.textContent.trim().toLowerCase();

                if (box.checked && typeText.includes(boxText)) {
                    show = true;
                }
            });

            article.style.display = show ? "block" : "none";
        });
    }

    checkboxes.forEach(box => {
        box.addEventListener("change", filterArticles);
    });

    const titleInput = document.querySelector("input[type='text']");
    const textInput = document.querySelector("textarea");
    const radioButtons = document.querySelectorAll("input[type='radio']");
    const submitButton = document.querySelector("button[type='submit'], button:last-of-type");

    submitButton.addEventListener("click", function () {

        const title = titleInput.value.trim();
        const text = textInput.value.trim();

        let selectedType;

        radioButtons.forEach(radio => {
            if (radio.checked) {
                selectedType = radio.parentElement.textContent.trim();
            }
        });

        if (!title || !text || !selectedType) {
            alert("Please fill everything out.");
            return;
        }

      
        const newArticle = document.createElement("div");
        newArticle.classList.add("article");

        newArticle.innerHTML = `
            <div class="tag">${selectedType}</div>
            <h2>${title}</h2>
            <p>${text}</p>
            <a href="#">Read more...</a>
        `;

        document.querySelector(".articles-container").appendChild(newArticle);

        titleInput.value = "";
        textInput.value = "";

        filterArticles();
    });

});
