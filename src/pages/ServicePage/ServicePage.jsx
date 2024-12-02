import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from "../../components/Modal/Modal_xacnhanxoa/Modal_xacnhanxoa"
import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {Tag,Input,DatePicker,Dropdown,Menu,Table,Space } from "antd";
import "./ServicePage.css";
const { Search } = Input;
const App1 = () => {
  const navigate = useNavigate();

  const handleAddService = () => {
    navigate('/add-service');
  };
  const [modalMode, setModalMode] = useState("add"); 
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const handleExpandRow = (record) => {
    const isRowExpanded = expandedRowKeys.includes(record.key);
    setExpandedRowKeys(isRowExpanded
      ? expandedRowKeys.filter((key) => key !== record.key)
      : [...expandedRowKeys, record.key]);
  };  
  const [data, setData] = useState([
    {
      key: "1",
      productCode: "123876",
      postedDate: "29 Dec 2022",
      price: "13.000.000",
      customer: "bao",
      statuss: "Chưa giao hàng",
      checked: true,
      expanded: false,
      details: [
        { type: "Size 6", stock: 1 },
        { type: "Size 7", stock: 1 },
        { type: "Size 7", stock: 1 },
        { type: "Size 7", stock: 1 },
        { type: "Size 7", stock: 1 },
        { type: "Size 7", stock: 1 },
        { type: "Size 7", stock: 1 },
        { type: "Size 7", stock: 1 },
        { type: "Size 7", stock: 1 },
      ],
    },
    {
      key: "2",
      productCode: "123878",
      postedDate: "30 Dec 2022",
      price: "12.000.000",
      customer: "minh",
      statuss: "Đã hủy",
      checked: true,
      expanded: false,
      details: [
        { type: "Size 6", stock: 1 },
        { type: "Size 7", stock: 1 },
      ],
    },
    {
      key: "3",
      productCode: "1238769",
      postedDate: "22 Dec 2022",
      price: "1.000.000.000.000 VNĐ",
      customer: "Nguyễn Phương Hằng",
      statuss: "Đã hoàn tất",
      checked: true,
      expanded: false,
      details: [
        { type: "Size 6", stock: 1 },
        { type: "Size 7", stock: 1 },
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
      <Menu.Item key="1">Chờ Xác Nhận</Menu.Item>
      <Menu.Item key="2">Đã Xác Nhận</Menu.Item>
      <Menu.Item key="3">Đã Hủy</Menu.Item>
    </Menu>
  );
  const handleCheckboxChange = (key) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, checked: !item.checked } : item
    );
    setData(updatedData);
  };

  const handleRowClick = (record) => {
    const updatedData = data.map((item) =>
      item.key === record.key ? { ...item, expanded: !item.expanded } : item
    );
    setData(updatedData);
  };
  const navigate2 = useNavigate();

  const handleOpenEditModal2 = (record) => {
    navigate(`/adjust-service/${record.key}`);
  };
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "productCode",
      key: "productCode",
      width: "20%",
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
      width: "25%",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      width: "30%",
    },
    {
      title: (
        <Dropdown overlay={menu2} trigger={["click"]}>
          <span style={{ cursor: "pointer" }}>
            Tình Trạng<DownOutlined />
          </span>
        </Dropdown>
      ),
      dataIndex: "statuss",
      key: "statuss",
      width: "20%",
      render: (statuss) => {
        let color;
        switch (statuss) {
          case "Chưa giao hàng":
            color = "yellow";
            break;
          case "Đã hoàn tất":
            color = "blue";
            break;
          case "Đã hủy":
            color = "red";
            break;
          default:
            color = "white";
        }
        return <Tag color={color}>{statuss}</Tag>;
      },
    },
    {
      title: (
        <Dropdown overlay={menu1} trigger={["click"]}>
          <span style={{ cursor: "pointer" }}>
            Thành tiền <DownOutlined />
          </span>
        </Dropdown>
      ),
      dataIndex: "price",
      key: "price",
      width: "30%",
    },
    {
      title: "Hành động",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => handleOpenEditModal2(record)} // Mở modal chỉnh sửa
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
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Hiển thị modal xóa
  const [selectedDeleteOrder, setSelectedDeleteOrder] = useState(null); // Lưu đơn hàng được chọn để xóa
  const handleDeleteClick = (order) => {
    setSelectedDeleteOrder(order); // Lưu đơn hàng được chọn để xóa
    setIsDeleteModalVisible(true); // Hiển thị modal xác nhận
  };
  const handleOpenEditModal = (order) => {
    setModalMode("edit"); // Chế độ chỉnh sửa
    setSelectedOrder(order); // Lưu dữ liệu sản phẩm được chọn
    setIsModalVisible(true); // Mở modal
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (record) => {
    setSelectedOrder(record); // Lưu thông tin đơn hàng được chọn
    setIsModalVisible(true);  // Hiển thị modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Đóng modal
  };
  const onSearch = (value) => {
    console.log("Tìm kiếm:", value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === "Tất cả") {
      setFilteredData(data); // Hiển thị tất cả
    } else {
      // Lọc dữ liệu theo trạng thái
      const filtered = data.filter((item) => item.statuss === tab);
      setFilteredData(filtered);
  }
  };
  const handleDateChange = (date, dateString, key) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, postedDate: dateString } : item
    );
    setData(updatedData);
  };
  const toggleExpandRow = (recordKey) => {
    const updatedData = [...data];
    const recordIndex = updatedData.findIndex((item) => item.key === recordKey);
  
    if (recordIndex >= 0) {
      // Nếu đã mở chi tiết thì xóa dòng chi tiết khỏi data
      if (updatedData[recordIndex].expanded) {
        updatedData.splice(recordIndex + 1, 1);
      } else {
        // Thêm hàng chi tiết ngay sau dòng chính
        updatedData.splice(recordIndex + 1, 0, {
          key: `${recordKey}-detail`,
          isDetail: true,
          details: updatedData[recordIndex].details,
        });
      }
      // Cập nhật trạng thái mở rộng
      updatedData[recordIndex].expanded = !updatedData[recordIndex].expanded;
    }
    setData(updatedData);
  };
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    setFilteredData(data); // Hiển thị tất cả khi load lần đầu
  }, []);
  const handleDeleteConfirm = () => {
    const updatedData = data.filter((item) => item.key !== selectedDeleteOrder.key); // Lọc bỏ đơn hàng được chọn
    setData(updatedData); // Cập nhật danh sách
    setIsDeleteModalVisible(false); // Đóng modal
    setSelectedDeleteOrder(null); // Xóa thông tin đơn hàng đã chọn
  };
  useEffect(() => {
    setFilteredData(data); // Hiển thị tất cả khi load lần đầu
  }, []);
  useEffect(() => {
    if (activeTab === "Tất cả") {
      setFilteredData(data); // Hiển thị tất cả
    } else {
      const filtered = data.filter((item) => item.statuss === activeTab);
      setFilteredData(filtered);
    }
  }, [data, activeTab]);
  const tabs = ["Tất cả", "Đã hủy", "Chưa giao hàng", "Đã hoàn tất"];
    return (
        <div className="order-page">
          <main className="order-table-container">
              <Header 
                title={"Danh sách phiếu dịch vụ"} 
                button_modal={"Thêm dịch vụ"}
                onAddOrder={handleAddService} // Add this prop
              />
            <FilterBar tabs={tabs}  activeTab={activeTab} onTabClick={handleTabClick} />
            <section className="order-header">    
              <Table
                className="tableer-containers"
                columns={columns}
                dataSource={filteredData}
                tableLayout="fixed"
                expandable={{
                  expandedRowKeys,
                  onExpand: (expanded, record) => toggleExpandRow(record),
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
}
export default App1;
