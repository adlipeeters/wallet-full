import React, { useState, useEffect } from "react";
import "./summary-box.scss";
import Box from "../box/Box";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { colors, images } from "../../constants";
import { Line } from "react-chartjs-2";
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

import { Player } from "@lottiefiles/react-lottie-player";
import {
  format,
  isAfter,
  lastDayOfMonth,
  parseISO,
  isBefore,
  isEqual,
  isSameDay,
} from "date-fns";
import styles from "../../scss/Custom.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SummaryBox = ({ item }) => {
  return (
    <Box>
      <div className="summary-box">
        <div className="summary-box__info">
          <div className="summary-box__info__title">
            <div>{item.title}</div>
            <span>{item.subtitle}</span>
          </div>
          <div className="summary-box__info__value">{item.value}</div>
        </div>
        <div className="summary-box__chart">
          <CircularProgressbarWithChildren
            value={item.percent}
            strokeWidth={10}
            styles={buildStyles({
              pathColor: item.percent < 50 ? colors.red : colors.purple,
              trailColor: "transparent",
              strokeLinecap: "round",
            })}
          >
            <div className="summary-box__chart__value">{item.percent}%</div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </Box>
  );
};

export default SummaryBox;

export const SummaryBoxSpecial = ({ item, data }) => {
  const [revenue, setRevenue] = useState(0);

  const today = new Date();
  const firstDateOfMonth = format(today, "yyyy-MM-01");
  const lastDateOfMonth = format(lastDayOfMonth(today), "yyyy-MM-dd");

  const calcRevenue = (data) => {
    let total = 0;
    console.log(data);
    data.forEach((transaction) => {
      let date = format(parseISO(transaction?.createdAt), "yyyy-MM-dd");
      if (transaction.type === "income") {
        if (
          (isAfter(new Date(date), new Date(firstDateOfMonth)) ||
            isEqual(new Date(date), new Date(firstDateOfMonth))) &&
          (isAfter(new Date(lastDateOfMonth), new Date(date)) ||
            isEqual(new Date(lastDateOfMonth), new Date(date)))
        ) {
          total += transaction.amount;
        }
      }
    });
    console.log(total);
    return total;
  };

  // console.log(firstDateOfMonth)
  // console.log(lastDateOfMonth)

  useEffect(() => {
    if (data) {
      setRevenue(calcRevenue(data));
    }
  }, [data]);

  let x = true;

  return (
    <Box custom centered fullheight relative test={true}>
      {x ? (
        <div className="summary-box-special">
          <div className="summary-box-special__title">{item.title}</div>
          <div className={`summary-box-special__value ${styles.fadeAnimation}`}>
            {revenue}
          </div>
          <Player src={images.income_dashboard_lottie} loop autoplay />
        </div>
      ) : (
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"100%"}
          sx={{
            position: "absolute",
            borderRadius: "30px",
            backgroundColor: "gray",
          }}
        />
      )}
    </Box>
  );
};
