$.ajax({
  url: "jsonPlan:" + window.location.href.substring(window.location.href.indexOf(":"), window.location.href.length),
  method: "GET"

}).then(function(response) {
  console.log(response);
});


function displayResults(aveStartingWeight,
  costPerHeadPer100Pounds,
  vetCostPerHead,
  truckTripPerHead,
  interestRate,
  numHeadsPurchased, 
  weightGainPerDay,
  numDaysOnPasture,
  pricePerHeadPer100Pounds,
  totalSalePricePerHead) {

  // Our labels along the x-axis
  var months = [0, 1, 2, 3, 4, 5, 6];

  // Hard-wired data for drawing the lines
  // var totalCost = [47850,47850,47850,47850,47850,47850,47850];
  // var totalPrice = [42500,46200,49600,52700,55500,58000,60200];

  //--------------------------
  // Variables to Use for Calculations
  //--------------------------
  //
  // planTitle:newPlan.title,
  // numHeadsPurchased:newPlan.heads,
  // aveStartingWeight:newPlan.startingWeight,
  // costPerHeadPer100Pounds:newPlan.costPerHundredLbs,
  // isManualCPHP100:true,
  // pastureAcresPerHead:newPlan.acresPerHead,
  // pastureRentPerHead:newPlan.rentPerHead,
  // vetCostPerHead:newPlan.vetCostPerHead,
  // truckTripPerHead:newPlan.transportPerHead,
  // interestRate:newPlan.interestRate,
  // weightGainPerDay:newPlan.lbsPerDay,
  // numDaysOnPasture:newPlan.daysOnPasture,
  // pricePerHeadPer100Pounds:newPlan.futurePrice,
  // userId:newPlan.userID

  //--------------------------
  // Calculations Section
  //--------------------------
  //
  // 1. Cost Per Head to Purchase Each Calf
    var purchaseCostPerHead = aveStartingWeight * costPerHeadPer100Pounds;
  //
  // 2. Sum of Purchase Cost Per Head and Other Costs Per Head
    var sumCostPerHead = purchaseCostPerHead + pastureAcresPerHead + vetCostPerHead + truckTripPerHead;
  //
  // 3. Calculate Interest Cost Per Head
    var interestCostPerHead = interestRate * purchaseCostPerHead;
  //
  // 4. Calculate Total Cost Per Head by Adding the Sum Per Head above and the Interest Cost Per Head
    var totalCostPerHead = sumCostPerHead + interestCostPerHead;
  //
  // 5. Calculate the Total Cost
    var totalCost = numHeadsPurchased * totalCostPerHead;
  //
  // 6. Total Weight Gain Per Head
    var totalWeightGainPerHead = weightGainPerDay * numDaysOnPasture;
  //
  // 6. Final Weight Per Head by adding Starting Weight to Total Weight Gain Per Head
    var finalWeightPerHead = aveStartingWeight + totalWeightGainPerHead;
  //
  // 7. Total Sale Price Per Head is the final weight times the sale price per hundred pounds 
    var totalSalePricePerHead = finalWeightPerHead * pricePerHeadPer100Pounds;
  //
  // 8. Total (Sale) Price
    var totalPrice = numHeadsPurchased * totalSalePricePerHead;
  //
  // 9. Total Margin
    var totalMargin = totalPrice - totalCost;
  //
  //
}

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
    totalCostPerHeadArray(i) = totalCostPerHead;
    totalCostArray(i) = totalCost;

    monthlyWeightPerHeadArray(i) = aveStartingWeight + (weightGainPerDay * i * 30);
    monthlyPricePerHeadPer100PoundsArray(i) = costPerHeadPer100Pounds - ((i/6) * (costPerHeadPer100Pounds - pricePerHeadPer100Pounds));
    monthlyPricePerHeadArray(i) = monthlyPricePerHeadPer100PoundsArray(i) * monthlyWeightPerHeadArray(i);
    monthlyTotalPriceArray(i) = numHeadsPurchased * monthlyPricePerHeadArray(i);
  }


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
};

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

