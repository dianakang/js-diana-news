let API_KEY = `e88b2b0a61f34f40b495de945e5045c2`;
let news = []

async function getNews() {
    let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    let response = await fetch(url);
    let data = await response.json();
    news = data.articles; // 재할당
    console.log("dddd", news);
};

getNews();
