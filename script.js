let key = 'a1e4890b1f493963cd6a87ef5cd688d4'

let city = [{lat: 42.88,lon: 74.58},
  {lat: 40.5140,lon: 72.8161},
  {lat: 42.4782,lon: 78.3956},
  {lat: 42.5318,lon: 72.2305},
  {lat: 41.4274,lon: 75.9841},
  {lat: 40.0548,lon: 70.8209},
  {lat: 40.9332,lon: 72.9815},
  {lat: 42.4625,lon: 76.1900},
  {lat: 42.6503,lon: 77.0852},
]

let $select = document.querySelector('select')  
let $time_zone = document.querySelector('.time_zone')
console.log($select.selectedIndex)

let lon = city[0].lon
let lat = city[0].lat
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${key}`
manager(url)

$select.addEventListener('change', function(event){
    let index = $select.selectedIndex
    lat = city[index].lat
    lon = city[index].lon
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${key}`
    manager(url)
    let selectedCity = event.target.value
    $time_zone.textContent = selectedCity
})

let $temp = document.querySelector('.temper')
let $time = document.querySelector('.time')
let $feels_like = document.querySelector('.feels_like')
let $pressure = document.querySelector('.pressure')
let $description = document.querySelector('.description')
let $wind = document.querySelector('.wind')
let $week = document.querySelector('.week')


function manager(urlM){
  let $preloader = document.querySelector('.preloader')
  $preloader.style.display = 'block';
  fetch(urlM)
  .then(resp => resp.json())
  .then(data => {
    $preloader.style.display = 'none'
    $temp.textContent=`${Math.floor(Number(data.current.temp))}°`
    $time.textContent = new Date().getHours() + ':' + new Date().getMinutes()
    $feels_like.textContent = `Ощущается как ${Math.floor(Number(data.current.feels_like))}°`
    $pressure.textContent = ` ${Math.floor(Number(data.current.pressure))} мм ртутного столба`
    $description.textContent = (data.current.weather[0].description)
    $wind.textContent = `${Math.round(Number(data.current.wind_speed))} м/с`;
    $week.innerHTML = ''
    data.daily.forEach(element => {
      let weatherDescription = element.weather[0].description.toLowerCase();
      let images_day = '';
      if (weatherDescription.includes('ясно')){
        images_day = './images/sun.svg';
      } else if (weatherDescription.includes('облачно с прояснениями')){
        images_day = './images/oblachno_proyasn.svg'
      } else if (weatherDescription.includes('небольшая облачность')){
        images_day = './images/oblachno_proyasn.svg'
      } else if (weatherDescription.includes('пасмурно')){
        images_day = './images/pasmurno.svg'
      } else if (weatherDescription.includes('переменная облачность')){
        images_day = './images/oblachno_proyasn.svg'
      } else if (weatherDescription.includes('небольшой дождь')){
        images_day = './images/nebolshoi_dojd.svg'
      } else if (weatherDescription.includes('дождь')){
        images_day = './images/dojd.svg'
      }
      $week.insertAdjacentHTML(
        `beforeend`,
        `
      <div class="week_info">
        <div class="week_info_continer">
          <div>
            <h4 class="week_day">${new Date(element.dt * 1000).toLocaleDateString('ru-Ru', {weekday: 'short'})}</h4>
            <h4 class="week_number">${new Date(element.dt * 1000).toLocaleDateString('ru-Ru', {day: 'numeric', month: 'short'})}</h4>
          </div>
          <img src="${images_day}" alt="">
          <div>
            <h4 class="week_day_temp">${Math.floor(Number(element.temp.day))} °</h4>
            <h4 class="week_night_temp">${Math.floor(Number(element.temp.night))} °</h4>
            <h4 class="week_clouds">${element.weather[0].description}</h4>
          </div>
        </div>
      </div>
      `
      );
    });
  })
}


