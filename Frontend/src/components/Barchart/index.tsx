import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

type Props = {};

Chart.register(...registerables);


const BarChart = (props: Props) => {
  return (
    <div className="text-white ]">
      <Line
        data={{
          labels: ["Red", "Blue", "Green", "Purple", "White"],
          datasets: [
            {
              label: "# of vote",
              data: [5, 10, 20, 12, 30],
              backgroundColor: "#fff",
              borderColor: "#4a91e2",
              tension: 0.4,
              pointStyle: "circle",
              pointRadius: 5,
              pointHoverRadius: 10,
            },
            {
              label: "# of vote",
              data: [100, 20, 10, 52, 40],
              backgroundColor: "#fff",
              borderColor: "#e35151",
              tension: 0.4,
              pointStyle: "circle",
              pointRadius: 5,
              pointHoverRadius: 10,
            },
            {
              label: "# of vote",
              data: [-10, 50, 25, 42, 10],
              backgroundColor: "#fff",
              borderColor: "#26be9c",
              tension: 0.4,
              pointStyle: "circle",
              pointRadius: 5,
              pointHoverRadius: 10,
            },
          ],
        }}
        height={500}
        width={500}
        options={{
          maintainAspectRatio: false,
          scales: {
            
          }
        }}
      />
    </div>
  );
};

export default BarChart;
