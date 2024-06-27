import { Col, Form, Layout, Row,Upload, message  } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { Component,useEffect,useState } from "react";
import { UploadOutlined } from '@ant-design/icons';

import { FlexDisplay } from "./indexComponet";
import { Button } from "antd/es/radio";
import { getErc20Balance } from "../util/erc20Util";
import { toBigInt } from "ethers";
import Modal from "antd/es/modal/Modal";
import FormItem from "antd/es/form/FormItem";
import { buyErc20, createNFT } from "../util/nftMarketUtil";
import { getNameServiceToCID } from "../util/erc721Util";
const walletAdd=""
const TokenTotal=100000000000

// 将UserAdd改为一个独立的函数组件
function UserAdd({setAdd}) {
  const [walletAddress, setWallet] = useState("");
  async function fetchGetWalletAddress() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWallet(accounts[0]);
      setAdd(accounts[0])
      walletAdd=accounts[0]
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };
 
  useEffect(() => {
    if (window.ethereum) {
      const fetchWalletAddress = async () => {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          walletAdd=accounts[0]
          setWallet(accounts[0]);
          setAdd(accounts[0])
        } catch (error) {
          console.error('Error connecting to wallet:', error);
        }
      };
      fetchWalletAddress();
    }
  }, []); // 空数组作为依赖，确保只在组件挂载时运行一次

  // 移除了ShowUserAddress，因为它和直接使用${walletAddress}效果相同
  function GetUserAddress() {
    return (
      <div style={{width:"100%"}}>
        {walletAddress ? (
          <>
            当前用户地址: {walletAddress} <Button onClick={() => {fetchGetWalletAddress()}}>再次获取地址</Button> {/* 注意这里需要修正onClick处理函数*/}
          </>
        ) : (
          <Button onClick={() => {fetchGetWalletAddress()}}>获取当前用户地址</Button>
        )}
      </div>
    );
  }

  return <GetUserAddress />;
}

function UserToken({userAdd}) {
  const [erc20Token, setToken] = useState("");

  async function getokenBalance() {
    try {
      let count = await getErc20Balance(userAdd); // 确保getErc20Balance是可用的，并且walletAdd已定义
      setToken(`${count/toBigInt(TokenTotal)}token`);
      console.log(count)
    } catch (error) {
      console.error('Error fetching token balance:', error);
      // 可以在这里设置错误状态或提示
    }
  }
  useEffect(() => {
    async function fetchTokenBalance() {
      try {
        let count = await getErc20Balance(userAdd); // 确保getErc20Balance是可用的，并且walletAdd已定义
        setToken(count);
        
      } catch (error) {
        console.error('Error fetching token balance:', error);
        // 可以在这里设置错误状态或提示
      }
    }

    // 只在walletAdd改变时执行副作用
    if (userAdd) {
      fetchTokenBalance();
    }
  }, [userAdd]); // 依赖数组中包含walletAdd，确保当walletAdd变化时重新获取余额

  return (
    <>
    
    <div>当前余额为: {erc20Token}
      <Button onClick={()=>{getokenBalance()}}>刷新</Button>
    </div>
    </>
  );
}

function BuyToken(){
  
    // 使用useState创建一个状态变量来保存输入的值
    let [inputValue, setInputValue] = useState('');
  
    // onChange事件处理器，当input值变化时被调用
    const handleInputChange = (event) => {
      // 从事件对象中读取输入的值，并更新状态
      setInputValue(event.target.value);
    };

  const handleOk = async () => {
    let value =  parseFloat(inputValue)/parseFloat(TokenTotal)
    console.log(value.toFixed())
    await buyErc20(value.toFixed(11))

    setPop(false);
  };

  const handleCancel = () => {
    setPop(false);
  };
  const[popOut,setPop]=useState(false)
  return (
    <>
    <Button onClick={()=>{setPop(true)}}>购买NFT</Button>
    <Modal open={popOut} onOk={handleOk} onCancel={handleCancel}>
      <Form>
        <FormItem label="请输入要购买的token数"><input type="number" onChange={handleInputChange} defaultValue={inputValue}></input> </FormItem>
      </Form>

    </Modal>
    </>
  )
}

function getZID(resp){
  //TODO:解析返回ZID

  return "0x000000001"
}

function ComplexWeb(){
  let [walletAddress, setWallet] = useState("");
  const[pop,setPop]=useState(false)
  const[newZID,setZID]=useState("")
  const handleCancel = () => {
    setPop(false);
  };
  let [inputValue, setInputValue] = useState('');
  
  // onChange事件处理器，当input值变化时被调用
  const handleInputChange = (event) => {
    // 从事件对象中读取输入的值，并更新状态
    setInputValue(event.target.value);
  };
  async function ClickOK(){
    let cid =  await getNameServiceToCID(inputValue)
    if(cid.toString().length!=0){
      message.error("该域名已被占用")
      return 
    }
    await createNFT(inputValue,newZID)
    message.success("域名购买成功")
  }


 function successUpload(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      // this.handleUploadSuccess(info.file.response, info.file); // 上传成功时调用
      let zid = getZID(info.file.response)
      setZID(zid)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败.`);
    }
  }

  return (
    <Layout style={{width:"100%",height:"100%",...FlexDisplay}}>
      <Content  style={{width:"100%",top:"1vh"}}>
        <Row style={{width:"100%"}}>
          <Col  span={6} offset={6}>
          <UserAdd setAdd={setWallet}/>
          </Col>
          <Col span={3} offset={1}>
          <UserToken userAdd={walletAddress}/>
          </Col>
          <Col span={3} offset={1}>
          <BuyToken></BuyToken>
          </Col>
        </Row>
        <br></br>
        <br/>
        <br/>
        <Row style={{width:"100%"}}>
          <Col span={6} offset={12}>
          
          <Form>
          <FormItem label="部署网站">

            {/* TODO: Modal是 上传网站的弹出框 */}
            <Modal open={pop} onCancel={handleCancel} onOk={ClickOK} >
              此操作大约会花费0.0001ETH,是否继续?
              <br/>
              <Form>
        <FormItem label="请输入要绑定的域名前缀"><input  onChange={handleInputChange} defaultValue={inputValue} ></input>  </FormItem>
        <FormItem label="上传网站目录">
         {/* TODO: 替换为后端地址 */}
        <Upload action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" directory onChange={successUpload}>
            <Button icon={<UploadOutlined />}>上传网站</Button>
            </Upload>
        </FormItem>
      </Form>
            
      
            </Modal>
           
            <Button onClick={()=>{setPop(true)}}>上传网站</Button>

  </FormItem>
        </Form>
          
          </Col>
        </Row>
        


      </Content>

    </Layout>
  );
}
export { ComplexWeb ,UserAdd,UserToken,BuyToken,getZID};
