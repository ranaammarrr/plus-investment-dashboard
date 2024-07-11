import { Card, Col, Row, Typography } from 'antd'
import React from 'react'

type DescriptionProps = {
  details: string;
};

const Description: React.FC<DescriptionProps> = ({details}) => {
  return (
    <div>
        <Row >
        <Col style={{ marginTop: "20px" }} span={24}>
          <div title="Description" style={{ height: 300 }}>
            <p>{details}</p>
          </div>
        </Col>
        </Row>
    </div>
  )
}

export default Description