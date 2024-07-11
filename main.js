let API_KEY = 'e88b2b0a61f34f40b495de945e5045c2';
let newsList = [];

async function getNews() {
    let url = new URL('https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines');
    let response = await fetch(url);
    let data = await response.json();
    newsList = data.articles;
    render();
    console.log("dddd", newsList);
}

let render = () => {
    let newsHTML = newsList.map(news => {
        let image = news.urlToImage ? news.urlToImage : '/images/imgnotvailable.png';
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
