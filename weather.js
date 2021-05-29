const weather = document.querySelector(".js-weather");

const API_KEY = "E6WJrnnxBX1tG6d9RbJi74ax3TvFsW1x1PLQZV9y";
const COORDS = "coords";

function getWeather(lat, lng){
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        )
        .then(function(response){
            return response.json();
        })
        .then(function(jsoned){
            console.dir(jsoned);
            const temperature = jsoned.main.temp;
            const place = jsoned.name;
            weather.innerText = `Temperature of ${place} is ${temperature} degrees Celsius.`;
        });
}

function coordsToStorage(userLocation){
    localStorage.setItem(COORDS, JSON. stringify(userLocation));
}

function handleGeoSuccess(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const userLocation = {
        lat, //객체와 변수의 이름이 같을 때 이렇게 저장할 수 있다.
        lng
    };
    coordsToStorage(userLocation);
    getWeather(userLocation.lat, userLocation.lng);
}

function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        //getEeather
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.lat, parsedCoords.lng)
    }
}

function init(){
    loadCoords();
}

init();