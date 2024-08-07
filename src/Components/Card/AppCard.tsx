import React from "react";
import { Card } from "antd";
export interface CardProps {
  title:  React.ReactNode;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  gradient?: string;
  content: React.ReactNode;
  style?: React.CSSProperties;
  headStyle?: React.CSSProperties;
}
const AppCard: React.FC<CardProps> = ({
  title,
  icon,
  extra,
  gradient,
  content,
  style,
  headStyle,
}) => {
  return (
    <Card
      title={null}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: "1rem",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        background: gradient,
        width: "100%",
        ...style,
      }}
      headStyle={{ ...headStyle, borderBottom: 0 }}
    >
      {icon && (
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
      )}
      {content && (
        <div
          style={{
            marginBottom: 20,
            fontSize: "1.6em",
            fontWeight: "bold",
            textAlign: "center",
            color: "#333",
          }}
        >
          {content}
        </div>
      )}
      {title && (
        <div
          style={{
            marginTop: 20,
            fontSize: "1em",
            color: gradient,
            textAlign: "center",
          }}
        >
          {title}
        </div>
      )}
    </Card>
  );
};
export default AppCard;
