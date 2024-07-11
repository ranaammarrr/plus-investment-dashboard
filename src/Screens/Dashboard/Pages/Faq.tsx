import React, { useState } from "react";
import { Collapse, Row, Col } from "antd";
import type { CollapsePanelProps } from "antd/lib/collapse";

const { Panel } = Collapse;

const panelContentStyle = {
  paddingLeft: 24,
  marginBottom: 0,
  fontSize: 16,
  color: "#333", // Darker text color for better readability
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

const generalQuestionsPanels: CollapsePanelProps[] = [
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

const Faq: React.FC = () => {
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
    <>
      <Row gutter={[16, 24]}>
        <Col span={12}>
        <Collapse
            defaultActiveKey={["1"]}
            expandIconPosition="end"
            bordered={false}
            onChange={(keys) => handleCollapseChange(keys, "buying")}
          >
            <h4
              style={{
                color: "#161C2D",
                fontSize: 20,
                marginBottom: 24,
                paddingLeft: "16px",
              }}
            >
              Buying Property
            </h4>
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
        </Col>
        <Col span={12}>
          <Collapse defaultActiveKey={["1"]} bordered={false}>
            <h4
              style={{
                color: "#161C2D",
                fontSize: 20,
                marginBottom: 24,
                paddingLeft: "16px",
              }}
            >
              General Questions
            </h4>
            {generalQuestionsPanels.map((panel) => (
              <Panel
                {...panel}
                header={
                  <div>
                     <span
                      style={{
                        fontWeight: "bold",
                        color: activeGeneralPanels.includes(String(panel.key))
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
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col span={12}>
          <Collapse
            defaultActiveKey={["1"]}
            bordered={false}
            onChange={(keys) => handleCollapseChange(keys, "buying")}
          >
            <h4
              style={{
                color: "#161C2D",
                fontSize: 20,
                marginBottom: 24,
                paddingLeft: "16px",
              }}
            >
              Payments Questions
            </h4>
            {buyingPropertyPanels.map((panel) => (
              <Panel
                {...panel}
                header={
                  <div>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: activeGeneralPanels.includes(String(panel.key))
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
        </Col>
        <Col span={12}>
          <Collapse defaultActiveKey={["1"]} bordered={false} >
            <h4
              style={{
                color: "#161C2D",
                fontSize: 20,
                marginBottom: 24,
                paddingLeft: "16px",
              }}
            >
              Support Questions
            </h4>
            {generalQuestionsPanels.map((panel) => (
              <Panel
                {...panel}
                header={
                  <div>
                     <span
                      style={{
                        fontWeight: "bold",
                        color: activeGeneralPanels.includes(String(panel.key))
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
        </Col>
      </Row>
    </>
  );
};

export default Faq;
