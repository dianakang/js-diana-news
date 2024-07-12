let newsList = [];
let menus = document.querySelectorAll(".nav-link");
console.log("mmm", menus);
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
let url = new URL(
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
);

let getNews = async () => {
  let response = await fetch(url);
  let data = await response.json();
  newsList = data.articles;
  render();
};

async function getLatestNews() {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
  );
  getNews();
}

let getNewsByCategory = async (event, category) => {
  if (event) event.preventDefault();
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`
  );
  getNews();
};

let getNewsByKeyword = async (event) => {
  event.preventDefault();
  let keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`
  );
  getNews();
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

getNews();
