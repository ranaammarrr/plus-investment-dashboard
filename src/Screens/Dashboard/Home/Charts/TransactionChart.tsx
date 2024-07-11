import React, { useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, Col, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/reduxHook";
import { getAllInvoices } from "../../../../Redux/Transaction/TransactionAction";
import { getAllProperties } from "../../../../Redux/PropertyListing/propertyActions";
import { formattedDate, getMonthYear  } from "../../../../Utils/helperFunctions";

// Register required components with ChartJS
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionLineChart = () => {
  const { properties } = useAppSelector((state) => state.property);
  const { transaction } = useAppSelector((state) => state.transaction);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);






// For Propertiesss... 

// Initialize counts for all 12 months
const monthCounts: any = {};
for (let month = 1; month <= 12; month++) {
  const monthYear = `2024-${month.toString().padStart(2, '0')}`; 
  monthCounts[monthYear] = 0;
}

 properties.forEach((obj:any) => {
    const monthYear = getMonthYear(obj.createdAt);
    monthCounts[monthYear]++;
  });


  
// For Transactions ... 
const initializeMonthCounts = (year:any) => {
  const monthCounts:any = {};
  for (let month = 1; month <= 12; month++) {
    const monthYear = `${year}-${month.toString().padStart(2, '0')}`;
    monthCounts[monthYear] = 0;
  }
  return monthCounts;
};

const transactionMonthCounts = initializeMonthCounts(2024);

  transaction.forEach((obj:any) => {
  const monthYear = getMonthYear(obj.createdAt);
  transactionMonthCounts[monthYear]++;
});



const transactionData = Object.keys(transactionMonthCounts).map((key) => transactionMonthCounts[key]);
const monthsss = Object.keys(transactionMonthCounts);
  const propertyData = properties ?  Object.keys(monthCounts).map((key: any) => (monthCounts[key])) : [];

  const months = properties ?  Object.keys(monthCounts).map((key: any) => (key)) : [];
  const propertyChartValues = propertyData;
  const transactionChartValues = transactionData;


  const newDate:any = Date.now()
// transaction LineChart Data.. 
  const transactionLineChartData = {
    labels: monthsss,
    datasets: [
      {
        label: `Invoice created till ${ formattedDate(newDate)}`,
        data: transactionChartValues,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };
// bar Chart Data ...  
  const propertyBarChartData = {
    labels: months,
    datasets: [
      {
        label: "Total Properties Added",
        data: propertyChartValues,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

 
  // bar Chart Options .... 

  const barChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Properties Added",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  // LineChart Options... 
  const lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Invoices",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card
      style={{
        marginTop: "20px",
        backgroundColor: "#F9FAFB",
        // height: "300px",
        width: "100%",
        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Bar data={propertyBarChartData} options={barChartOptions} />
        </Col>
        <Col span={12}>
        <div style={{height:"300px"}}>
          <Line data={transactionLineChartData} options={lineChartOptions} />

        </div>
        </Col>
      </Row>
    </Card>
  );
};

export default TransactionLineChart;
