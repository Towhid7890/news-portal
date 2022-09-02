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
        <div class="col-md-4">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    </div>
</div>
    `;
    card.appendChild(cardDiv);
  });
};

loadCategory();
