import { Card, Col, Row, Typography } from "antd";
import React from "react";

type PaymentPlanProps = {
  paymentPlan: string;
};

const PaymentPlan: React.FC<PaymentPlanProps> = ({ paymentPlan }) => {
  return (
    <div>
      <Row>
        <Col span={24} style={{ marginTop: "20px" }}>
          <div title="Payment plans" style={{ height: 300 }}>
            <p>Full payment</p>
            <p>Financing</p>
            <p>Martgage lender</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentPlan;
