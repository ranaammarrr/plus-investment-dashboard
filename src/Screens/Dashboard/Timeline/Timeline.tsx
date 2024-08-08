import React, { useEffect, useState } from "react";
import { Avatar, Space, Switch, Typography } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import InputField from "../../../Components/InputFeild/InputFeild";
import AppTable, { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import {
  getAllTimeline,
  isVisibleTimeline,
} from "../../../Redux/Timeline/timelineAction";
import { formattedDate, truncateText } from "../../../Utils/helperFunctions";
import { useNavigate } from "react-router-dom";
import FilterOption from "../../../Components/FilterOption/FilterOption";

const Timeline: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { timelines } = useAppSelector((state) => state.timeline);
  const [selectedTimelines, setSelectedTimelines] = useState<
    string | undefined
  >(undefined);

  const handleCategoryChange = (value: string) => {
    setSelectedTimelines(value);
  };

  useEffect(() => {
    dispatch(getAllTimeline());
  }, [dispatch]);

  let uniqueCategories = Array.from(
    new Set(timelines.map((timeline) => timeline.category))
  );
  let filters = uniqueCategories.map((timeline) => ({ type: timeline }));

  filters.unshift({ type: "All" });

  const filteredTimelines = timelines.filter((timeline) => {
    if (selectedTimelines && selectedTimelines !== "All") {
      return timeline.category === selectedTimelines;
    }
    return true;
  });

  const columns = [
    {
      title: "Posted by",
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: (a: DataType, b: DataType) => {
        const createdAtA = a.createdAt || "";
        const createdAtB = b.createdAt || "";
        return createdAtA.localeCompare(createdAtB);
      },
      render: (name: string, record: DataType) => {
        const handleNavigateToTimlineFeed = (timelineId: string) => {
          navigate("/feeds", { state: { timelineId } });
        };
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleNavigateToTimlineFeed(record.id)}
          >
            <Avatar
              style={{ marginRight: "12px" }}
              size="large"
              icon={<UserOutlined />}
            />
            <span>{name}</span>
          </div>
        );
      },
    },

    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: "15%",
      render: (content: string) => (
        <Typography.Paragraph
          ellipsis={{ rows: 1, expandable: true, symbol: "more" }}
        >
          {content}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Likes",
      dataIndex: "like",
      key: "like",
      width: "5%",
      render: (like: any, record: DataType) => {
        return (
          <Space size="middle">
            {" "}
            <Typography.Text style={{}}>{record?.like}</Typography.Text>{" "}
          </Space>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "10%",
      sorter: (a: DataType, b: DataType) =>
        a.category.localeCompare(b.category),
    },
    {
      title: "Published",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
      sorter: (a: DataType, b: DataType) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Last Modified",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "20%",
      sorter: (a: DataType, b: DataType) =>
        a.updatedAt.localeCompare(b.updatedAt),
    },
    {
      title: "Action",
      key: "action",
      width: "5%",
      render: (_: any, record: DataType) => {
        const onChange = async (checked: any) => {
          try {
            await dispatch(isVisibleTimeline({ _id: record.id }));
          } catch (error) {
            console.error("Error updating user:", error);
          }
        };

        return (
          <Space size="middle">
            <Switch
              defaultChecked={record.action}
              onChange={onChange}
              style={{ fontSize: 22, marginLeft: 6 }}
            />
          </Space>
        );
      },
    },
  ];

  const sortedTimeline = [...filteredTimelines].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const data =
    searchValue !== ""
      ? sortedTimeline
          .filter((timeline: { name: string }) =>
            timeline.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((timeline) => ({
            id: timeline?._id,
            name: timeline?.userData?.name,
            content: truncateText(timeline?.content),
            action: timeline.isVisible,
            like:
              timeline.likedbyUsers?.length < 1
                ? 0
                : timeline.likedbyUsers?.length,
            createdAt: formattedDate(timeline?.createdAt),
            updatedAt: formattedDate(timeline?.updatedAt),
            category: timeline.category,
            image: timeline.image,
          }))
      : sortedTimeline.map((timeline) => ({
          id: timeline?._id,
          name: timeline?.userData?.name,
          content: truncateText(timeline?.content),
          like:
            timeline.likedbyUsers?.length < 1
              ? 0
              : timeline.likedbyUsers?.length,
          createdAt: formattedDate(timeline?.createdAt),
          updatedAt: formattedDate(timeline?.updatedAt),
          category: timeline.category,
          action: timeline.isVisible,
          image: timeline.image,
        }));

  const handleChange = (val: string) => {
    setSearchValue(val);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <InputField
          value={searchValue}
          onChangeText={(val) => handleChange(val)}
          placeholder={"Search post"}
          size="large"
          inpuStyles={{ width: "90%" }}
          suffix={<SearchOutlined />}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <FilterOption
            options={filters}
            onChangeFilter={handleCategoryChange}
            selectedCategory={selectedTimelines}
          />
        </div>
      </div>
      <AppTable
        dataSource={data}
        columns={columns}
        onChange={(pagination: any, filtered: any, sorter: any) => {}}
        pagination={{ defaultPageSize: 8 }}
      />
    </>
  );
};

export default Timeline;
