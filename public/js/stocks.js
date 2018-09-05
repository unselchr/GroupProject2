function requestQuote(twoDigitYear) {
  // Barchart API call where the symbol for September 2018 feeder calves is hardwired in
  console.log(twoDigitYear);
  var queryURL =
    "https://marketdata.websol.barchart.com/getQuote.json?apikey=fb979bafe708bfae93cf3f7537d8b896&symbols=GFU18";

  // alternative API call if the current year is provided in variable twoDigitYear
  // var queryURL = "https://marketdata.websol.barchart.com/getQuote.json?apikey=fb979bafe708bfae93cf3f7537d8b896&symbols=GFU" + twoDigitYear

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.results);
    var futurePrice = response.results[0].lastPrice;
    console.log(futurePrice);
    $("#futureGuess").text(futurePrice);
  });
}
$(document).ready(function() {
  requestQuote("18");
});
