// Go to this URL and register https://openweathermap.org/appid
// Get your API KEY (appid) 6312c1c01f22491abd2c35e6001ee7fa
const APIkey = '6312c1c01f22491abd2c35e6001ee7fa';
const baseURL = 'https://api.weatherbit.io/v2.0/current?';
// let latitude = 41.385048552574034
// let longitude = 2.172438135466628

let getUserPosition = () => {
    console.log('from getUserPostion')
    navigator.geolocation.getCurrentPosition((location) => onPostionRecived(location), (error) => onPositionDenied(error));
   }

let onPostionRecived = (position) => {
    let {coords: {latitude, longitude}} = position;
    callWeatherAPIWithCords(latitude, longitude)
}
let onPositionDenied = (error) => {
   console.error(error);
 }
let callWeatherAPIWithCords = (latitude, longitude) => {

    let URL = `${baseURL}lat=${latitude}&lon=${longitude}&key=${APIkey}`;

    let call = fetch(URL);
    // when call goes right 
    call.then((response)=> response.json()).then((weatherInfo) => showWeatherInfo(weatherInfo.data[0]));
    // if something went wrong
    call.catch((error)=> console.error('Something went wrong', error));
}

let showWeatherInfo = (weatherObject) => {
    
let {
    city_name,
    coutry_code,
    temp,
    weather : {description, icon}
} = weatherObject;

let descriptionPar = document.querySelector('.temperature-description p')
    descriptionPar.innerText = description

let locationPar =  document.querySelector('.location p')
    locationPar.innerText = `${city_name}, ${country_code}`

let temperatureValueP =  document.querySelector('.temperature-value p');
    temperatureValueP.innerHTML = `${temp}° <span>C</span>`

let weathericonPic =  document.querySelector('.weather-icon img');
let sliceFirstLetter = icon.slice(1);
weathericonPic.setAttribute('src', `icons/${sliceFirstLetter}.png`);
​
}

getUserPosition();
