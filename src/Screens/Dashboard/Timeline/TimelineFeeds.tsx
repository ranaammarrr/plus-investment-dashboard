import {
  Avatar,
  Card,
  Carousel,
  Col,
  Divider,
  Row,
  Space,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import { getTimelineById } from "../../../Redux/Timeline/timelineAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { carousal2, carousal4, property } from "../../../Assets/assets";
import { formattedDate } from "../../../Utils/helperFunctions";
import { getAllUsers } from "../../../Redux/User/userAction";

const { Meta } = Card;

const TimelineFeeds: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { timeLineById } = useAppSelector((state) => state.timeline);
  const { users } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getTimelineById(location.state.timelineId));
  }, [location]);

  const userData =
    timeLineById &&
    users &&
    users.find((user) => user._id === timeLineById.user);

  const likedUsers =
    timeLineById &&
    timeLineById.likedbyUsers.map((id: any) =>
      users.find((user) => id === user._id)
    );
  const handleBack = () => {
    navigate("/timeline");
  };
  const timelineByIdData: any =
    timeLineById !== null &&
    timeLineById.comments.length > 0 &&
    timeLineById?.comments.map((item: any) => ({
      user: item.user,
      text: item.text,
    }));
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: "10px",
        }}
        onClick={handleBack}
      >
        <ArrowLeftOutlined
          style={{ fontSize: "24px", marginRight: "5px" }}
          onClick={handleBack}
        />
        Go Back
      </div>
      <Row>
        <Col span={16}>
          {/* <Row> */}
          <Typography.Title level={5}>Posts</Typography.Title>

          <div>
            <Card
              style={{ height: "350px", width: "700px" }}
              bodyStyle={{ padding: "5px" }}
            >
              {/* Carousal Start...  */}
              <Carousel autoplay style={{ marginTop: "20px" }}>
                <div>
                  {timeLineById?.image.length > 0 ? (
                    <img
                      src={timeLineById.image}
                      alt="Image"
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      No image is uploaded
                    </div>
                  )}
                </div>
              </Carousel>

              <Typography.Paragraph
                //   level={5}
                style={{ textAlign: "left", margin: "10px" }}
              >
                {timeLineById?.content}
              </Typography.Paragraph>
            </Card>
          </div>
          <div>
            <Typography.Title level={5}>Posted by:</Typography.Title>
            <Card
              style={{ width: 250, marginTop: 16 }}
              bodyStyle={{ padding: "5px" }}
            >
              <Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                }
                title={
                  <Link
                    to={`/insights`}
                    state={{
                      currentUserId: timeLineById && timeLineById?.user,
                    }}
                  >
                    {(userData && userData.name) || "Name"}
                  </Link>
                }
                description={formattedDate(timeLineById?.createdAt)}
              />
            </Card>
          </div>
          {/* </Row> */}
          <Row style={{ marginTop: "10px" }}>
            <Col span={12}>
              <Space direction="vertical" size={16}>
                <Card
                  title="Insights"
                  extra={<a href="">See all</a>}
                  style={{ width: 340, height: 300 }}
                  bodyStyle={{ padding: "5px" }}
                  headStyle={{ padding: "5px" }}
                >
                  <p>No Data</p>
                </Card>
              </Space>
            </Col>
            <Col span={12} style={{}}>
              {/* <div style={{display: "flex", justifyContent:"end"}}> */}
              <Space direction="vertical" size={16}>
                <Card
                  title="New likes"
                  extra={
                    <a href="">{timeLineById?.likedbyUsers.length || "0"}</a>
                  }
                  style={{ width: 340, height: 300, overflowY: "scroll" }}
                  bodyStyle={{ padding: "5px" }}
                  headStyle={{ padding: "5px" }}
                >
                  {likedUsers &&
                    likedUsers.map((user: any) => (
                      <>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <Avatar
                              style={{ marginTop: "15px" }}
                              size="large"
                              icon={<UserOutlined />}
                              srcSet={timeLineById && timeLineById.image}
                            />
                          </div>
                          <div>
                            <Typography.Title
                              style={{ marginLeft: "14px" }}
                              level={5}
                            >
                              {user.name}
                            </Typography.Title>
                          </div>
                        </div>
                      </>
                    ))}
                </Card>
              </Space>
              {/* </div> */}
            </Col>
          </Row>
        </Col>

        {/* Column two Start Here...  */}
        <Col span={8}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Typography.Title level={5}>Comments</Typography.Title>
            </div>
            <div>
              <Typography.Title level={5} style={{ color: "#8BC9FF" }}>
                {timelineByIdData.length || "0"}
              </Typography.Title>
            </div>
          </div>
          <Card
            style={{ border: "1px solid #F0F0F0", height: "450px" }}
            bodyStyle={{ padding: "5px", margin: "0px" }}
            headStyle={{ padding: "5px" }}
          >
            <div>
              <Typography.Title
                level={5}
                style={{ textAlign: "center", color: "grey", fontSize: "14px" }}
              >
                All comments
              </Typography.Title>
              <div
                style={{
                  display: "flex",
                  marginLeft: "20px",
                  flexDirection: "column",
                }}
              >
                {timelineByIdData ? (
                  timelineByIdData.map((comments: any) => (
                    <>
                      <Typography.Paragraph>
                        {comments.text}
                      </Typography.Paragraph>
                      <Divider style={{ margin: "14px 0px" }} />
                    </>
                  ))
                ) : (
                  <Typography.Paragraph>No comments</Typography.Paragraph>
                )}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TimelineFeeds;
