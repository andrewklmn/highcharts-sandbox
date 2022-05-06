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

  buildThermometer({
    highcharts: Highcharts,
    target: "container2",
    min: 10,
    max: 40,
    value: tempValue,
    label: "Air",
    tooltipTitle: "Current Temp",
    colorZones: tempColorZones,
  });
};

function buildThermometer({
  highcharts,
  target,
  min,
  max,
  value,
  label,
  tooltipTitle,
  colorZones,
}) {
  if (!highcharts) {
    const container = document.getElementById(target);
    container.innerHTML = "Please provide Highcharts library";
    return;
  }

  const getCurrentColor = (value, colorZones) => {
    let color = colorZones[colorZones.length - 1].color;

    for (let i = 0; i < colorZones.length - 1; i++) {
      if (colorZones[i].value > value) {
        return colorZones[i].color;
      }
    }
    return color;
  };

  highcharts.chart(
    target,
    {
      chart: {
        marginBottom: 60,
      },
      plotOptions: {
        series: {
          stacking: "normal",
          animation: false,
        },
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: `<table><tr><td colspan="2" style="text-align:center;">${
          tooltipTitle ?? ""
        }</td></tr>`,
        pointFormat:
          '<tr><td style="color: {series.color}">{series.name} </td>' +
          '<td style="text-align: right"><b>{point.y}°C</b></td></tr>',
        footerFormat: "</table>",
        valueDecimals: 2,
      },
      series: [
        {
          data: [value],
          type: "column",
          pointWidth: 20,
          borderWidth: 0,
          name: label,
          zoneAxis: "y",
          zones: colorZones,
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
        min,
        max,
        minPadding: 0,
        maxPadding: 0,
        startOnTick: true,
        endOnTick: true,
        lineWidth: 0,
        minorGridLineWidth: 0,
        title: null,
        tickInterval: 2,
        tickWidth: 2,
        tickLength: 12,
        tickColor: "#999",
        tickPosition: "inside",
        minorTicks: true,
        minorTickColor: "#999",
        minorTickWidth: 1,
        minorTickLength: 8,
        minorTickInterval: 1,
        minorTickPosition: "inside",
        gridLineWidth: 0,
        offset: -5,
        startOnTick: true,
      },
      title: {
        text: label,
        align: "center",
        x: 5,
        y: 20,
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
          fill: getCurrentColor(value, colorZones),
        })
        .add();

      chart.renderer
        .rect(chart.plotLeft + 22, chart.plotTop, radius, series.yAxis.len)
        .attr({
          fill: "lightgray",
          zIndex: 0,
        })
        .add();

      chart.renderer
        .text(
          String(value) + "°C",
          chart.plotLeft + 5,
          chart.plotTop + series.yAxis.len + radius * 2 + 15
        )
        .css({
          "font-size": "16px",
          "font-weight": "bold",
        })
        .attr({
          fill: getCurrentColor(value, colorZones),
          zIndex: 2,
        })
        .add();
    }
  );
}
