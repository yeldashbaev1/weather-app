const api = {
    key: "fef29ea19931b39ac5760f6777c79994",
    baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener("keypress", setQuery);

function setQuery(e){
    if(e.keyCode == 13){
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}

function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather =>{
            return weather.json();
        })
        .then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city')
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>°C</span>`;

    let weatherEl = document.querySelector('.weather');
    weatherEl.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.high-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(i){
    let months = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December'
    ];
    let days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];

    let day = days[i.getDay()];
    let date = i.getDate();
    let month = months[i.getMonth()];
    let year = i.getFullYear();

    return `${day} ${date} ${month} ${year}`
}

