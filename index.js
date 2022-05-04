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

const tempValue = 22;
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
        text: "",
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
        marginBottom: 50,
      },
      series: [
        {
          data: [tempValue],
          type: "column",
          pointWidth: 20,
          borderWidth: 0,
          name: "Left",
          zoneAxis: "y",
          zones: tempColorZones,
        },
      ],
      legend: {
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
        title: {
          text: "",
        },
        gridLineWidth: 2,
        tickWidth: 1,
      },
      title: {
        text: "",
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
          fill: getCurrentColor(tempValue, tempColorZones),
        })
        .add();
    }
  );
};
