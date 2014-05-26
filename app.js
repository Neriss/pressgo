var pressGoApp = {};
pressGoApp.apikey = "54f72a792e8841069f37bf3052cc96ce";

pressGoApp.init = function(){
	$('#crazycity').hide();
	$('#getout').on('click', function(e){
	e.preventDefault();
	var place = $('input#city').val();
	$('#instructions').hide();
	pressGoApp.updatePlace = function(result){
		$('#crazycity').show();
		$('#crazycity').find('span#cty').text(place);
	};

	pressGoApp.getParty = function(place){
		$.ajax({
			url: "http://ws.audioscrobbler.com/2.0/",
			type: "GET",
			data: {
				method: "geo.getevents", 
				location: place,
				limit: 12,
				api_key: pressGoApp.apikey,
				format: "json"
			},

			dataType: "jsonp",
			success: function(result){				
				pressGoApp.displayEvents(result);
			},
		});
	};
	pressGoApp.getParty(place);
	pressGoApp.updatePlace(place);
	});
};	
		
pressGoApp.displayEvents = function(result){
	$('div.playlist ul').empty();
	$.each(result.events.event, function(i, thisEvent){
		console.log(thisEvent);
		var play = $('<li>').addClass('play');
		var title = $('<h3>').text(thisEvent.title);
		var headact = $('<h4>').text(thisEvent.artists.headliner); //add text		
		var image = $('<img>').attr('src', thisEvent.image[2]['#text']);
		var date = $('<date>').text(thisEvent.startDate);
		//address information
		var address = $('<p>').addClass('address');
		var localname = $('<p>').text(thisEvent.venue.name);
		var city = $('<span>').text(thisEvent.venue.location.city);
		var street = $('<span>').text(thisEvent.venue.location.street + ', ');
		var phone = $('<p>').text(thisEvent.venue.phonenumber);
		
		address.append(localname, street, city, phone);
		play.append(title, headact, image, date, address);

		$('div.playlist ul').append(play);
	});
};

$(function(){
	pressGoApp.init();
});