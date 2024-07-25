import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Bar, Bubble, Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import { getAllUsers } from "../../../Redux/User/userAction";
import {
  formattedDate,
  formattedDateGraph,
  getMonthYear,
  getWeekYear,
} from "../../../Utils/helperFunctions";
import { useLocation } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  ChartTitle,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    filler: {
      propagate: true,
    },
  },
};

const { Title, Text } = Typography;

const TimelineInsights: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { currentUserId } = location.state;
  const { users, isLoading } = useAppSelector((state) => state.user);
  const currentUser = users.find((user) => user._id === currentUserId);
  const personalInformation = currentUser;
  const followers = currentUser?.followers ?? [];

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // personalInformation.forEach((obj: any) => {
  //   const monthYear = (obj.createdAt);
  // });

  // Initialize counts for all 12 months
  const monthCounts: any = {};
  for (let month = 1; month <= 12; month++) {
    const monthYear = `2024-${month.toString().padStart(2, "0")}`;
    monthCounts[monthYear] = 0;
  }

  followers.forEach((obj: any) => {
    const monthYear = getMonthYear(obj.createdAt);
    monthCounts[monthYear]++;
  });

  const followersData = Object.keys(monthCounts).map(
    (key: any) => monthCounts[key]
  );

  // Initialize weeks for the year 2024
  const weekCounts: any = {};
  for (let week = 1; week <= 52; week++) {
    const weekYear = `W${week.toString().padStart(2, "0")}`;
    weekCounts[weekYear] = 0;
  }

  followers.forEach((obj: any) => {
    const weekYear = getWeekYear(obj.createdAt);
    weekCounts[weekYear]++;
  });

  const newFollowersData = Object.keys(weekCounts).map(
    (key: any) => weekCounts[key]
  );

  const Followers = followersData.reduce((acc, val) => acc + val, 0);
  const calculatePercentage = (value: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const followersPercentage = calculatePercentage(Followers, 50);

  const months = Object.keys(monthCounts);
  const weaksForNewFollowers = Object.keys(weekCounts);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Followers",
        data: followersData,
        backgroundColor: "#B18CFD",
        borderColor: "#57D797",
        fill: false,
        // tension: 0.4,
      },
    ],
  };

  const totalFollowers = {
    labels: months,
    datasets: [
      {
        label: "Total Followers",
        data: followersData,
        backgroundColor: "#B18CFD",
        borderColor: "#57D797",
        fill: true,
        // tension: 0.4,
      },
    ],
  };

  const data2 = {
    labels: months,
    //  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',],
    datasets: [
      {
        label: "Data",
        data: [12, 97, 76, 7, 4, 84, 90],
        backgroundColor: "#B18CFD",
        borderColor: "#57D797",
        fill: true,
        // tension: 0.4,
      },
    ],
  };
  const data3 = {
    labels: weaksForNewFollowers,
    datasets: [
      {
        label: "New Followers",
        data: newFollowersData,
        backgroundColor: "#B18CFD",
        borderColor: "#57D797",
        fill: true,
        // tension: 0.4,
      },
    ],
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#E9EAEC",
          height: "8%",
          border: "1px",
          borderRadius: "15px",
        }}
      >
        <Row>
          <Col span={8}>
            <div style={{ width: "100%", marginTop: 16, paddingLeft: "15px" }}>
              <Title level={5} style={{ color: "black", margin: 2 }}>
                Name:
                {personalInformation?.name}
              </Title>
              <Text style={{ marginRight: 8, margin: 2 }}>
                Email:
                {personalInformation?.email}
              </Text>
            </div>
          </Col>

          <Col span={8}>
            <div style={{ width: "100%", marginTop: 16, paddingLeft: "15px" }}>
              <Title level={5} style={{ color: "black", margin: 2 }}>
                City:
                {personalInformation?.personalInformation.city}
              </Title>
              <Text style={{ marginRight: 8, margin: 2 }}>
                State:
                {personalInformation?.personalInformation.state}
              </Text>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ width: "100%", marginTop: 16, paddingLeft: "15px" }}>
              <Title level={5} style={{ color: "black", margin: 2 }}>
                Company:
                {personalInformation?.company}
              </Title>
              <Text style={{ marginRight: 8, margin: 2 }}>
                Role:
                {personalInformation?.role}
              </Text>
            </div>
          </Col>
        </Row>
      </div>

      <Card
        style={{ width: "100%", marginTop: 16 }}
        bodyStyle={{ padding: "20px" }}
      >
        <Row
          gutter={[16, 16]}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Col span={12}>
            <Title level={5} style={{ color: "grey", margin: 2 }}>
              Followers
            </Title>
            <div style={{ display: "flex", alignItems: "center", margin: 2 }}>
              <Text style={{ marginRight: 8, margin: 2 }}>{Followers}</Text>
              <Text
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#57D797",
                }}
              >
                <ArrowUpOutlined
                  style={{ marginLeft: 4, transform: "rotate(45deg)" }}
                />
                {followersPercentage}%
              </Text>
            </div>
          </Col>
          {/* <Col span={8}>
            <Title level={5} style={{ color: "grey", margin: 2 }}>
              Engagements
            </Title>
            <div style={{ display: "flex", alignItems: "center", margin: 2 }}>
              <Text style={{ marginRight: 8 }}>12,579</Text>
              <Text
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#57D797",
                }}
              >
                <ArrowUpOutlined
                  style={{ marginLeft: 4, transform: "rotate(45deg)" }}
                />
                87%
              </Text>
            </div>
          </Col> */}
          <Col span={12}>
            <Title level={5} style={{ color: "grey", margin: 2 }}>
              New Followers
            </Title>
            <div style={{ display: "flex", alignItems: "center", margin: 2 }}>
              <Text style={{ marginRight: 8 }}>{Followers}</Text>
              <Text
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#57D797",
                }}
              >
                <ArrowUpOutlined
                  style={{ marginLeft: 4, transform: "rotate(45deg)" }}
                />
                {followersPercentage}%
              </Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Row for Graphs...  */}
      <Card
        style={{ width: "100%", marginTop: 16 }}
        bodyStyle={{ padding: "20px" }}
      >
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col span={12}>
            <div style={{ height: "230px" }}>
              <Line data={data} options={options} />
            </div>
            <Title level={5} style={{ color: "grey" }}>
              Followers Growth
            </Title>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ marginRight: 8 }}>{Followers}</Text>
              <Text
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#57D797",
                }}
              >
                <ArrowUpOutlined
                  style={{ marginLeft: 4, transform: "rotate(45deg)" }}
                />
                {followersPercentage}%
              </Text>
            </div>
          </Col>
          {/* <Col span={8}>
            <div style={{ height: "230px" }}>
              <Line data={data2} options={options} />
            </div>
            <Title level={5} style={{ color: "grey" }}>
              Engagements Growth
            </Title>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ marginRight: 8 }}>2,895</Text>
              <Text
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#57D797",
                  margin: 0,
                }}
              >
                <ArrowUpOutlined
                  style={{ marginLeft: 4, transform: "rotate(45deg)" }}
                />
                87%
              </Text>
            </div>
          </Col> */}
          <Col span={12}>
            <div style={{ height: "230px" }}>
              <Bar data={data3} options={options} />
            </div>
            <Title level={5} style={{ color: "grey" }}>
              New Followers Growth
            </Title>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ marginRight: 8 }}>{Followers}</Text>
              <Text
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#57D797",
                }}
              >
                <ArrowUpOutlined
                  style={{ marginLeft: 4, transform: "rotate(45deg)" }}
                />
                {followersPercentage}%
              </Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Row for Total Followers Chart */}
      <Card
        style={{ width: "100%", marginTop: 16 }}
        bodyStyle={{ padding: "20px" }}
      >
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col span={24}>
            <Title level={5} style={{ color: "grey", margin: 0 }}>
              Total Followers
            </Title>
            <div style={{ height: "300px" }}>
              <Line data={totalFollowers} options={options} />
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default TimelineInsights;
