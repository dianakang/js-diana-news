let newsList = [];
let menus = document.querySelectorAll(".nav-link")
console.log("mmm", menus);
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))


async function getNews() {
    let url = new URL('https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines');
    let response = await fetch(url);
    let data = await response.json();
    newsList = data.articles;
    render();
    console.log("ddddd", newsList);
}

let getNewsByCategory= async (event)=>{
    let category = event.target.textContent.toLowerCase();
    console.log("category", category);
    let url = new URL('https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}')
    let response = await fetch(url);
    let data = await response.json();
    console.log("Ddd", data)
    newsList = data.articles;
    render();
}

let getNewsByKeyword = async (event) => {
    event.preventDefault();
    let keyword = document.getElementById('search-input').value;
    console.log("keyword", keyword);
    let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`);
    let response = await fetch(url);
    let data = await response.json();
    console.log("keyword data", data);
    newsList = data.articles;
    render();
};

document.getElementById('search-form').addEventListener('submit', getNewsByKeyword);


let render = () => {
    let newsHTML = newsList.map(news => {
        let image = news.urlToImage ? news.urlToImage : "https://raw.githubusercontent.com/charleskim77/NooNa_JavaScript/main/TimesNews-step2/img/Noimage.jpghttps://raw.githubusercontent.com/charleskim77/NooNa_JavaScript/main/TimesNews-step2/img/Noimage.jpghttps://raw.githubusercontent.com/charleskim77/NooNa_JavaScript/main/TimesNews-step2/img/Noimage.jpghttps://raw.githubusercontent.com/charleskim77/NooNa_JavaScript/main/TimesNews-step2/img/Noimage.jpghttps://raw.githubusercontent.com/charleskim77/NooNa_JavaScript/main/TimesNews-step2/img/Noimage.jpghttps://raw.githubusercontent.com/charleskim77/NooNa_JavaScript/main/TimesNews-step2/img/Noimage.jpghttps://raw.githubusercontent.com/charleskim77/NooNa_JavaScript/main/TimesNews-step2/img/Noimage.jpghttps://raw.githubusercontent.com/charleskim77/NooNa_JavaScript/main/TimesNews-step2/img/Noimage.jpghttps://raw.githubusercontent.com/charleskim77/NooNa_JavaScript/main/TimesNews-step2/img/Noimage.jpg";
        let description = news.description ? (news.description.length > 200 ? news.description.substring(0, 200) + "..." : news.description) : "내용없음";
        let date = moment(news.publishedAt).fromNow();

        return `
            <div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${image}" alt="News Image"/>
                </div>
                <div class="col-lg-8">
                    <h2>${news.title}</h2>
                    <p>${description}</p>
                    <div>${news.source.name} * ${date}</div>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById("news-board").innerHTML = newsHTML;
};

getNews();
