let newsList = [];
let menus = document.querySelectorAll(".nav-link");
console.log("mmm", menus);
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
let url = new URL(
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
);
let totalResult = 0;
let page = 1;
const pageSize = 10; // 고정값은 const로 선언
const groupSize = 5;

let getNews = async () => {
  try {
    url.searchParams.set("page", page); // => &page=page
    url.searchParams.set("pageSize", pageSize); // => &pageSize=pageSize

    let response = await fetch(url);

    let data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

let getLatestNews = async () => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
  );
  await getNews();
};

let getNewsByCategory = async (event, category) => {
  if (event) event.preventDefault();
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`
  );
  await getNews();
};

let getNewsByKeyword = async (event) => {
  event.preventDefault();
  let keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`
  );
  await getNews();
};

document
  .getElementById("search-form")
  .addEventListener("submit", getNewsByKeyword);

let render = () => {
  let newsHTML = newsList
    .map((news) => {
      let image = news.urlToImage
        ? news.urlToImage
        : "./images/imgnotavailable.png";

      let description = news.description
        ? news.description.length > 200
          ? news.description.substring(0, 200) + "..."
          : news.description
        : "내용없음";
      let date = moment(news.publishedAt).fromNow();

      return `
            <div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${image}" alt="News Image" onerror="this.src='./images/imgnotavailable.png'"/>
                </div>
                <div class="col-lg-8">
                    <h2>${news.title}</h2>
                    <p>${description}</p>
                    <div>${news.source.name} * ${date}</div>
                </div>
            </div>
        `;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

let errorRender = (errorMessage) => {
  let errorHTML = `<div class="alert alert-danger" role="alert">
        ${errorMessage}
    </div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};

let paginationRender = () => {
    let totalPages = Math.ceil(totalResults / pageSize);
    let pageGroup = Math.ceil(page / groupSize);
    let lastPage = pageGroup * groupSize;
  
    if (lastPage > totalPages) {
      lastPage = totalPages;
    }
  
    let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
    let paginationHTML = '';
  
    // 처음과 끝 페이지 그룹에서는 화살표 표시 안 함
    if (pageGroup > 1) {
      paginationHTML += `<li class="page-item" onclick="moveToPage(1)"><a class="page-link pagination-hover"><<</a></li>`;
      paginationHTML += `<li class="page-item" onclick="moveToPage(${page - 1})"><a class="page-link pagination-hover"><</a></li>`;
    }
  
    for (let i = firstPage; i <= lastPage; i++) {
      paginationHTML += `<li class="page-item ${i === page ? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link pagination-hover">${i}</a></li>`;
    }
  
    if (pageGroup < Math.ceil(totalPages / groupSize)) {
      paginationHTML += `<li class="page-item" onclick="moveToPage(${page + 1})"><a class="page-link pagination-hover">></a></li>`;
      paginationHTML += `<li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link pagination-hover">>></a></li>`;
    }
  
    document.querySelector(".pagination").innerHTML = paginationHTML;
  };

// 페이지 그룹에 따라 페이지 이동하는 함수
let moveToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > Math.ceil(totalResults / pageSize)) {
      return;
    }
    page = pageNum;
    getNews();
  };

getLatestNews();