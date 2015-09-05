$(function(){
    $('#btnGetWeather').click(function () {
        getWeatherByCity('ua', dataReceived, showError, $('#inputCityName').val());
    });
     $('#inputCityName').keypress(function(e) {
        var ENTER_KEY_CODE = 13;
        if ( e.which === ENTER_KEY_CODE ) 
        {
            $('#btnGetWeather').trigger('click');
            return false;
        }
    });   
    getWeatherData( 'ua', dataReceived, showError);

    function dataReceived(data) {
        var offset = (new Date()).getTimezoneOffset()*60*1000; // Відхилення від UTC  в мілісекундах
        var city = data.city.name;
        var country = data.city.country;
        $("#weather8Table tr:not(:first)").remove();
        $("#weatherDiv .slide").remove();
        $("#weather8Div .col-md-3.col-sm-6.col-xs-12.well").remove();


        $.each(data.list, function(){
            // "this" тримає об'єкт прогнозу звідси: http://openweathermap.org/forecast16
            var localTime = new Date(this.dt*1000 - offset); // конвертуємо час з UTC у локальний
            addWeather(
                this.weather[0].icon,
                moment(localTime).calendar(),	// Використовуємо moment.js для представлення дати
                this.weather[0].description,
                Math.round(this.temp.day) + '&deg;C'
            );
        });
        $('.location').html(city + ', ' + '<b>' + country + '</b>'); // Додаємо локацію на сторінку
    }


    function addWeather(icon, day, condition, temp){
        var repl = day.slice(-11);
        var markupHome = '<div class="slide">'+ 
                        '<div class="box">' +
                            '<h2 class="text-center">' + day.replace(repl,"") + '</h2>'  + '<img class="weather-icon" src="images/icons/'+ icon +'.png" />'+
                            '<div class="conditions">' +
                                '<span id="temp">' + temp + '</span>'  + '<br>' +
                                '<span id="condition">' + condition + '</span>' +
                            '</div>' +
                         '</div>' +
                     '</div>';
        weatherDiv.innerHTML += markupHome;

        var markup8table = '<tr>'+
                '<td>' + day.replace(repl,"") + '</td>' +
                '<td>' + '<img class="weather-icon" src="images/icons/'+ 
                  icon
                  +'.png" />' + '</td>' +
                '<td>' + temp + '</td>' +
                '<td>' + condition + '</td>'
            + '</tr>';
        weather8Table.insertRow(-1).innerHTML = markup8table;

        var markup8Div = '<div class="col-md-3 col-sm-6 col-xs-12 well">'+ 
                        '<div>' +
                            '<h3 class="text-center">' + day.replace(repl,"") + '</h3>'  + '<img class="weather-icon" src="images/icons/'+ icon +'.png" />'+
                            '<div class="conditions">' +
                                '<span id="temp">' + temp + '</span>'  + '<br>' +
                                '<span id="condition">' + condition + '</span>' +
                            '</div>' +
                         '</div>' +
                     '</div>';
        weather8Div.innerHTML += markup8Div;

    }

    function showError(msg){
        $('#error').html('Сталася помилка: ' + msg);
    }

});
