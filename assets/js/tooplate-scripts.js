const width_threshold = 480;

function drawLineChart(data) {
  if ($("#lineChart").length) {
    ctxLine = document.getElementById("lineChart").getContext("2d");
    optionsLine = {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    };

    const dropData = [];
    const notDropData = [];

    const maxValues = Object.values(data.dropoutData.Dropout);
    const numberOfDataPoints = 7;

    const maxSum = maxValues.reduce((a, b) => a + b - a, 0) / 6;
    const minSum = maxValues.reduce((a, b) => a + b - a, 0) / 3;

    for (let i = 0; i < numberOfDataPoints; i++) {
      const randomValue1 = Math.floor((Math.random() * maxSum) / 6);
      const randomValue2 = Math.floor((Math.random() * minSum) / 3);
      dropData.push(randomValue1);
      notDropData.push(randomValue2);
    }

    optionsLine.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    configLine = {
      type: "line",
      data: {
        labels: ["0", "1", "2", "3", "4", "5", "6"],
        datasets: [
          {
            label: "Dropout",
            data: dropData,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            cubicInterpolationMode: "monotone",
            pointRadius: 0,
          },
          {
            label: "Not Dropout",
            data: notDropData,
            fill: false,
            borderColor: "rgba(255,99,132,1)",
            cubicInterpolationMode: "monotone",
            pointRadius: 0,
          },
        ],
      },
      options: optionsLine,
    };

    lineChart = new Chart(ctxLine, configLine);
  }
}

function drawBarChart(data) {
  if ($("#barChart").length) {
    ctxBar = document.getElementById("barChart").getContext("2d");

    optionsBar = {
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 0.5,
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    optionsBar.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    configBar = {
      type: "bar",
      data: {
        labels: Object.keys(data.dropoutData),
        datasets: [
          {
            label: "Gender",
            data: Object.values(data.genderData),
            backgroundColor: ["#4ED6B8", "rgba(255,99,132,1)"],
          },
          {
            label: "Drop data",
            data: Object.values(data.dropoutData.Gender),
            backgroundColor: ["#ADD8E6", "#FFFF00"],
          },

          {
            label: "Area",
            data: Object.values(data.areaData),
            backgroundColor: ["#4ED6B8", "rgba(255,99,132,1)"],
          },
        ],
      },
      options: optionsBar,
    };

    barChart = new Chart(ctxBar, configBar);
  }
}

function drawPieChart(data) {
  if ($("#pieChart").length) {
    var chartHeight = 300;

    $("#pieChartContainer").css("height", chartHeight + "px");

    ctxPie = document.getElementById("pieChart").getContext("2d");

    optionsPie = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      },
      legend: {
        position: "top",
      },
    };

    configPie = {
      type: "pie",
      data: {
        datasets: [
          {
            data: Object.values(data.mealData),
            backgroundColor: ["#4ED6B8", "rgba(255,99,132,1)"],
            label: "Meal Data Distribution",
          },
        ],
        labels: Object.keys(data.mealData),
      },
      options: optionsPie,
    };

    pieChart = new Chart(ctxPie, configPie);

    SocialpieChartPie = document.getElementById("SocialpieChart").getContext("2d");

    optionsPie = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      },
      legend: {
        position: "top",
      },
    };

    SocialconfigPie = {
      type: "pie",
      data: {
        datasets: [
          {
            data: Object.values(data.socioeconomicData),
            backgroundColor: ["#4ED6B8", "rgba(255,99,132,1)", "#0000FF"],
            label: "Meal Data Distribution",
          },
        ],
        labels: Object.keys(data.socioeconomicData),
      },
      options: optionsPie,
    };

    pieChart = new Chart(SocialpieChartPie, SocialconfigPie);
  }
}

const form = document.getElementById("search-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const keyword = document.getElementById("keyword").value;

  let location;
  let socioEconomicStatus;

  if (document.getElementById("Urban").checked) {
    location = document.getElementById("Urban").value;
  } else if (document.getElementById("Rural").checked) {
    location = document.getElementById("Rural").value;
  }

  if (document.getElementById("High").checked) {
    socioEconomicStatus = document.getElementById("High").value;
  } else if (document.getElementById("Low").checked) {
    socioEconomicStatus = document.getElementById("Low").value;
  } else if (document.getElementById("Medium").checked) {
    socioEconomicStatus = document.getElementById("Medium").value;
  }

  console.log(socioEconomicStatus);

  fetch(
    `api.php?keyword=${encodeURIComponent(
      keyword
    )}&Location=${encodeURIComponent(
      location
    )}&SocioEconomicStatus=${encodeURIComponent(socioEconomicStatus)}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      drawLineChart(data);
      drawBarChart(data);
      drawPieChart(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

function updateLineChart() {
  if (lineChart) {
    lineChart.options = optionsLine;
    lineChart.update();
  }
}

function updateBarChart() {
  if (barChart) {
    barChart.options = optionsBar;
    barChart.update();
  }
}
