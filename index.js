const bulbValue = 250;
const bulbColorZones = [
  {
    value: 10,
    color: "red",
  },
  {
    value: 50,
    color: "#fcb103",
  },
  {
    value: 100,
    color: "green",
  },
  {
    color: "green",
  },
];

const tempValue = 26;
const tempColorZones = [
  {
    value: 23,
    color: "red",
  },
  {
    value: 27,
    color: "#fcb103",
  },
  {
    value: 33,
    color: "green",
  },
  {
    value: 35,
    color: "#fcb103",
  },
  {
    value: 37,
    color: "red",
  },
  {
    color: "red",
  },
];

const getCurrentColor = (value, colorZones) => {
  let color = colorZones[colorZones.length - 1].color;

  for (let i = 0; i < colorZones.length - 1; i++) {
    if (colorZones[i].value > value) {
      return colorZones[i].color;
    }
  }
  return color;
};

window.onload = function () {
  // BULB example
  Highcharts.chart(
    "container",
    {
      chart: {
        marginBottom: 50,
      },
      series: [
        {
          data: [bulbValue],
          type: "column",
          pointWidth: 40,
          borderWidth: 0,
          name: "Left",
          zoneAxis: "y",
          zones: bulbColorZones,
        },
      ],
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        labels: {
          enabled: false,
        },
        lineWidth: 0,
        tickWidth: 0,
      },
      yAxis: {
        type: "logarithmic",
        min: 10,
        max: 1000,
        title: {
          text: "",
        },
        gridLineWidth: 2,
        tickWidth: 1,
      },
      title: {
        text: "QDA count",
      },
    },
    function (chart) {
      var series = chart.series[0],
        point = series.points[0],
        radius = 20;
      chart.renderer
        .circle(
          chart.plotLeft + point.shapeArgs.x + point.shapeArgs.width / 2,
          chart.plotTop + series.yAxis.len + radius,
          20
        )
        .attr({
          fill: getCurrentColor(bulbValue, bulbColorZones),
        })
        .add();
      chart.renderer
        .rect(
          chart.plotLeft + point.shapeArgs.x,
          chart.plotTop + series.yAxis.len,
          radius * 2,
          radius
        )
        .attr({
          fill: getCurrentColor(bulbValue, bulbColorZones),
        })
        .add();
    }
  );

  // TEMP example
  Highcharts.chart(
    "container2",
    {
      chart: {
        marginBottom: 40,
      },
      plotOptions: {
        series: {
          stacking: "normal",
          animation: false,
        },
      },
      series: [
        {
          data: [tempValue],
          type: "column",
          pointWidth: 20,
          borderWidth: 0,
          name: "Temp",
          zoneAxis: "y",
          zones: tempColorZones,
          plotOptions: {
            column: {
              states: {
                hover: {
                  enabled: false,
                },
              },
            },
          },
        },
      ],
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        labels: {
          enabled: false,
        },
        lineWidth: 0,
        tickWidth: 0,
      },
      yAxis: {
        type: "linear",
        min: 20,
        max: 40,
        minPadding: 0,
        maxPadding: 0,
        startOnTick: true,
        endOnTick: true,
        lineWidth: 0,
        minorGridLineWidth: 0,
        title: null,
        tickInterval: 5,
        tickWidth: 2,
        tickLength: 12,
        tickColor: "#999",
        tickPosition: "inside",
        minorTicks: true,
        minorTickColor: "#999",
        minorTickWidth: 1,
        minorTickLength: 12,
        minorTickInterval: 1,
        minorTickPosition: "inside",
        gridLineWidth: 0,
        offset: -5,
        startOnTick: true,
      },
      title: {
        text: "Temp, C",
      },
    },
    function (chart) {
      var series = chart.series[0],
        point = series.points[0],
        radius = 20;
      chart.renderer
        .circle(
          chart.plotLeft + point.shapeArgs.x + point.shapeArgs.width / 2,
          chart.plotTop + series.yAxis.len + radius - 3,
          20
        )
        .attr({
          fill: getCurrentColor(tempValue, tempColorZones),
        })
        .add();
      chart.renderer
        .rect(chart.plotLeft + 22, chart.plotTop, radius, series.yAxis.len)
        .attr({
          fill: "lightgray",
          zIndex: 0,
        })
        .add();
    }
  );
};
