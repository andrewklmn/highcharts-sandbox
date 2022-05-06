window.onload = function () {
  buildBulb({
    highcharts: Highcharts,
    target: "container",
    type: "logarithmic",
    min: 15,
    max: 1000,
    value: 1000,
    label: "QDA count",
    tooltipTitle: "QDA Count",
    colorZones: [
      {
        value: 20,
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
    ],
  });

  buildScaledBar({
    highcharts: Highcharts,
    target: "container3",
    type: "logarithmic",
    min: 2000,
    max: 30000,
    value: 3000,
    label: "Steps",
    tooltipTitle: "Steps",
    colorZones: [
      {
        value: 3500,
        color: "red",
      },
      {
        value: 5000,
        color: "#fcb103",
      },
      {
        value: 20000,
        color: "green",
      },
      {
        color: "#fcb103",
      },
    ],
  });

  buildThermometer({
    highcharts: Highcharts,
    target: "container2",
    min: 10,
    max: 40,
    value: 26,
    label: "Air",
    tooltipTitle: "Current Temp",
    colorZones: [
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
    ],
  });
};
