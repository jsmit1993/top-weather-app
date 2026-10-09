let weatherAPI = 'KRL6HZ2HRC7AQW4V2JVBJQ8Z5';
let giphyAPI = 'vjp3ar77bGKwL6CKdPOxrEUVJPNmY1XE';

async function getWeather(location) {
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+location+'?unitGroup=us&key='+weatherAPI);
    const data = await response.json();
    let currentTemp = data.currentConditions.temp;
    let weatherDescription = data.description;
    return {
        temp: currentTemp,
        description: weatherDescription
    };
}


function submitLocation() {
    let locationWethaer = document.querySelector('#location');
    let locationForm = document.querySelector('#locationForm');

    locationForm.addEventListener('click', async (e)=> {
        e.preventDefault();
        let userLocation = locationWethaer.value;
        if (userLocation.trim() !== "") {
            let weatherLoc = await getWeather(userLocation);
            if (weatherLoc) {
                buildDisplay(userLocation, weatherLoc.temp, weatherLoc.description)
            }
        }
        
    })
    return locationWethaer;
}
submitLocation();

function buildDisplay(weatherLocation, currentTemperature, weatherDesc) {
    let dataDisplay = document.querySelector('.dataDisplay');
    dataDisplay.innerHTML = '';
    let tempdisplay = document.createElement('div');
    tempdisplay.classList.add('tempdisplay');
    let tempHeader = document.createElement('h2');
    tempHeader.textContent = 'Local Temperature Information';
    let tempInfo = document.createElement('p');
    tempInfo.textContent = 'The local temperature in ' + weatherLocation + ' is: ' + currentTemperature + ' F';
    let tempDescp = document.createElement('p');
    tempDescp.textContent = weatherDesc;
    tempdisplay.appendChild(tempHeader);
    tempdisplay.appendChild(tempInfo);
    tempdisplay.appendChild(tempDescp);
    dataDisplay.appendChild(tempdisplay);
}
