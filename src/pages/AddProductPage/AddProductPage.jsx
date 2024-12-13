import React, { useState} from "react";
import {
  Layout,
  Menu,
  Input,
  Select,
  Button,
  Checkbox,
  Row,
  Col,
  Tag,
  Breadcrumb, // Thêm import Breadcrumb
} from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  FileAddOutlined,
  ShoppingCartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  DollarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./AddProductPage.css";

const { Sider, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const App = () => {
  const [attributes, setAttributes] = useState([
    { key: 1, property: "", detail: "" },
  ]);

  // Hàm thêm thuộc tính mới
  const addAttribute = () => {
    const newKey = attributes.length + 1;
    setAttributes([
      ...attributes,
      { key: newKey, property: "", detail: "" },
    ]);
  };
  return (
    <Layout className="app-layout">
      {/* Sidebar */}
      <div className="body_them">
        <Layout>
        <Content className="app-content">
            <div className="title-container">
                <h1 className="title">Thêm sản phẩm</h1>
                <img src="/bell.jpg" alt="Logo" className="logo-image111" />
                <img src="/girl.jpg" alt="Logo" className="logo-image211" />
            </div>
            <div className="header-actions">
            <Button 
              type="default" 
              className="action-btn"
              style={{ 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '30px'
              }}
            >
              Hủy
            </Button>
            <Button 
              type="primary" 
              className="action-btn"
              style={{ 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '30px'
              }}
            >
              + Lưu sản phẩm
            </Button>
          </div>
          <Row gutter={16} className="classification-status" style={{
                backgroundColor: "#f8f9ff",
                padding: "0px",
                marginLeft: "0px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
                border: "1px solid #e6e9f0",
                marginBottom: "20px",
                width: "100%"
              }}>
                <Col span={12}>
                  <div className="section">
                    <h2>Phân loại</h2>
                    <Select
                      className="select1"
                      placeholder="Chọn phân loại..."
                      style={{ 
                        width: "475px",
                        borderRadius: "8px",
                        marginLeft:"-5px"
                      }}
                    >
                      <Option value="category1">Danh mục 1</Option>
                      <Option value="category2">Danh mục 2</Option>
                    </Select>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="section">
                    <h2>Tình trạng</h2>
                    <Select
                      placeholder="Chọn tình trạng..."
                      style={{ 
                        width: "100%",
                        borderRadius: "8px"
                      }}
                    >
                      <Option value="new">Mới</Option>
                      <Option value="used">Đã sử dụng</Option>
                    </Select>
                  </div>
                </Col>
              </Row>
            {/* Thông tin chung */}
            {/* Thông tin chung */}
            <div className="section" style={{
              backgroundColor: "#f8f9ff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
              border: "1px solid #e6e9f0",
              marginBottom: "20px",
              width: "100%"
            }}>
              <h2>Thông tin chung</h2>
              <Row gutter={16}>
                <Col span={12}>
                  <label>Tên sản phẩm</label>
                  <Input 
                    placeholder="Nhập tên sản phẩm" 
                    style={{ borderRadius: "8px" }}
                  />
                </Col>
                <Col span={12}>
                  <label style={{marginLeft:"20px"}}>Mô tả</label>
                  <TextArea 
                    placeholder="Nhập mô tả sản phẩm ở đây..." 
                    rows={4} 
                    style={{ borderRadius: "8px", marginLeft:"20px",width:"455px" }}
                  />
                </Col>
              </Row>
            {/* Minh họa */}
              <h2>Minh họa</h2>
              <div className="upload-box" style={{
                border: "4px dashed #e6e9f0",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center"
              }}>
                <p>Kéo và thả hình ảnh vào đây hoặc nhấn "Thêm hình ảnh"</p>
                <Button style={{ borderRadius: "8px" }}>Thêm hình ảnh</Button>
              </div>
            </div>
            {/* Giá */}
            <div className="section" style={{
              backgroundColor: "#f8f9ff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
              border: "1px solid #e6e9f0",
              marginBottom: "20px",
              width: "100%"
            }}>
              <h2>Giá sản phẩm</h2>
              <Row gutter={16}>
                <Col span={12}>
                  <label style={{marginLeft: "20px"}}>Giá gốc</label>
                  <Input
                    
                    placeholder="Nhập giá gốc"
                    className="gia_nhap"
                    style={{
                      height: '40px',
                      width: '910px',
                      borderRadius: '8px',
                      textAlign: 'left',
                      alignItems:"center",
                      fontSize: '14px',
                      marginLeft:"20px",
                    }}
                  />
                </Col>
              </Row>
            <div className="section_LG">
              <Row gutter={16}>
                <Col span={12}>
                  <label>Loại giảm giá</label>
                  <Select placeholder="Chọn loại giảm giá" style={{ width: "100%" }}>
                    <Option value="percentage">Loại 1</Option>
                    <Option value="amount">Loại 2</Option>
                  </Select>
                </Col>
                <Col span={12}>
                  <label>Phần trăm giảm giá(%)</label>
                  <Input
                    placeholder="Nhập phần trăm giảm giá"
                    className="phan_tram_input"
                    style={{
                      height: '40px', // Chiều cao
                      display: 'flex', // Flexbox để căn chỉnh
                      alignItems: 'center', // Căn giữa theo chiều dọc
                      justifyContent: 'center', // Căn giữa theo chiều ngang
                      textAlign: 'left', // Căn giữa văn bản
                      padding: '10px', // Loại bỏ padding nếu cần
                    }}
                  />
                </Col>
              </Row>
            </div>
            <div className="section_LG2">
              <Row gutter={16}>
                <Col span={12}>
                  <label>Loại thuế</label>
                  <Select placeholder="Chọn loại thuế" style={{ width: "100%" }}>
                    <Option value="percentage">Loại 1</Option>
                    <Option value="amount">Loại 2</Option>
                  </Select>
                </Col>
                <Col span={12}>
                  <label>Phần trăm thuế(%)</label>
                  <Input
                    placeholder="Nhập phần trăm thuế"
                    className="phan_tram_input"
                    style={{
                      height: '40px', // Chiều cao
                      display: 'flex', // Flexbox để căn chỉnh
                      alignItems: 'center', // Căn giữa theo chiều dọc
                      justifyContent: 'center', // Căn giữa theo chiều ngang
                      textAlign: 'left', // Căn giữa văn bản
                      padding: '10px', // Loại bỏ padding nếu cần
                    }}
                  />
                </Col>
              </Row>
              </div>
            </div>
            {/* Tồn kho */}
            <div className="section" style={{
                backgroundColor: "#f8f9ff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
                border: "1px solid #e6e9f0",
                marginBottom: "20px",
                width: "100%"
              }}>
                <h2>Tồn kho</h2>
                <Row gutter={16}>
                  <Col span={8}>
                    <label>Mã sản phẩm</label>
                    <Input 
                      placeholder="Nhập mã sản phẩm"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        lineHeight: '40px'
                      }}
                    />
                  </Col>
                  <Col span={8}>
                    <label>Mã vạch</label>
                    <Input 
                      placeholder="Nhập mã vạch sản phẩm"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        lineHeight: '40px'
                      }}
                    />
                  </Col>
                  <Col span={8}>
                    <label>Số lượng</label>
                    <Input 
                      placeholder="Nhập số lượng"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        lineHeight: '40px'
                      }}
                    />
                  </Col>
                </Row>
              </div>
            {/* Thuộc tính */}
            <div className="section" style={{
                backgroundColor: "#f8f9ff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
                border: "1px solid #e6e9f0",
                marginBottom: "20px",
                width: "100%"
              }}>
                <h2>Thuộc tính</h2>
                {attributes.map((attr, index) => (
                  <Row gutter={16} key={attr.key} style={{ marginBottom: "10px" }}>
                    <Col span={12}>
                      <label>Thuộc tính</label>
                      <Select
                        placeholder="Chọn thuộc tính"
                      >
                        <Option value="color">Màu sắc</Option>
                        <Option value="size">Kích thước</Option>
                      </Select>
                    </Col>
                    <Col span={12}>
                      <label>Cụ thể</label>
                      <Input
                        placeholder="Nhập cụ thể"
                        value={attr.detail}
                        onChange={(e) => {
                          const updatedAttributes = [...attributes];
                          updatedAttributes[index].detail = e.target.value;
                          setAttributes(updatedAttributes);
                        }}
                        className="phan_tram_input"
                        style={{
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "left",
                          
                        }}
                      />
                    </Col>
                  </Row>
                ))}
                <Button
                className="add-attribute-btn"
                onClick={addAttribute}
                type="primary"
                style={{
                  borderRadius: '8px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '16px'
                }}
              >
                + Thêm thuộc tính
              </Button>
              </div>
            {/* Vận chuyển */}
            <div className="section" style={{
                backgroundColor: "#f8f9ff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
                border: "1px solid #e6e9f0",
                marginBottom: "20px",
                width: "100%"
              }}>
              <div className="checkboxxx">
                <h2>Vận chuyển</h2>
                <Checkbox style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    lineHeight: '1.5',
                    marginTop: '6 px', // Move text down slightly
                    display: 'inline-block'
                  }}>
                    Đây là một mặt hàng vật lý
                  </span>
                </Checkbox>
              </div>
              <Row gutter={16} style={{ marginTop: "10px" }}>
                <Col span={6}>
                  <label>Cân nặng</label>
                  <Input placeholder="Nhập cân nặng" />
                </Col>
                <Col span={6}>
                  <label>Chiều cao</label>
                  <Input placeholder="Nhập chiều cao" />
                </Col>
                <Col span={6}>
                  <label>Độ dài</label>
                  <Input placeholder="Nhập độ dài" />
                </Col>
                <Col span={6}>
                  <label>Chiều rộng</label>
                  <Input placeholder="Nhập chiều rộng" />
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};

export default App;
