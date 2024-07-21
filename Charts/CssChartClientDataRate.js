export const ChartCss = {
  root: {
    // minWidth: 100,
    minHeight: 280,
    boxShadow: "0px 0px 2px 0px",
     borderRadius:"25px"
   
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  chartLoader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  },
  cardContent: {
    padding: 0,
  },

  chartClasses: {
    display: "flex",
    justifyContent: "center",
    placeItems: "center",
    alignItems: "center",
    borderRadius: "10px",
    height: "235px",
    width: "80%",
    boxShadow: "0px 1px 2px #333",
    borderRadius:"25px",
    // backgroundColor: "#3de068",
    backgroundColor: "#fff",
    padding: "5px 2px",
    position: "absolute",
    marginLeft: "21px",
    bottom: "85px",
    zIndex: 1,
    color: "#fff",
  },
  inside:{
    position:"absolute",
    bottom:0
  },
  chartItem:{
    marginBottom:"165px"
  }
};

export const chartOption = {
  responsive: true,
  borderRadius: 5,
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    y: {
      display: true,
      grid: {
        display: false,
        drawBorder: false,
      },
      // beginAtZero: true,
      // grid: {
      //   display: false,
      //   drawBorder: false,
      // },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Sprint Velocity",
      padding: {
        bottom: 20,
      },
      weight: "bold",
      color: "#00325c",
      font: {
        size: 13,
      },
      align: "center",
    },
    borderRadius: "2",
    datalabels: {
      display: true,
      color: "white",
      align: "bottom",
      padding: {
        right: 0,
      },
      labels: {
        padding: { top: 1 },
        title: {
          font: {
            weight: "bold",
            size: 24,
          },
        },
      },
    },
  },
};
