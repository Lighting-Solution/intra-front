import React from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const SalesChart = () => {
  // Sample data for demonstration
  const chartOptions = {
    series: [
      {
        name: "Product A",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "Product B",
        data: [20, 35, 25, 40, 60, 50, 30, 40],
      },
      {
        name: "Product C",
        data: [10, 15, 20, 25, 30, 35, 40, 45],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        stacked: true,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [2, 2, 2],
      },
      plotOptions: {
        bar: {
          columnWidth: "20%",
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      },
      legend: {
        position: "top",
      },
      fill: {
        opacity: [0.85, 0.75, 0.6],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
    },
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Sales Overview</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Monthly Sales Performance
        </CardSubtitle>
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="area"
          height={350}
        />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
