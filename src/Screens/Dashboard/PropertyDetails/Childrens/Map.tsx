import {Col, Row, Typography } from 'antd'
import React from 'react'

const Map: React.FC = () => {
    const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019990623571!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858153c5dcd851%3A0x18bd205ec4f8f5cd!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1614234097644!5m2!1sen!2sus";
  return (
    <div>
        <Row>

<Col span={24} style={{ marginTop: "20px" }}>
  <div title="Map" style={{ height: 300 }}>
  <iframe
  src={mapUrl}
  width="100%"
  height="80%"
  style={{ border: 0, marginTop: "15px" }}
  //   allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
  </div>
</Col>
</Row>
    </div>
  )
}

export default Map