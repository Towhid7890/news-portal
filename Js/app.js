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
    <a onclick="categoryNewsLoad('${category.category_id}','${category.category_name}')" class="nav-link active" aria-current="page">${category.category_name}</a>
    `;
    categoryContainer.appendChild(listDiv);
  });
};

// loading categories news details for
const categoryNewsLoad = (category_id, name) => {
  // show spinner
  const spinnerSection = document.getElementById("spinner");
  spinnerSection.classList.remove("d-none");

  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showCategoryNews(data.data, name));
};
// showing categories news details for
const showCategoryNews = (categoryNews, name) => {
  const categoryNumber = document.getElementById("category-number");
  categoryNumber.innerHTML = `<h2 class="text-center">Total ${categoryNews.length} news found in ${name}</h2>`;
  const card = document.getElementById("category-news");
  const notFound = document.getElementById("not-found");
  card.innerHTML = "";
  if (categoryNews.length === 0) {
    notFound.innerHTML = `
    <h2 class="text-center text-warning">No News found here !! search another </h2>`;
  }
  categoryNews.forEach((news) => {
    notFound.innerHTML = "";
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col");
    console.log(news);
    cardDiv.innerHTML = `
    <div class="card mb-3">
    <div class="row g-0">
        <div class="col-sm-12 text-center col-md-5">
            <img src="${news.thumbnail_url}" class="w-100 h-100" alt="...">
        </div>
        <div class="col-sm-12 col-md-7">
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details.slice(0, 120)}....</p>
                <div class="author-img d-flex">
                <img src="${news.author.img}" class="rounded-circle" alt="">
                <div>
                <p class="ms-3">${
                  news.author.name === null
                    ? "No Author found"
                    : news.author.name
                }</p>
              
                <p class="ms-3">${
                  news.author.published_date === null
                    ? "No date"
                    : news.author.published_date
                }</p>
                </div>
                </div>
                  
                  <p>Total view : ${
                    news.total_view === null ? "No views " : news.total_view
                  }</p>
               
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
  const spinnerSection = document.getElementById("spinner");
  spinnerSection.classList.add("d-none");
};
// Load category details with modal
const showCategoryDetails = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => categoryDetails(data.data[0]));
};
// Load category details with modal
const categoryDetails = (details) => {
  console.log(details);
  const title = document.getElementById("exampleModalLabel");
  title.innerText = details.title;
  const modal = document.getElementById("modal-img");
  modal.innerHTML = `
  <img src="${details.thumbnail_url}" alt="">
  `;
  const modalDetails = document.getElementById("modal-details");
  modalDetails.innerText = details.details.slice(0, 200);
  const modalAuthor = document.getElementById("modal-author");
  if (details.author.name === null) {
    modalAuthor.innerText = "No author";
  } else {
    modalAuthor.innerText = "Author:" + " " + details.author.name;
  }
  const modalViews = document.getElementById("modal-views");
  if (details.total_view === null) {
    modalViews.innerText = "No views";
  } else {
    modalViews.innerText = "Total View:" + " " + details.total_view;
  }
  if (details.author.published_date === null) {
    document.getElementById("date").innerText = "No date found";
  } else {
    document.getElementById("date").innerText = details.author.published_date;
  }
};

loadCategory();
