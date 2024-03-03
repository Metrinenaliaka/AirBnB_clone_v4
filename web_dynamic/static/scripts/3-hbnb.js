$(document).ready(function () {
  let amenitiesChecked = []
  let url = 'http://0.0.0.0:5001/api/v1/status/'
  $.getJSON(url, function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    }
    else {
      $('#api_status').removeClass('available');
    }
  });
  $('input ["type=checkbox"]').change(function() {
    if (this.checked) {
      let amenityId = $(this).attr('data-id');
      amenitiesChecked.push(amenityId);
     }
    else {
      amenitiesChecked.splice($.inArray(checked, amenitiesChecked), 1);
    }
    $('.amenities h4').text(amenitiesChecked);
  });
  $.post('http://0.0.0.0:5001/api/v1/places_search/', {}, function(data){
	  //looping through the data
	  $.each(data, function(index, place) {
	  	let phtml = createPlaceHTML(place);
	  	$('.places').append(phtml);
	  });
  }, 'json'});
  function createPlaceHTML(place) {
        return '<article>' +
                    '<div class="title">' +
                        '<h2>' + place.name + '</h2>' +
                        '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                    '</div>' +
                    '<div class="information">' +
                        '<div class="max_guest">' + place.max_guest + ' Guest(s)</div>' +
                        '<div class="number_rooms">' + place.number_rooms
});
