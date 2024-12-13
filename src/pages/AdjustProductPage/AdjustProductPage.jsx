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
import "./AdjustProductPage.css";

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
                <h1 className="title">Sửa sản phẩm</h1>
                <img src="/bell.jpg" alt="Logo" className="logo-image1" />
                <img src="/girl.jpg" alt="Logo" className="logo-image2" />
            </div>
            <div className="header-actions">
              <Button type="default" className="action-btn">
                Hủy
              </Button>
              <Button type="primary" className="action-btn">
                + Lưu thay đổi
              </Button>
            </div>
            <Row gutter={16} className="classification-status">
              <Col span={12}>
                <div className="section">
                  <h2>Phân loại</h2>
                  <Select
                    className="select1"
                    placeholder="Chọn phân loại..."
                    style={{ width: "100%" }}
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
                    style={{ width: "100%" }}
                  >
                    <Option value="new">Mới</Option>
                    <Option value="used">Đã sử dụng</Option>
                  </Select>
                </div>
              </Col>
            </Row>

            {/* Thông tin chung */}
            <div className="section">
              <h2>Thông tin chung</h2>
              <Row gutter={16}>
                <Col span={12}>
                  <label>Tên sản phẩm</label>
                  <Input placeholder="Nhập tên sản phẩm" />
                </Col>
                <Col span={12}>
                  <label>Mô tả</label>
                  <TextArea placeholder="Nhập mô tả sản phẩm ở đây..." rows={4} />
                </Col>
              </Row>
            </div>

            {/* Minh họa */}
            <div className="section">
              <h2>Minh họa</h2>
              <div className="upload-box">
                <p>Kéo và thả hình ảnh vào đây hoặc nhấn "Thêm hình ảnh"</p>
                <Button>Thêm hình ảnh</Button>
              </div>
            </div>

            {/* Giá */}
            <div className="section_gia">
              <h2>Giá</h2>
              <Row gutter={16}>
                <Col span={12}>
                  <label>Giá gốc</label>
                  <Input
                    prefix="$"
                    placeholder="Nhập giá gốc"
                    className="gia_nhap"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      height: '40px',
                      width: '1050px',
                      lineHeight: '40px',
                      padding: '0',
                    }}
                  />
                </Col>
              </Row>
            </div>
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
                    prefix="%"
                    placeholder="Nhập phần trăm giảm giá"
                    className="phan_tram_input"
                    style={{
                      height: '40px', // Chiều cao
                      display: 'flex', // Flexbox để căn chỉnh
                      alignItems: 'center', // Căn giữa theo chiều dọc
                      justifyContent: 'center', // Căn giữa theo chiều ngang
                      textAlign: 'center', // Căn giữa văn bản
                      padding: '0', // Loại bỏ padding nếu cần
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
                    prefix="%"
                    placeholder="Nhập phần trăm thuế"
                    className="phan_tram_input"
                    style={{
                      height: '40px', // Chiều cao
                      display: 'flex', // Flexbox để căn chỉnh
                      alignItems: 'center', // Căn giữa theo chiều dọc
                      justifyContent: 'center', // Căn giữa theo chiều ngang
                      textAlign: 'center', // Căn giữa văn bản
                      padding: '0', // Loại bỏ padding nếu cần
                    }}
                  />
                </Col>
              </Row>
            </div>
            {/* Tồn kho */}
            <div className="section">
              <h2>Tồn kho</h2>
              <Row gutter={16}>
                <Col span={8}>
                  <label>Mã sản phẩm</label>
                  <Input placeholder="Nhập mã sản phẩm" />
                </Col>
                <Col span={8}>
                  <label>Mã vạch</label>
                  <Input placeholder="Nhập mã vạch sản phẩm" />
                </Col>
                <Col span={8}>
                  <label>Số lượng</label>
                  <Input placeholder="Nhập số lượng" />
                </Col>
              </Row>
            </div>

            {/* Thuộc tính */}
            <div className="section">
                <h2>Thuộc tính</h2>
                {attributes.map((attr, index) => (
                  <Row gutter={16} key={attr.key} style={{ marginBottom: "10px" }}>
                    <Col span={12}>
                      <label>Thuộc tính</label>
                      <Select
                        placeholder="Chọn thuộc tính"
                        style={{ width: "100%" }}
                        value={attr.property}
                        onChange={(value) => {
                          const updatedAttributes = [...attributes];
                          updatedAttributes[index].property = value;
                          setAttributes(updatedAttributes);
                        }}
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
                          padding: "10px",
                        }}
                      />
                    </Col>
                  </Row>
                ))}
                <Button
                  className="add-attribute-btn"
                  onClick={addAttribute}
                  type="primary"
                >
                  + Thêm thuộc tính
                </Button>
              </div>
            {/* Vận chuyển */}
            <div className="section">
              <div className="checkboxxx">
                <h2>Vận chuyển</h2>
                <Checkbox>Đây là một mặt hàng vật lý</Checkbox>
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
