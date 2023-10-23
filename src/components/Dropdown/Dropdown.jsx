import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

// styles
import "./Dropdown.css";

// components
import Spinner from "../Spinner/Spinner";

const Dropdown = ({ chartData, loading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container">
      <div
        className={isOpen ? "dropdown-header open" : "dropdown-header"}
        onClick={toggleDropdown}
      >
        <div className="dropdown-title">Statistics</div>
        <div className="dropdown-icon">
          {isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
        </div>
      </div>
      <div className={isOpen ? "dropdown-content open" : "dropdown-content"}>
        {loading ? (
          <div className="loading-container">
            <Spinner />
          </div>
        ) : (
          <div className="chart-container">
            <div className="chart">
              <ReactApexChart
                options={{
                  plotOptions: {
                    pie: {
                      customScale: 0.8,
                    },
                  },
                  chart: {
                    type: "donut",
                    chart: {
                      offsetY: 0,
                    },
                    toolbar: {
                      show: true,
                    },
                  },
                  legend: {
                    onItemClick: {
                      toggleDataSeries: true,
                    },
                  },
                  responsive: [
                    {
                      breakpoint: 1437,
                      options: {
                        chart: {
                          offsetY: 0,
                        },
                        height: 150,

                        legend: {
                          position: "bottom",
                        },
                      },
                    },
                  ],
                  labels: Object.keys(chartData.types || {}),
                }}
                series={Object.values(chartData.types || {})}
                type="donut"
              />
            </div>
            <div className="chart">
              <ReactApexChart
                options={{
                  chart: {
                    id: "basic-bar",
                    type: "bar",
                    height: 350,
                    stacked: true,
                    toolbar: {
                      show: true,
                    },
                    zoom: {
                      enabled: false,
                    },
                  },
                  xaxis: {
                    categories: Object.keys(chartData.genders || {}),
                  },
                }}
                series={[
                  {
                    name: "count",
                    data: Object.values(chartData.genders || {}),
                  },
                ]}
                width="100%"
              />
            </div>
            <div className="chart">
              <ReactApexChart
                options={{
                  chart: {
                    id: "basic-bar",
                    type: "bar",
                    height: 350,
                    stacked: true,
                    toolbar: {
                      show: true,
                    },
                    zoom: {
                      enabled: false,
                    },
                  },
                  xaxis: {
                    categories: Object.keys(chartData.statuses || {}),
                  },
                }}
                series={[
                  {
                    name: "count",
                    data: Object.values(chartData.statuses || {}),
                  },
                ]}
                width="100%"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
