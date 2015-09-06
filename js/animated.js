divClick.onclick = function () {
	weather8Table.style.display = "table";
	weather8Div.style.display = "none";
}
tableClick.onclick = function () {
	weather8Div.style.display = "block";
	weather8Table.style.display = "none";
}

var letters = document.getElementsByClassName('letter');

      setTimeout(function() {
        setTimeout(function() {
          letters[0].className = 'text-center letter location up'}, 80);
        setTimeout(function() {
          letters[0].className = 'text-center letter location back'}, 500+80);
      }, 400);


$('.slider')
		.animate({ 
        "top": "50px"
      }, {queue:false, duration: 4000, easing:"easeOutElastic"} );

var addHandlers = function (nodes) {
		var animation = function (i) {
			return function (e) {
				 setTimeout(function() {
                    setTimeout(function() {
                      nodes[i].className = 'weather-icon left'}, 80);
                    setTimeout(function() {
                      nodes[i].className = 'weather-icon back'}, 500+80);
                  }, 400);
			};
		};
		var i;
		for (var i = 0; i < nodes.length; i++) {
			nodes[i].onclick = animation(i);
		};
	};
	var nodes = document.querySelectorAll('.weather-icon');
	addHandlers(nodes);