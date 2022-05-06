function buildScaledBar({
  highcharts,
  target,
  min,
  max,
  type = "linear",
  value,
  label,
  tooltipTitle,
  colorZones,
  yAxis = {},
}) {
  const BULB_WIDTH = 30;

  highcharts.chart(
    target,
    {
      chart: {
        marginBottom: 30,
        width: 110,
        height: 300,
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
          '<td style="text-align: right"><b>{point.y}</b></td></tr>',
        footerFormat: "</table>",
        valueDecimals: 0,
      },
      series: [
        {
          data: [value],
          type: "column",
          pointWidth: BULB_WIDTH,
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
        type,
        min,
        max,
        title: {
          text: "",
        },
        labels: {
          x: -5,
        },
        // tickInterval: 1,
        tickWidth: 2,
        tickLength: 16,
        tickColor: "#999",
        tickPosition: "inside",
        minorTicks: true,
        minorTickColor: "#999",
        minorTickWidth: 1,
        minorTickLength: 16,
        // minorTickInterval: 0.1,
        minorTickPosition: "inside",
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        offset: 16,
        ...yAxis,
      },
      title: {
        text: label,
        x: 10,
        y: 15,
        css: {
          "text-anchor": "middle",
        },
      },
    },
    function (chart) {
      var series = chart.series[0],
        point = series.points[0],
        radius = BULB_WIDTH / 2;
      chart.renderer
        .rect(chart.plotLeft + 11, chart.plotTop, BULB_WIDTH, series.yAxis.len)
        .attr({
          fill: getCurrentColor(value, colorZones),
          opacity: 0.3,
        })
        .add();
      chart.renderer
        .text(
          String(value),
          chart.plotLeft + 26,
          chart.plotTop + series.yAxis.len + 20
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
