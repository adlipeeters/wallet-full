import React from "react";
import { Bar } from "react-chartjs-2";
import Box from "../components/box/Box";
import DashboardWrapper, {
  DashboardWrapperMain,
  DashboardWrapperRight,
} from "../components/dashboard-wrapper/DashboardWrapper";
import SummaryBox, {
  SummaryBoxSpecial,
} from "../components/summary-box/SummaryBox";
import { colors, data } from "../constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import OverallList from "../components/overall-list/OverallList";
import RevenueList from "../components/revenue-list/RevenueList";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice.js";
import { useGetTransactionsQuery } from "../features/transaction/transactionApiSlice";
import IncomeExpense from "../components/charts/IncomeExpense";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const user = useSelector(selectCurrentUser);

  const {
    data: transaction_data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTransactionsQuery();

  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <div className="row">
          <div className="col-4 col-md-6 col-sm-12">
            <SummaryBoxSpecial
              item={data.revenueSummary}
              data={isSuccess ? transaction_data : null}
            />
          </div>
          <div className="col-8 col-md-12">
            <div className="row">
              {data.summary.map((item, index) => (
                <div
                  key={`summary-${index}`}
                  className="col-6 col-md-6 col-sm-12 mb"
                >
                  <SummaryBox item={item} />
                </div>
              ))}
            </div>
          </div>
          {/* <div className="col-4 hide-md"> */}
        </div>
        <div className="row">
          <div className="col-12">
            <Box>
              <RevenueByMonthsChart />
              {/* <IncomeExpense data={transaction_data} /> */}
            </Box>
          </div>
        </div>
      </DashboardWrapperMain>
      <DashboardWrapperRight>
        <div className="title mb">
          Subscription:{" "}
          <span style={{ color: "#2575fc" }}>
            {user.subscription ? user.subscription.name.toUpperCase() : "FREE"}
          </span>
        </div>
        <div className="mb">
          <OverallList />
        </div>
        <div className="title mb">Revenue by channel</div>
        <div className="mb">
          <RevenueList />
        </div>
      </DashboardWrapperRight>
    </DashboardWrapper>
  );
};

export default Dashboard;

const RevenueByMonthsChart = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      yAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      // bar: {
      //     backgroundColor: '#2575fc',
      //     borderRadius: 20,
      //     borderSkipped: 'bottom'
      // },
      // bar: {
      //     backgroundColor: '#2575fc',
      //     borderRadius: 20,
      //     borderSkipped: 'bottom'
      // },
    },
  };

  const chartData = {
    labels: data.revenueByMonths.labels,
    datasets: [
      {
        label: "Revenue",
        data: data.revenueByMonths.data,
        backgroundColor: "#8bc6ec",
        borderRadius: 20,
        borderSkipped: "bottom",
      },
      {
        label: "Revenue",
        data: data.revenueByMonths.data,
        backgroundColor: "#9599e2",
        borderRadius: 20,
        borderSkipped: "bottom",
      },
    ],
  };
  return (
    <>
      <div className="title mb">Revenue by months</div>
      <div>
        <Bar options={chartOptions} data={chartData} height={`300px`} />
      </div>
    </>
  );
};
