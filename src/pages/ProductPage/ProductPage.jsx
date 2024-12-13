import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { useNavigate } from 'react-router-dom';
import FilterBar from "../../components/FilterBar/FilterBar";
import DeleteConfirmationModal from "../../components/Modal/Modal_xacnhanxoa/Modal_xacnhanxoa"
import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Table, Tag, Space, Input, DatePicker, Dropdown, Menu} from "antd";
import dayjs from "dayjs";


import "./ProductPage.css";

const { Search } = Input;

const App = () => {
  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate('/add-product');
  };
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const handleExpandRow = (record) => {
    const isRowExpanded = expandedRowKeys.includes(record.key);
    setExpandedRowKeys(isRowExpanded 
      ? expandedRowKeys.filter((key) => key !== record.key) 
      : [...expandedRowKeys, record.key]);
  };  
  const tabs = ["Tất cả", "Đã đăng", "Tồn kho thấp", "Nháp"];
  const [data, setData] = useState([
    {
      key: "1",
      productName: "Nhẫn Kim cương Vàng",
      productCode: "123876",
      category: "3 phân loại",
      classification: "Nhẫn",
      stock: 2,
      price: "13.000.000",
      status: "Tồn kho thấp",
      postedDate: "29 Dec 2022",
      checked: true,
      expanded: false,
      image: "/kc_v.png",
      details: [
        { type: "Size 6", stock: 1 },
        { type: "Size 7", stock: 1 },
      ],
    },
    {
      key: "2",
      productName: "Nhẫn Kim cương Vàng",
      productCode: "123877",
      category: "3 phân loại",
      classification: "Nhẫn",
      stock: 120,
      price: "13.000.000",
      status: "Đã đăng",
      postedDate: "24 Dec 2022",
      checked: false,
      expanded: false,
      image: "/kc_v.png",
      details: [
        { type: "Size 8", stock: 50 },
        { type: "Size 9", stock: 70 },
      ],
    },
    {
      key: "3",
      productName: "Nhẫn Kim cương Vàng",
      productCode: "123878",
      category: "3 phân loại",
      classification: "Nhẫn",
      stock: 43,
      price: "13.000.000",
      status: "Nháp",
      postedDate: "12 Dec 2022",
      checked: false,
      expanded: false,
      image: "/kc_v.png",
      details: [
        { type: "Size 6", stock: 20 },
        { type: "Size 7", stock: 23 },
      ],
    },
  ]);
  const menu = (
    <Menu>
      <Menu.Item key="1">Sắp xếp tên</Menu.Item>
      <Menu.Item key="2">Sắp xếp theo</Menu.Item>
      <Menu.Item key="3">Sắp xếp theo lượng tồn</Menu.Item>
    </Menu>
  );

  const menu1 = (
    <Menu>
      <Menu.Item key="1">Sắp xếp tăng dần</Menu.Item>
      <Menu.Item key="2">Sắp xếp giảm dần</Menu.Item>
    </Menu>
  );

  const menu2 = (
    <Menu>
      <Menu.Item key="1">Tồn kho thấp</Menu.Item>
      <Menu.Item key="2">Đã đăng</Menu.Item>
      <Menu.Item key="3">Nháp</Menu.Item>
    </Menu>
  );
  const handleCheckboxChange = (key) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, checked: !item.checked } : item
    );
    setData(updatedData);
  };

  
  const navigate1 = useNavigate();
  const handleEditProduct = (key) => {
    navigate1(`/adjust-product/${key}`);
  };
  const columns = [
    {
      title: (
        <Dropdown overlay={menu} trigger={["click"]}>
          <span style={{ cursor: "pointer" }}>
            Tên sản phẩm <DownOutlined />
          </span>
        </Dropdown>
      ),
      dataIndex: "productName",
      key: "productName",
      width: "25%",
      render: (text, record) => (
        <div className="checkbb" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="checkbox"
            checked={record.checked}
            onChange={(e) => handleCheckboxChange(record.key)}
          />
          <img
            src={record.imagqe}
            alt={record.productName || "Product Image"}
            className="image_productt"
          />
          <div className="content-tssp">
            <strong>{record.productName}</strong>
            <br />
            <span>{record.category}</span>
          </div>
        </div>
      ),
    },
    { 
      title: "Mã SP",
      dataIndex: "productCode",
      key: "productCode",
      width: 80,
    },
    {

      title: "Phân loại",
      dataIndex: "classification",
      key: "classification",
      width: "10%",
    },
    {
      title: "Lượng tồn",
      dataIndex: "stock",
      key: "stock",
      width: "12%",
    },
    {
      title: (
        <Dropdown overlay={menu1} trigger={["click"]}>
          <span style={{ cursor: "pointer" }}>
            Giá <DownOutlined />
          </span>
        </Dropdown>
      ),
      dataIndex: "price",
      key: "price",
      width: "10%",
    },
    {
      title: (
        <Dropdown overlay={menu2} trigger={["click"]}>
          <span style={{ cursor: "pointer" }}>
            Tình Trạng<DownOutlined />
          </span>
        </Dropdown>
      ),
      dataIndex: "status",
      key: "status",
      width: "12%",
      render: (status) => {
        let color = "";
        switch (status) {
          case "Tồn kho thấp":
            color = "red";
            break;
          case "Đã đăng":
            color = "orange";
            break;
          case "Nháp":
            color = "gray";
            break;
          default:
            color = "blue";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">
                <DatePicker
                  onChange={(date, dateString) => console.log("Chọn ngày:", dateString)}
                  style={{ width: "100%" }}
                />
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <span style={{ cursor: "pointer" }}>
            Đăng vào <DownOutlined />
          </span>
        </Dropdown>
      ),
      dataIndex: "postedDate",
      key: "postedDate",
      width: "13%",
    },
    {
      title: "Hành động",
      key: "action",
      width: "13%",
      render: (text, record) => (
        <Space size="middle" style={{ paddingLeft: "0", marginLeft: "0px" }}>
          <EditOutlined 
            style={{ color: "#1890ff", cursor: "pointer" }} 
            onClick={() => handleEditProduct(record.key)} // Thêm sự kiện onClick để điều hướng
          />
          <EyeOutlined
            style={{ color: "#52c41a", cursor: "pointer" }}
            onClick={() => handleExpandRow(record)}
          />
          <DeleteOutlined
            style={{ color: "#ff4d4f", cursor: "pointer" }}
            onClick={() => handleDeleteClick(record)}
          />
        </Space>
      ),
    }
  ];
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDeleteOrder, setSelectedDeleteOrder] = useState(null); // Lưu đơn hàng được chọn để xóa
  const handleDeleteClick = (order) => {
    setSelectedDeleteOrder(order); // Lưu đơn hàng được chọn để xóa
    setIsDeleteModalVisible(true); // Hiển thị modal xác nhận
  };
  const handleViewDetails = (record) => {
    setSelectedOrder(record); // Lưu thông tin đơn hàng được chọn
    setIsModalVisible(true);  // Hiển thị modal
  };
  const handleDeleteConfirm = () => {
    const updatedData = data.filter((item) => item.key !== selectedDeleteOrder.key); // Lọc bỏ đơn hàng được chọn
    setData(updatedData); // Cập nhật danh sách
    setIsDeleteModalVisible(false); // Đóng modal
    setSelectedDeleteOrder(null); // Xóa thông tin đơn hàng đã chọn
  };
  const handleCancel = () => {
    setIsModalVisible(false); // Đóng modal
  };
  const onSearch = (value) => {
    console.log("Tìm kiếm:", value);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const handleDateChange = (date, dateString, key) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, postedDate: dateString } : item
    );
    setData(updatedData);
  };
  useEffect(() => {
    if (activeTab === "Tất cả") {
      setFilteredData(data); // Hiển thị tất cả
    } else {
      const filtered = data.filter((item) => item.status === activeTab);
      setFilteredData(filtered);
    }
  }, [data, activeTab]);
  useEffect(() => {
    setFilteredData(data); // Hiển thị tất cả khi load lần đầu
  }, []);
  const [filteredData, setFilteredData] = useState([]);
  return (
    <div className="order-page">
      <main className="order-table-container">
      <Header title={"Sản phẩm"} button_modal={"Tạo sản phẩm"} onAddOrder={handleCreateProduct}/>
        <FilterBar tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
        <section className="order-header">
          <Table
            className="table-containerr"
            columns={columns}
            dataSource={filteredData}
            tableLayout="fixed"
            expandable={{
              expandedRowKeys,
              onExpand: (expanded, record) => handleExpandRow(record),
              expandedRowRender: (record) => (
                <div className="detail">
                  {record.details.map((detail, index) => (
                    <p key={index}>
                      {detail.type}: {detail.stock} sản phẩm
                    </p>
                  ))}
                </div>
              ),
              rowExpandable: (record) => record.details.length > 0,
              showExpandColumn: false,
              expandIcon: () => null
            }}
            scroll={{
              y: 300,
            }}
          />
        </section>
        <DeleteConfirmationModal
                isVisible={isDeleteModalVisible}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setIsDeleteModalVisible(false)}
                order={selectedDeleteOrder}
        />
      </main>
    </div>
  );
};

export default App;