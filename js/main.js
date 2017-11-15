// READ THIS FIRST

// 1. All of the code needed to let user enter a location is here and works
// 2. The only code that needs editing begins on line 69


// VARIABLES

var open_settings = document.querySelector(".open-settings");
var close_settings = document.querySelector(".close-settings");
var settings = document.querySelector(".settings");
var sheets = document.styleSheets; // returns an Array-like StyleSheetList
var sheet = document.styleSheets[0];

var submit_form = document.querySelector(".submit");
var input_lc = document.querySelector(".locale");

if (localStorage.getItem("locale")){
  var lc = localStorage.getItem("locale");
} else {
  // Default location (area code or city, state or airport code – in quotes)
  var lc = "Providence, RI";
}


// EVENTS

open_settings.addEventListener("click",function(){
  openSettings();
});

close_settings.addEventListener("click",function(){
  closeSettings();
});


submit_form.addEventListener("click",function(e){
  // prevent defalt click behavior
  e.preventDefault();
  // get locale from form
  lc = locale.value;
  // store values in local storage
  localStorage.setItem("locale", lc);
  // close settings panel
  updateSettings();
  closeSettings();
});

// FUNCTIONS

function openSettings(){
  settings.classList.add("js-bounceIndown");
  settings.classList.remove("js-bounceOutup");
  open_settings.classList.add("js-hide");
  close_settings.classList.remove("js-hide");
  status = 1;
}

function closeSettings(){
  if(status!=0){
    settings.classList.remove("js-bounceIndown");
    settings.classList.add("js-bounceOutup");
  }
  close_settings.classList.add("js-hide");
  open_settings.classList.remove("js-hide");
}

function updateSettings(){
  reallySimpleWeather.weather({
    wunderkey: '', // leave blank for Yahoo API
    location: lc, //your location here, also works in lat/lon
    woeid: '', // "Where on Earth ID" optional alternative to location
    unit: 'f', // 'c' also works
    success: function(weather) {
      // sample data to display city and temperature
    html ='<body>';
    html +=  '<main>';

      html += '<div class"background">'
        html += '<img src="img/weather_backgrounds/weatherBkgds-'+weather.code+'.jpg">';
      html += '</div>';

      html += '<section class="current-top">';
        html += '<h1 class="location"> '+weather.city+' , '+weather.region+' </h1>';
        html += '<h2 class="temperature">'+weather.temp+'&deg;</h2>';
        html += '<p class="condition">'+weather.currently+'</p>';
      html += '</section>';

      html += '<section class="current-bottom">';
        html += '<p class="wind"> <span>Wind</span> '+weather.wind.direction+' '+weather.wind.speed+''+weather.units.speed+' </p>';
        html += '<p class="highlow"> <span>Temp.</span> H '+weather.high+'&deg; / L '+weather.low+'&deg;</p>';
        html += '<p class="humidity"> <span>Humid.</span> '+weather.humidity+'%</p>';
      html += '</section>';

      html += '<section class="forecast">';
        html += '<div class="days">';
          html += '<h2 class="next_day">'+weather.forecast[1].day+'</h2>';
          html += '<a><i class="icon icon-'+weather.forecast[1].code+'"></i></a>';
          html += '<p class="next_temp"> '+weather.forecast[1].high+'&deg;/'+weather.forecast[1].low+'&deg;</p>';
        html += '</div>';

        html += '<div class="days">';
          html += '<h2 class="next_day"> '+weather.forecast[2].day+'</h2>';
          html += '<a><i class="icon icon-'+weather.forecast[2].code+'"></i></a>';
          html += '<p class="next_temp"> '+weather.forecast[2].high+'&deg;/'+weather.forecast[2].low+'&deg;</p>';
        html += '</div>';

        html += '<div class="days">';
          html += '<h2 class="next_day"> '+weather.forecast[3].day+'</h2>';
          html += '<a><i class="icon icon-'+weather.forecast[3].code+'"></i></a>';
          html += '<p class="next_temp"> '+weather.forecast[3].high+'&deg;/'+weather.forecast[3].low+'&deg;</p>';
        html += '</div>';

        html += '<div class="days">';
          html += '<h2 class="next_day"> '+weather.forecast[4].day+'</h2>';
          html += '<a><i class="icon icon-'+weather.forecast[4].code+'"></i></a>';
          html += '<p class="next_temp"> '+weather.forecast[4].high+'&deg;/'+weather.forecast[4].low+'&deg;</p>';
        html += '</div>';
      html += '</section>';

      html += '<img class="logo_bottom" src="img/climate_daily_logo.png" alt="Climate Daily with a sun coming up from the right">';
    html += '</main>';
    html +='</body>';
      document.getElementById('weather').innerHTML = html;
    },
    error: function(error) {
      document.getElementById('weather').innerHTML = '<p>'+error+'</p>';
    }
  });
}

//INITIALIZE

closeSettings();
updateSettings();

