//local time
function getTime() {
    const dateObj = new Date;
    let time = dateObj.getHours() + ":" + dateObj.getMinutes();
    document.getElementById("localTime").innerHTML = `Your local time is: ${time}`
}

setInterval(getTime, 1000);

getTime();

//date
function getDate() {
    let dateObj = new Date();
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    let date = ('0' + dateObj.getDate()).slice(-2);
    let year = dateObj.getFullYear();
    let d = date + '/' + month + "/" + year;
    
    document.getElementById("date").innerHTML = `${d}`;
}
setInterval(getDate, 1000);

getDate();

//weather
const myKey = "af4cddf8ba6d2ac99ba304abc62d2cc7";

const searchCity = document.querySelector(".city-search");
searchCity.addEventListener('keypress', setQuery);

function setQuery(ev) {
    if (ev.keyCode == 13) {
        getResult(searchCity.value);
        document.getElementById("city").innerHTML = `${searchCity.value}, `
        console.log(searchCity.value)
        searchCity.value = "";
    }
}

function getResult(query) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${myKey}`)
    .then ((resp) => resp.json())
    .then(function (data) {
    let weather = data["weather"]["0"]["description"]
    let weatherIcon = data["weather"]["0"]["icon"];
    console.log(weather);
    console.log(data);
    document.getElementById('showWX').innerHTML = `${((data.main.temp - 273.15).toFixed(1))} &#x2103` 
    document.getElementById('showdescription').innerHTML = `${weather}` 
    document.getElementById('weather-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png">`;
    //searched city time: calculating timezone
    let timezone = data["timezone"]
    let d = new Date()
    let localTime = d.getTime()
    let localOffset = d.getTimezoneOffset() * 60000
    let utc = localTime + localOffset
    let selectedCity = utc + (1000 * timezone)
    var nd = new Date(selectedCity)
    let currentDate = new Date(nd);
    console.log(currentDate)
    //showing results
    let searchedTime = nd.getHours() + ":" + nd.getMinutes();
    document.getElementById("searchedTime").innerHTML = `Time for selected city: ${searchedTime}`
    //searched city name and country
    let countryCode = data["sys"]["country"];
    console.log(countryCode);
    document.getElementById("country").innerHTML = `${countryCode}`
})
.catch(error => alert("Podane miasto nie istnieje, proszę spróbować ponownie"))
}

