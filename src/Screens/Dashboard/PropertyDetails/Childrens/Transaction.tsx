import React from 'react'
import AppButton from '../../../../Components/Button/AppButton'
import { useNavigate } from "react-router-dom";
import { Col, Row, Typography } from 'antd';




const Transaction: React.FC = () => {
    const navigate = useNavigate();
    
    const handleTransaction = () => {
        navigate("/");
    }


    return (
    <div>
        <Row>
        <Col span={24} style={{marginTop:"20px"}}>
          <div title="Payment plans" style={{ height: 300,}}>
          <div style={{display: "flex",
                justifyContent: "center",
                alignItems: "center",}}>
        <AppButton onClick={handleTransaction}>Transactions</AppButton>

          </div>
            
          </div>
        </Col>

        </Row>
    </div>
  )
}

export default Transaction