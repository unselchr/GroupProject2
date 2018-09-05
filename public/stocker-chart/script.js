
$.ajax({
  url: "/jsonPlan:" + $("#planID").text(),
  method: "GET"

}).then(function(response) {
  console.log(response);
  console.log(response[0].interestRate);


    //--------------------------
  // Calculations Section
  //--------------------------
  //
  // 1. Cost Per Head to Purchase Each Calf
  var purchaseCostPerHead = parseFloat(response[0].aveStartingWeight) * parseFloat(response[0].costPerHeadPer100Pounds) * 0.01;
  console.log("purchaseCostPerHead: $" + purchaseCostPerHead);
  //
  // 2. Sum of Purchase Cost Per Head and Other Costs Per Head
    var sumCostPerHead = purchaseCostPerHead + parseFloat(response[0].pastureRentPerHead) + parseFloat(response[0].vetCostPerHead) + parseFloat(response[0].truckTripPerHead);
    console.log("sumCostPerHead: " + sumCostPerHead);
  //
  // 3. Calculate Interest Cost Per Head
    var interestCostPerHead = parseFloat(response[0].interestRate) * 0.01 * sumCostPerHead / 2;
    console.log("interestCostPerHead: " + interestCostPerHead);
    //
  // 4. Calculate Total Cost Per Head by Adding the Sum Per Head above and the Interest Cost Per Head
    var totalCostPerHead = sumCostPerHead + interestCostPerHead;
    console.log("totalCostPerHead: " + totalCostPerHead);
    $("#totalCostPerHead").text("$" + totalCostPerHead);
    //
  // 5. Calculate the Total Cost
    var totalCost = parseFloat(response[0].numHeadsPurchased) * totalCostPerHead;
    $("#totalCost").text("$" + totalCost);
  //
  // 6. Total Weight Gain Per Head
    var totalWeightGainPerHead = parseFloat(response[0].weightGainPerDay) * parseFloat(response[0].numDaysOnPasture);
  //
  // 6. Final Weight Per Head by adding Starting Weight to Total Weight Gain Per Head
    var finalWeightPerHead = parseFloat(response[0].aveStartingWeight) + totalWeightGainPerHead;
    $("#finalWeightPerHead").text(finalWeightPerHead);
  //
  // 7. Total Sale Price Per Head is the final weight times the sale price per hundred pounds 
    var salePricePer100 = parseFloat(response[0].pricePerHeadPer100Pounds);
    var totalSalePricePerHead = finalWeightPerHead * salePricePer100 * 0.01;
    $("#salePricePer100").text("$" + salePricePer100);
    $("#salePricePerHead").text("$" + totalSalePricePerHead);
  //
  // 8. Total (Sale) Price
    var totalPrice = parseFloat(response[0].numHeadsPurchased) * totalSalePricePerHead;
    $("#totalSalePrice").text("$" + totalPrice);
  //
  // 9. Total Margin
    var totalMargin = totalPrice - totalCost;
    $("#totalMargin").text("$" + totalMargin);
  //


  //--------------------------
  // Array Calculations Section (calculate these values for the purchase date
  // and for each month thereafter)
  //--------------------------
  //
  var totalCostPerHeadArray = [];
  var totalCostArray = [];

  var monthlyWeightPerHeadArray = [];
  var monthlyPricePerHeadPer100PoundsArray = [];
  var monthlyPricePerHeadArray = [];
  var monthlyTotalPriceArray = [];


  for (i = 0; i < 7; i++) {
    totalCostPerHeadArray[i] = totalCostPerHead;
    totalCostArray[i] = totalCost;

    monthlyWeightPerHeadArray[i] = parseFloat(response[0].aveStartingWeight) + (parseFloat(response[0].weightGainPerDay) * [i] * 30);
    monthlyPricePerHeadPer100PoundsArray[i] = parseFloat(response[0].costPerHeadPer100Pounds) - (([i]/6) * (parseFloat(response[0].costPerHeadPer100Pounds) - parseFloat(response[0].pricePerHeadPer100Pounds)));
    monthlyPricePerHeadArray[i] = monthlyPricePerHeadPer100PoundsArray[i] * 0.01 * monthlyWeightPerHeadArray[i];
    monthlyTotalPriceArray[i] = parseFloat(response[0].numHeadsPurchased) * monthlyPricePerHeadArray[i];
  }

  console.log("totalCostPerHeadArray: " + totalCostPerHeadArray);
  console.log("totalCostPerHeadArray: " + totalCostArray);
  console.log("monthlyWeightPerHeadArray: " + monthlyWeightPerHeadArray);
  console.log("monthlyPricePerHeadPer100PoundsArray: " + monthlyPricePerHeadPer100PoundsArray);
  console.log("monthlyPricePerHeadArray: " + monthlyPricePerHeadArray);
  console.log("monthlyTotalPriceArray: " + monthlyTotalPriceArray);

  var months = [0, 1, 2, 3, 4, 5, 6];

  //--------------------------
  // Chart Script using chart.js
  //--------------------------
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          data: totalCostArray,
          label: "Total Cost",
          borderColor: "#3e95cd",
          fill: false
        },
        {
          data: monthlyTotalPriceArray,
          label: "Total Price",
          borderColor: "#8e5ea2",
          fill: false
        }
      ]
    }
  });
});



// Script for requesting a quote on September feeder calves from the Barchart API
//

function requestQuote(twoDigitYear) {
  // Barchart API call where the symbol for September 2018 feeder calves is hardwired in 
  var queryURL = "https://marketdata.websol.barchart.com/getQuote.json?apikey=fb979bafe708bfae93cf3f7537d8b896&symbols=GFU18"

  // alternative API call if the current year is provided in variable twoDigitYear
  // var queryURL = "https://marketdata.websol.barchart.com/getQuote.json?apikey=fb979bafe708bfae93cf3f7537d8b896&symbols=GFU" + twoDigitYear

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      var price = response.results.lastPrice;
      console.log(price);
    }
  );
}

