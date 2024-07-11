import React from 'react';
import { Card } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import AppButton from '../../../Components/Button/AppButton';

const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card style={{ width: 700 }}>
        <h3>Overview</h3>
        <p style={{fontSize:"16px", color:"#9BA9BC"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br /> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <br /> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <h3>We use your information to :</h3>
        <p style={{fontSize:"16px", color:"#9BA9BC", lineHeight:2.5}}>
          <ArrowRightOutlined style={{color:"#1890ff"}}/> Lorem ipsum dolor sit amet, consectetur adipiscing elit.  <br />
          <ArrowRightOutlined style={{color:"#1890ff"}}/> Ut enim ad minim veniam, quis nostrud exercitation. <br />
          <ArrowRightOutlined style={{color:"#1890ff"}}/> Excepteur sint occaecat cupidatat non proident
          <br />
          <ArrowRightOutlined style={{color:"#1890ff"}}/> Excepteur sint occaecat cupidatat non proident
        </p>
        <h3>Information Provided Voluntarily :</h3>
        <p style={{fontSize:"16px", color:"#9BA9BC"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br /> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <br /> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        
        <AppButton style={{padding:"4px 20px"}}>
          Print
        </AppButton>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
