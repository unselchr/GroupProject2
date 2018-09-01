// // Script for creating the Graph using chart.js
// // Our labels along the x-axis
// var months = [0, 1, 2, 3, 4, 5, 6];
// // For drawing the lines
// var totalCost = [47850, 47850, 47850, 47850, 47850, 47850, 47850];
// var totalPrice = [42500, 46200, 49600, 52700, 55500, 58000, 60200];

// var ctx = document.getElementById("myChart");
// var myChart = new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: months,
//     datasets: [
//       {
//         data: totalCost,
//         label: "Total Cost",
//         borderColor: "#3e95cd",
//         fill: false
//       },
//       {
//         data: totalPrice,
//         label: "Total Price",
//         borderColor: "#8e5ea2",
//         fill: false
//       }
//     ]
//   }
// });

// // Script for requesting a quote on September feeder calves from the Barchart API
// //

// function requestQuote(twoDigitYear) {
//   // Barchart API call where the symbol for September 2018 feeder calves is hardwired in
//   var queryURL =
//     "https://marketdata.websol.barchart.com/getQuote.json?apikey=fb979bafe708bfae93cf3f7537d8b896&symbols=GFU18";

//   // alternative API call if the current year is provided in variable twoDigitYear
//   // var queryURL = "https://marketdata.websol.barchart.com/getQuote.json?apikey=fb979bafe708bfae93cf3f7537d8b896&symbols=GFU" + twoDigitYear

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     var price = response.results.lastPrice;
//     console.log(price);
//   });
// }
