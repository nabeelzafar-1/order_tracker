var chartData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      fillColor: "#79D1CF",
      strokeColor: "#79D1CF",
      data: [60, 80, 81, 56, 55, 40],
    },
  ],
};

var data = {
  labels: ["Android", "iOS", "Other"],
  datasets: [
    {
      data: deviceChart.split(","),
      backgroundColor: ["#FF6384", "#36A2EB", "#368954"],
      hoverBorderColor: ["#eee", "#eee", "#eee"],
    },
  ],
};
var piectx = document.getElementById("piechart").getContext("2d");
var pieChart = new Chart(piectx, {
  type: "pie",
  data: data,
  options: {
    showAllTooltips: true,
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    elements: {
      arc: {
        borderColor: "#fff",
      },
    },
    title: {
      display: true,
      text: "Top Devices",
      fontSize: 18,
      padding: 20,
      fontColor: "#999",
      fontStyle: "Normal",
      fontFamily: "Montserrat",
      fullWidth: true,
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        boxWidth: 30,
        fontColor: "#999",
        fontFamily: "Montserrat",
        fullWidth: true,
      },
    },
    tooltips: {
      enabled: false,
      bodyFontColor: "#efefef",
      fontStyle: "Normal",
      bodyFontFamily: "Montserrat",
      cornerRadius: 2,
      backgroundColor: "#333",
      xPadding: 7,
      yPadding: 7,
      caretSize: 5,
      bodySpacing: 10,
    },
  },
});

var columnctx = document.getElementById("columnchart").getContext("2d");
var columnChart = new Chart(columnctx, {
  type: "bar",
  data: {
    labels: [
      "Backflipt Product",
      "Backflipt Product",
      "Backflipt Product",
      "Backflipt Product",
      "Backflipt Product",
      "Backflipt Product",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            zeroLineWidth: 10,
          },
        },
      ],
    },
  },
  onAnimationComplete: function () {
    var ctx = this.chart.ctx;
    ctx.font = this.scale.font;
    ctx.fillStyle = this.scale.textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";

    this.datasets.forEach(function (dataset) {
      dataset.bars.forEach(function (bar) {
        ctx.fillText(
          dataString + "#",
          position.x,
          position.y - fontSize / 2 - padding
        );
      });
    });
  },
});

// var ctxx = document.getElementById("columnchart").getContext("2d");
// var myBar = new Chart(ctxx).Bar(chartData, {
//     showTooltips: false,
//     onAnimationComplete: function () {

//         var ctx = this.chart.ctx;
//         ctx.font = this.scale.font;
//         ctx.fillStyle = this.scale.textColor
//         ctx.textAlign = "center";
//         ctx.textBaseline = "bottom";

//         this.datasets.forEach(function (dataset) {
//             dataset.bars.forEach(function (bar) {
//                 ctx.fillText(bar.value, bar.x, bar.y - 5);
//             });
//         })
//     }
// });
