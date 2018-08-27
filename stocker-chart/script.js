// Our labels along the x-axis
var months = [0,1,2,3,4,5,6];
// For drawing the lines
var totalCost = [47850,47850,47850,47850,47850,47850,47850];
var totalPrice = [42500,46200,49600,52700,55500,58000,60200];

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: months,
    datasets: [
      { 
        data: totalCost,
        label: "Total Cost",
        borderColor: "#3e95cd",
        fill: false
      },
      { 
        data: totalPrice,
        label: "Total Price",
        borderColor: "#8e5ea2",
        fill: false
      }
    ]
  }
});