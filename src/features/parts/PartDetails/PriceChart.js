import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const colors = [
  { borderColor: "#eb3b5a", backgroundColor: "#fc5c65" },
  { borderColor: "#fa8231", backgroundColor: "#fd9644" },
  { borderColor: "#f7b731", backgroundColor: "#fed330" },
  { borderColor: "#20bf6b", backgroundColor: "#26de81" },
  { borderColor: "#0fb9b1", backgroundColor: "#2bcbba" },
  { borderColor: "#2d98da", backgroundColor: "#45aaf2" },
  { borderColor: "#3867d6", backgroundColor: "#4b7bec" },
  { borderColor: "#8854d0", backgroundColor: "#a55eea" },
];

const PriceChart = ({ listings }) => {
  const labels = listings.reduce((dates, { priceHistory }) => {
    priceHistory.forEach(({ date }) => {
      if (!dates.includes(date)) {
        dates.push(date);
      }
    });
    return dates;
  }, []);

  const datasets = listings.reduce((datasets, { vendor, priceHistory }, i) => {
    let data = [];

    priceHistory.forEach(({ value, date }) => {
      if (labels.includes(date)) {
        data.push(value);
      }
    });

    const dataset = {
      label: vendor,
      borderColor: colors[i % 8].borderColor,
      backgroundColor: colors[i % 8].backgroundColor,
      data,
    };

    return [...datasets, dataset];
  }, []);

  return <Line data={{ labels, datasets }} />;
};

export default PriceChart;
