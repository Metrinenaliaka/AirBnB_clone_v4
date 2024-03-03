$(document).ready(function () {
  let amenitiesChecked = [];
  let statesChecked = [];
  let citiesChecked = [];

  let url = 'http://0.0.0.0:5001/api/v1/status/';
  $.getJSON(url, function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $('input[type=checkbox]').change(function() {
    if ($(this).parent().hasClass('locations')) {
      if (this.checked) {
        let stateId = $(this).attr('data-id');
        statesChecked.push(stateId);
      } else {
        statesChecked.splice($.inArray(stateId, statesChecked), 1);
      }
      $('.locations h4').text(statesChecked);
    } else {
      if (this.checked) {
        let cityId = $(this).attr('data-id');
        citiesChecked.push(cityId);
      } else {
        citiesChecked.splice($.inArray(cityId, citiesChecked), 1);
      }
      $('.locations h4').text(citiesChecked);
    }

    let amenityId = $(this).attr('data-id');
    if (this.checked) {
      amenitiesChecked.push(amenityId);
    } else {
      amenitiesChecked.splice($.inArray(amenityId, amenitiesChecked), 1);
    }
    $('.amenities h4').text(amenitiesChecked);
  });

  $('button').click(function () {
    let requestData = {
      amenities: amenitiesChecked,
      states: statesChecked,
      cities: citiesChecked
    };

    $.post('http://0.0.0.0:5001/api/v1/places_search/', requestData, function (data) {
      $('.places').empty();
      $.each(data, function (index, place) {
        let phtml = createPlaceHTML(place);
        $('.places').append(phtml);
      });
    }, 'json');
  });

  $.post('http://0.0.0.0:5001/api/v1/places_search/', {}, function(data){
    $.each(data, function(index, place) {
      let phtml = createPlaceHTML(place);
      $('.places').append(phtml);
    });
  }, 'json');

  function createPlaceHTML(place) {
    return '<article>' +
      '<div class="title">' +
        '<h2>' + place.name + '</h2>' +
        '<div class="price_by_night">$' + place.price_by_night + '</div>' +
      '</div>' +
      '<div class="information">' +
        '<div class="max_guest">' + place.max_guest + ' Guest(s)</div>' +
        '<div class="number_rooms">' + place.number_rooms + '</div>' +
      '</div>' +
    '</article>';
  }
});
