import { useState } from "react";
import {
  Button,
  Col,
  Form,
  Layout,
  List,
  Modal,
  Row,
  Space,
  Table,
  Upload,
  message,
} from "antd";
import { BuyToken, UserAdd, UserToken, getZID } from "./CompexWeb";
import { getNameServiceList, updateZID } from "../util/nftMarketUtil";
import { render } from "@testing-library/react";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";

function ManageWeb() {
  let [walletAddress, setWallet] = useState("");
  let [NameServiceList, setList] = useState([]);
  let [changeName, setChangeName] = useState("");
  let [zid, setZid] = useState("");
  let [shows, setShow] = useState(false);
  async function getLists() {
    let res = await getNameServiceList();
    console.log(res[0]);
    setList(itemToObj(res));
    console.log(NameServiceList);
  }
  const columns = [
    {
      title: "域名",
      dataIndex: "domain",
      key: "domain",
    },
    {
      title: "ZID",
      dataIndex: "zid",
      key: "zid",
    },
    {
      title: "TokenID",
      dataIndex: "tokenId",
      key: "tokenId",
      render: (text) => String(text), // 将TokenID转换为字符串以便显示
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setChangeName(record.domain);
              setShow(true);
            }}
          >
            修改部署网站
          </Button>
        </Space>
      ),
    },
  ];
  const handleCancel = () => {
    setShow(false);
  };
  const handleOK=async()=>{
    await updateZID(changeName,zid)
    message.success("成功更新部署网站")
  }

  function successUpload(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      // this.handleUploadSuccess(info.file.response, info.file); // 上传成功时调用
      let zid = getZID(info.file.response);
      setZid(zid);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} 上传失败.`);
    }
  }
  function itemToObj(arr) {
    let resp = arr.map((item, index) => ({
      key: item[2],
      domain: item[0], // 域名
      zid: item[1], // CID
      tokenId: String(item[2]), // TokenID，转换为字符串以便显示
      op: "1",
    }));
    return resp;
  }

  return (
    <>
      <Row style={{ width: "100%" }}>
        <Col span={6} offset={6}>
          <UserAdd setAdd={setWallet} />
        </Col>
        <Col span={3} offset={1}>
          <UserToken userAdd={walletAddress} />
        </Col>
        <Col span={3} offset={1}>
          <BuyToken></BuyToken>
        </Col>
      </Row>
      <Modal open={shows} onCancel={handleCancel} onOk={handleOK} >
        此操作大约会花费0.0001ETH,是否继续?
        <br />
        <Form>
          <FormItem label="上传网站目录">
            {/* TODO: 替换为后端地址 */}
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              directory
              onChange={successUpload}
            >
              <Button icon={<UploadOutlined />}>上传网站</Button>
            </Upload>
          </FormItem>
        </Form>
      </Modal>
      <br />
      <Row style={{width:"100%"}}>
        <Col span={6} offset={10}><Button onClick={getLists}>获取当前用户所属的域名</Button></Col>
      </Row>
      
      <br />
      <br />
      <Table columns={columns} dataSource={NameServiceList}></Table>
    </>
  );
}

export { ManageWeb };
