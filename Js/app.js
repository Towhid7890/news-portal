const loadCategory = () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => showNewsCategory(data.data.news_category));
};
const showNewsCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");

  categories.forEach((category) => {
    console.log(category);
    const listDiv = document.createElement("li");
    listDiv.classList.add("nav-item");
    listDiv.innerHTML = `<a class="nav-link active" aria-current="page">${category.category_name}</a>`;
    categoryContainer.appendChild(listDiv);
  });
};
loadCategory();
