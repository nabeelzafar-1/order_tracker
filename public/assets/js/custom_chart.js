var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [{
      label: 'apples',
      data: [12, 19, 3, 17, 6, 3, 7],
      backgroundColor: "rgba(153,255,51,0.6)"
    }, {
      label: 'oranges',
      data: [2, 29, 5, 5, 2, 3, 10],
      backgroundColor: "rgba(255,153,0,0.6)"
    }]
  }
});


/*=========================================
Line Chart
===========================================*/
var ctx = document.getElementById('linechart');

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    
    // The data for our dataset
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
        {
          label: "",
          backgroundColor: 'transparent',
          borderColor: 'rgb(82, 136, 255)',
          data: [2000, 11000, 10000, 14000, 11000, 17000, 14500,18000,12000,23000,17000,23000],
          lineTension: 0.3,
          pointRadius: 5,
          pointBackgroundColor: 'rgba(255,255,255,1)',
          pointHoverBackgroundColor: 'rgba(255,255,255,0.6)',
          pointHoverRadius: 10,
          pointHitRadius: 30,
          pointBorderWidth: 2,
          pointStyle: 'rectRounded'
        }
      ]
    },
    
    // Configuration options go here
    options: {
      legend: {
         display: false
       },
      scales: {
        xAxes: [{
          gridLines: {
            display:false
          }
        }],
        yAxes: [{
          gridLines: {
             display:true
          },
       ticks: {
            callback: function(value) {
              var ranges = [
                { divider: 1e6, suffix: 'M' },
                { divider: 1e3, suffix: 'k' }
              ];
              function formatNumber(n) {
                for (var i = 0; i < ranges.length; i++) {
                  if (n >= ranges[i].divider) {
                    return (n / ranges[i].divider).toString() + ranges[i].suffix;
                  }
                }
                return n;
              }
              return '$' + formatNumber(value);
            }
          },
       }]
     },
     tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          console.log(data);
          console.log(tooltipItem);
          return data['labels'][tooltipItem[0]['index']];
        },
        label: function(tooltipItem, data) {
          return  '$' + data['datasets'][0]['data'][tooltipItem['index']];
        },
      },
      backgroundColor: '#606060',
      titleFontSize: 14,
      titleFontColor: '#ffffff',
      bodyFontColor: '#ffffff',
      bodyFontSize: 18,
      displayColors: false
    }
  }
});

 


 var options = {
      chart: {
        type: "line",
        height: 300,
        foreColor: "#999",
        stacked: true,
        dropShadow: {
          enabled: true,
          enabledSeries: [0],
          top: -2,
          left: 2,
          blur: 5,
          opacity: 0.06
        }
      },
      colors: ['#0090FF'],
      stroke: {
        curve: "smooth",
        width: 3
      },
      dataLabels: {
        enabled: false
      },
      series: [{
        name: 'Total Views',
        data: generateDayWiseTimeSeries(0, 18)
      }],
      markers: {
        size: 0,
        strokeColor: "#fff",
        strokeWidth: 3,
        strokeOpacity: 1,
        fillOpacity: 1,
        hover: {
          size: 6
        }
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          offsetX: 14,
          offsetY: -5
        },
        tooltip: {
          enabled: true
        }
      },
      grid: {
        padding: {
          left: -5,
          right: 5
        }
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
      fill: {
        type: "solid",
        fillOpacity: 0.7
      }
    };

    // Total time by game

    var chart = new ApexCharts(document.querySelector("#timeline-chart"), options);

    chart.render();

    function generateDayWiseTimeSeries(s, count) {
      var values = [[4,3,10,9,29,19,25,9,12,7,19,5,13]];
      var i = 0;
      var series = [];
      var x = new Date().getTime();
      while (i < count) {
        series.push([x, values[s][i]]);
        x += 86400000;
        i++;
      }
      return series;
    }





//Total Revenue by Promo by Day

    var ctx = document.getElementById("myChart_2");
var myChart_2 = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of IDK',
            data: [300000, 456000, 1200000, 1360000, 980000, 1480000]
        }]
    },
    options: {
        scales: {
            yAxes: {
                ticks: {
                    beginAtZero:true,
                    sampleSize:30,
                    // maxTicksLimit:30,
                    callback: (value, index, ticks) => {
                        let a = ['', 'K', 'M', 'B', 'T'];
                        let limit = 4;
                        let counter = 0;
                        let v = value;
                        while(counter < limit && v >= 1000) {
                          v = v/1000;
                          counter = counter + 1;
                        }

                        return v + a[counter];
                    }
                }
            },
        }
    }
});