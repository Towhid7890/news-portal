// loading category list
const loadCategory = () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => showNewsCategory(data.data.news_category));
};
const showNewsCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");

  categories.forEach((category) => {
    const listDiv = document.createElement("li");
    listDiv.classList.add("nav-item");
    listDiv.innerHTML = `
    <a onclick="categoryNewsLoad('${category.category_id}')" class="nav-link active" aria-current="page">${category.category_name}</a>
    `;
    categoryContainer.appendChild(listDiv);
  });
};

// showing categories news details for
const categoryNewsLoad = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showCategoryNews(data.data));
};

const showCategoryNews = (categoryNews) => {
  console.log(categoryNews);
  const card = document.getElementById("category-news");
  card.innerHTML = "";
  categoryNews.forEach((news) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col");
    console.log(news);
    cardDiv.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-5">
            <img src="${news.thumbnail_url}" class="img-fluid h-100" alt="...">
        </div>
        <div class="col-md-7">
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details.slice(0, 120)}....</p>
                <img src="${
                  news.author.img
                }" class="h-50 w-50 rounded-circle" alt="">
                  <p>${news.author.name}</p>
               
                <button id="show-details" onclick="showCategoryDetails('${
                  news._id
                }')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show News Details</button>
            </div>
        </div>
    </div>
</div>
    `;
    card.appendChild(cardDiv);
  });
};

const showCategoryDetails = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => categoryDetails(data.data[0]));
};

const categoryDetails = (details) => {
  console.log(details);
  const title = document.getElementById("exampleModalLabel");
  title.innerText = details.title;
  const modal = document.getElementById("modal-img");
  modal.innerHTML = `
  <img src="${details.thumbnail_url}" alt="">
  `;
};

loadCategory();
