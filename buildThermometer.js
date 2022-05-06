function buildThermometer({
  highcharts,
  target,
  min,
  max,
  value,
  label,
  tooltipTitle,
  colorZones,
  yAxis = {},
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
        labels: {
          x: -5,
        },
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
        offset: -10,
        startOnTick: true,
        ...yAxis,
      },
      title: {
        text: label,
        align: "center",
        x: 0,
        y: 20,
        color: getCurrentColor(value, colorZones),
        css: {
          "text-anchor": "middle",
        },
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
        .rect(chart.plotLeft + 27, chart.plotTop, radius, series.yAxis.len)
        .attr({
          fill: getCurrentColor(value, colorZones),
          zIndex: 0,
          opacity: 0.3,
        })
        .add();

      chart.renderer
        .text(
          String(value) + "°C",
          chart.plotLeft + 38,
          chart.plotTop + series.yAxis.len + radius * 2 + 15
        )
        .css({
          "font-size": "16px",
          "font-weight": "bold",
          "text-anchor": "middle",
        })
        .attr({
          fill: getCurrentColor(value, colorZones),
          zIndex: 2,
        })
        .add();
    }
  );
}
