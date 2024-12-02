import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import FilterBar from "../../components/FilterBar/FilterBar";
import AddOrderModal from "../../components/Modal/Modal_phieubanhang/AddOrderModal";
import DeleteConfirmationModal from "../../components/Modal/Modal_xacnhanxoa/Modal_xacnhanxoa"
import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  expandedRowKeys,
  setExpandedRowKeys,
  DownOutlined,
} from "@ant-design/icons";
import { Table, Tag, Space, Input, Button, DatePicker, Dropdown, Menu, scroll } from "antd";
import dayjs from "dayjs";

import "./OrderProductPage.css";

const { Search } = Input;

const App1 = () => {
  
  const productList = [
    { id: 1, name: "Sản phẩm A", image: "/product1.png", price: "100,000 VNĐ" },
    { id: 2, name: "Sản phẩm B", image: "/product2.png", price: "200,000 VNĐ" },
    { id: 3, name: "Sản phẩm C", image: "/product3.png", price: "300,000 VNĐ" },
    { id: 4, name: "Sản phẩm D", image: "/product4.png", price: "400,000 VNĐ" },
  ];  
  const [modalMode, setModalMode] = useState("add"); // "add" hoặc "edit"
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]); // Quản lý hàng mở rộng
  const handleExpandRow = (record) => {
    const isRowExpanded = expandedRowKeys.includes(record.key);
    setExpandedRowKeys(isRowExpanded 
      ? expandedRowKeys.filter((key) => key !== record.key) 
      : [...expandedRowKeys, record.key]);
  };  
  const [searchTerm, setSearchTerm] = useState(""); // Trạng thái tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState(productList); // Sản phẩm đã lọc
  
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = productList.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  const [data, setData] = useState([
    {
      key: "1",
      productName: "Nhẫn Kim cương Vàng",
      productCode: "123876",
      postedDate: "29 Dec 2022",
      customerName: "John Bushmill",
      price: "13.000.000",
      category: "3 phân loại",
      classification: "Nhẫn",
      paymentMethod: "Mastercard",
      status: "Đang xử lý",
      checked: true,
      expanded: false,
      image: "/kc_v.png",
      details: [
        { type: "Size 6", stock: 1 },
        { type: "Size 7", stock: 1 }
      ]
    },
    {
      key: "2",
      productName: "Nhẫn Kim cương Vàng",
      productCode: "123876",
      postedDate: "24 Dec 2022",
      customerName: "Linda Blair",
      price: "13.000.000",
      category: "3 phân loại",
      classification: "Nhẫn",
      paymentMethod: "Visa",
      status: "Đã giao",
      checked: false,
      expanded: false,
      image: "/kc_v.png",
      details: [
        { type: "Size 6", stock: 1 },
        { type: "Size 7", stock: 1 }
      ]
    },
    {
      key: "3",
      productName: "Nhẫn Kim cương Vàng",
      productCode: "123876",
      postedDate: "12 Dec 2022",
      customerName: "M Karim",
      price: "13.000.000",
      category: "3 phân loại",
      classification: "Nhẫn",
      paymentMethod: "Mastercard",
      status: "Đã hủy",
      checked: false,
      expanded: false,
      details: [
        { type: "Size 6", stock: 1 },
        { type: "Size 7", stock: 1 }
      ]
    }
  ]);
  const menu = (
    <Menu>
      <Menu.Item key="1">Sắp xếp tên</Menu.Item>
      <Menu.Item key="2">Sắp xếp theo ...</Menu.Item>
      <Menu.Item key="3">Sắp xếp theo ...</Menu.Item>
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
      <Menu.Item key="1">Đang xử lý</Menu.Item>
      <Menu.Item key="2">Đã giao</Menu.Item>
      <Menu.Item key="3">Đã hủy</Menu.Item>
    </Menu>
  );
  const toggleExpandRow = (recordKey) => {
    setExpandedRowKeys((prevExpandedKeys) =>
      prevExpandedKeys.includes(recordKey)
        ? prevExpandedKeys.filter((key) => key !== recordKey) // Thu gọn
        : [...prevExpandedKeys, recordKey] // Mở rộng
    );
  };
  useEffect(() => {
    if (activeTab === "Tất cả") {
      setFilteredData(data); // Hiển thị tất cả
    } else {
      const filtered = data.filter((item) => item.status === activeTab);
      setFilteredData(filtered);
    }
  }, [data, activeTab]);
  const handleCheckboxChange = (key) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, checked: !item.checked } : item
    );
    setData(updatedData);
  };
  
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "productCode",
      key: "productCode",
      width: "15%",
      render: (text, record) => (
        <div
      style={{
        display: "flex",
        alignItems: "center", // Căn giữa theo chiều dọc
        gap: "0px", // Khoảng cách giữa checkbox và chữ
        marginRight: "80px",
      }}
    >
      <input
        type="checkbox"
        checked={record.checked}
        onChange={() => handleCheckboxChange(record.key)}
        style={{ cursor: "pointer" }}
      />
      <span style={{ whiteSpace: "nowrap", marginLeft: "10px" }}>{record.productCode}</span>
    </div>
      ),
    },
    
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      width: "22%",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={record.image}
            alt="Product"
            style={{ width: "5px", height: "5px" }}
          />
          <div>
            <strong>{record.productName}</strong>
            <br />
            <span>{record.category}</span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">
                <DatePicker
                  onChange={(date, dateString) => console.log("Ngày:", dateString)}
                  style={{ width: "100%", alignItems: "left",justifyItems: "left"}}
                />
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <span style={{ cursor: "pointer" }}>
            Ngày <DownOutlined />
          </span>
        </Dropdown>
      ),
      dataIndex: "postedDate",
      key: "postedDate",
      width: "13%",
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      width: "15%",
    },
    {
      title: (
        <Dropdown overlay={menu1} trigger={["click"]}>
          <span style={{ cursor: "pointer" }}>
            Tổng tiền <DownOutlined />
          </span>
        </Dropdown>
      ),
      dataIndex: "price",
      key: "price",
      width: "15%",
    },
    {
      title: "Hình thức",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: "13%",
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
      width: "13%",
      render: (status) => {
        let color;
        switch (status) {
          case "Đang xử lý":
            color = "yellow";
            break;
          case "Đã giao":
            color = "blue";
            break;
          case "Đã hủy":
            color = "red";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      width: "13%",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => handleOpenEditModal(record)} // Mở modal chỉnh sửa
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
    },
  ];
  useEffect(() => {
    setFilteredData(data); // Hiển thị tất cả khi load lần đầu
  }, []);

  // Mở modal thêm đơn hàng
  const handleOpenAddModal = () => {
    setModalMode("add"); // Chế độ thêm mới
    setSelectedOrder(null); // Không có dữ liệu chỉnh sửa
    setIsModalVisible(true); // Mở modal
  };

  // Mở modal chỉnh sửa đơn hàng
  const handleOpenEditModal = (order) => {
    setModalMode("edit"); // Chế độ chỉnh sửa
    setSelectedOrder(order); // Lưu dữ liệu sản phẩm được chọn
    setIsModalVisible(true); // Mở modal
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === "Tất cả") {
      setFilteredData(data); // Hiển thị tất cả
    } else {
      // Lọc dữ liệu theo trạng thái
      const filtered = data.filter((item) => item.status === tab);
      setFilteredData(filtered);
  }
  };
  const [filteredData, setFilteredData] = useState([]);
  const handleOpenModal = () => {
    setModalMode("add");
    setIsModalVisible(true); // Mở modal
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Đóng modal
  };
  const tabs = ["Tất cả", "Đã giao", "Đang xử lý", "Đã hủy"];
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Hiển thị modal xóa
  const [selectedDeleteOrder, setSelectedDeleteOrder] = useState(null); // Lưu đơn hàng được chọn để xóa
  const handleDeleteClick = (order) => {
    setSelectedDeleteOrder(order); // Lưu đơn hàng được chọn để xóa
    setIsDeleteModalVisible(true); // Hiển thị modal xác nhận
  };
  const handleDeleteConfirm = () => {
    const updatedData = data.filter((item) => item.key !== selectedDeleteOrder.key); // Lọc bỏ đơn hàng được chọn
    setData(updatedData); // Cập nhật danh sách
    setIsDeleteModalVisible(false); // Đóng modal
    setSelectedDeleteOrder(null); // Xóa thông tin đơn hàng đã chọn
  };
  return (
    <div className="order-page">
      <main className="order-table-container">
        <Header onAddOrder={handleOpenModal} title={"Đơn hàng"} button_modal={"Thêm đơn hàng"}/>
        <FilterBar tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
        <section className="header-actions">
          <Table
            className="tablee-containero"
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
          />
        </section>
        <AddOrderModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          mode={modalMode} // Chế độ "add" hoặc "edit"
          title={modalMode === "add" ? "Tạo đơn hàng mới" : "Chỉnh sửa đơn hàng"}
          save={modalMode === "add" ? "Lưu đơn hàng" : "Lưu chỉnh sửa"}
          order={modalMode === "edit" ? selectedOrder : null} // Dữ liệu sản phẩm khi chỉnh sửa
          searchTerm={searchTerm} // Truyền searchTerm xuống
          handleSearch={handleSearch} // Truyền hàm xử lý tìm kiếm
          filteredProducts={filteredProducts} // Truyền danh sách sản phẩm đã lọc 
        />
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

export default App1;
