import React, { useState } from "react";
import { Card, Collapse } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import AppButton from "../../../Components/Button/AppButton";
import type { CollapsePanelProps } from "antd/lib/collapse";

const { Panel } = Collapse;

const panelContentStyle = {
  paddingLeft: 24,
  marginBottom: 0,
  fontSize: 16,
  color: "#9BA9CB", // Darker text color for better readability
};

const panelHeaderStyle = {
  borderBottom: "1px solid black", // Add a border to the bottom of the header
};

const buyingPropertyPanels: CollapsePanelProps[] = [
  {
    key: "1",
    header: "How does it work?",
    children: (
      <p style={panelContentStyle}>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form.
      </p>
    ),
  },
  {
    key: "2",
    header: "Do I need a designer to use Hously?",
    children: (
      <p style={panelContentStyle}>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form.
      </p>
    ),
  },
  {
    key: "3",
    header: "What do I need to do to start selling ?",
    children: (
      <p style={panelContentStyle}>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form.
      </p>
    ),
  },
  {
    key: "4",
    header: "What happens when I receive an order ?",
    children: (
      <p style={panelContentStyle}>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form.
      </p>
    ),
  },
];

const TermsAndConditions: React.FC = () => {
  const [activeBuyingPanels, setActiveBuyingPanels] = useState<string[]>([]);
  const [activeGeneralPanels, setActiveGeneralPanels] = useState<string[]>([]);

  const handleCollapseChange = (keys: string | string[], type: string) => {
    if (type === "buying") {
      setActiveBuyingPanels(Array.isArray(keys) ? keys : [keys]);
    } else if (type === "general") {
      setActiveGeneralPanels(Array.isArray(keys) ? keys : [keys]);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: 700 }}>
        <h3>Introduction :</h3>
        <p style={{ fontSize: "16px", color: "#9BA9BC" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. <br /> Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. <br /> Excepteur sint occaecat cupidatat non proident, sunt
          in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h3>User Agreements :</h3>
        <p style={{ fontSize: "16px", color: "#9BA9BC" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. <br /> Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. <br /> Excepteur sint occaecat cupidatat non proident, sunt
          in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h3>Restrictions : :</h3>
        <p style={{ fontSize: "16px", color: "#9BA9BC", lineHeight: 2.5 }}>
          You are specifically restricted from all of the following : <br />
          <ArrowRightOutlined style={{ color: "#1890ff" }} /> Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. <br />
          <ArrowRightOutlined style={{ color: "#1890ff" }} /> Ut enim ad minim
          veniam, quis nostrud exercitation. <br />
          <ArrowRightOutlined style={{ color: "#1890ff" }} /> Excepteur sint
          occaecat cupidatat non proident
          <br />
          <ArrowRightOutlined style={{ color: "#1890ff" }} /> Excepteur sint
          occaecat cupidatat non proident <br />
          <ArrowRightOutlined style={{ color: "#1890ff" }} /> Ut enim ad minim
          veniam, quis nostrud exercitation. <br />
        </p>
        <h3>Users Question & Answer :</h3>

        <Collapse
          defaultActiveKey={["1"]}
          expandIconPosition="end"
          bordered={false}
          onChange={(keys) => handleCollapseChange(keys, "buying")}
        >
          {buyingPropertyPanels.map((panel) => (
            <Panel
              {...panel}
              header={
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: activeBuyingPanels.includes(String(panel.key))
                        ? "#33A34A"
                        : "#333",
                    }}
                  >
                    {" "}
                    {panel.header}:
                  </span>
                </div>
              }
            />
          ))}
        </Collapse>

        <AppButton style={{ padding: "4px 20px" }}>Accept</AppButton>
      </Card>
    </div>
  );
};

export default TermsAndConditions;
