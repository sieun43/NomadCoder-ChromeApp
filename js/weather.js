const API_KEY = "8e1f3c2a7271bf4f2ede807c80074a76";


function onGeoOK(position) { //위치 찾는데 성공했을 때
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = document.querySelector("#weather span:first-child"); //html의 span에서 weather을 알려줌
            const city = document.querySelector("#weather span:last-child"); //html의 span에서 city 알려줌
            city.innerText = data.name;
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}

function onGeoError() { //위치 찾는데 실패했을 때
    alert("Can't find you. No weather for you.");
}


navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);
