let API_KEY = `e88b2b0a61f34f40b495de945e5045c2`;
let newsList = []

async function getNews() {
    let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);
    let response = await fetch(url);
    let data = await response.json();
    newsList = data.articles; // 재할당
    render();
    console.log("dddd", newsList);
};
let render=()=>{
    let newsHTML = newsList.map(
        news=>`<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size"
                src=${news.urlToImage}/>
        </div>
        <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
                ${news.description}
            </p>
            <div>
                ${news.source.name} * ${news.publishedAt}
            </div>
        </div>
    </div>`).join('');
    
    document.getElementById("news-board").innerHTML = newsHTML;
};
getNews();
