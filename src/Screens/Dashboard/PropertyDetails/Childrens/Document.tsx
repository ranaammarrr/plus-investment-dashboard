import { Col, Row, Typography, Button } from "antd";
import { FilePdfOutlined, DownloadOutlined } from "@ant-design/icons";
import React from "react";

interface DocumentProps {
  docs: any[];
}

const Document: React.FC<DocumentProps> = ({ docs }) => {
  const handleDownload = (fileUrl: any) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop(); // Use the filename from the URL
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {docs.map((doc, index) => (
        <Row key={index} style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
          <Col span={20} style={{ display: "flex", alignItems: "center" }}>
            <FilePdfOutlined
              style={{
                fontSize: "24px",
                color: "#DE2429",
                marginRight: "10px",
              }}
            />
            <Typography.Text>{doc.split("/").pop()}</Typography.Text>
          </Col>
          <Col span={4} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <DownloadOutlined
              onClick={() => handleDownload(doc)}
              style={{
                fontSize: "24px",
              }}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Document;
