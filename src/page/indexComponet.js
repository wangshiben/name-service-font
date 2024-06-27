import { Col, Layout, Row, Transfer } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React, { Component } from "react"
import { Link } from "react-router-dom";
import"./fontCss.css"

const FlexDisplay={
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
}

class MainComponet extends Component  {
    
    render() {
        return (
             <Layout style={{
                width:"100%",
                height:"90vh"
             }}>
                <Row style={{
                    width:"100%",
                    height:"100%"
                }}>

                    <Col span={12} style={{
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center"
                    }}>
                    <div className="noto-sans-sc">
                    Z-FS
                    </div>
                    
                    
                    </Col>

                    <Col span={12} >
                    <div style={{height:"50%",width:"100%",...FlexDisplay}}>
                        <Link to="/complex">部署网站</Link>
                    </div>
                    <div style={{height:"50%",width:"100%",...FlexDisplay}}>
                        <Link to="/manageWeb">管理网站</Link>
                    </div>
                    
                    </Col>
                </Row>
             </Layout>
        );
    }
}
export {MainComponet,FlexDisplay}