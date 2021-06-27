//clock

setInterval(setClock, 1000)

const hourHand = document.getElementById("hour")
const minuteHand = document.getElementById("minute")
const secondHand = document.getElementById("second")

function setClock() {
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock();

//date
function getTime() {
    let dateObj = new Date();
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    let date = ('0' + dateObj.getDate()).slice(-2);
    let year = dateObj.getFullYear();
    let d = date + '/' + month + "/" + year;
    
    document.getElementById("date").innerHTML = `${d}`;
}
setInterval(getTime, 1000);

getTime();

//weather

fetch(`https://api.openweathermap.org/data/2.5/weather?q=Krakow&appid=af4cddf8ba6d2ac99ba304abc62d2cc7`)
.then ((resp) => resp.json())
.then(function (data) {
let weather = data["weather"]["0"]["description"]
let weatherIcon = data["weather"]["0"]["icon"];
console.log(weather);
    document.getElementById('showWX').innerHTML = `${((data.main.temp - 273.15).toFixed(1))} &#x2103` 
    document.getElementById('showdescription').innerHTML = `${weather}` 
    document.getElementById('weather-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png">`;
})