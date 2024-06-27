import { render } from "@testing-library/react"
import { Col, Flex, Row } from "antd"
import Layout, { Content, Header } from "antd/es/layout/layout"
import React, { Component } from "react"
import{Router,Route, Link, Routes, Outlet}from"react-router-dom"
import { MainComponet } from "./indexComponet"
import { ComplexWeb } from "./CompexWeb"
import { ManageWeb } from "./ManageWeb"

const HeaderStyle={
    display:'Flex',
    backgroundColor:'white',
    height:'10vh'
}
const BodyStyle={
    height:'90vh'
}

class MainPage extends Component{


    render(){
        return (
            <Layout>
            <Header style={HeaderStyle}>
                <Row style={{width:'100%'}}>
                    <Col offset={9} span={2}><Link to="/complex"><div style={{height:'100%'}}>部署网站</div></Link></Col>
                    <Col offset={3} span={2}><Link to="/manageWeb"><div style={{height:'100%'}}>管理网站</div></Link></Col>
                </Row>
            </Header>
            <Content style={BodyStyle}>
            <Routes>
                <Route path="/" element={<MainComponet/>}></Route>
                <Route path="/complex" element={<ComplexWeb/>}></Route>
                <Route path="/manageWeb" element={<ManageWeb/>}></Route>
                </Routes>
            </Content>
        
                
            
               
        </Layout>
        
        )
    }
}




export {MainPage as Index}