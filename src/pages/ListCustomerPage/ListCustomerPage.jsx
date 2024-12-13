import React, { useState, useMemo } from "react";
import { Input, Button, Tag, Table, Modal } from "antd";
import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./ListCustomerPage.css";
import Topbar from "../../components/TopbarComponent/TopbarComponent";

// Hàm khởi tạo dữ liệu mẫu
const initData = () => [
  {
    id: 1,
    name: "John Bushmill",
    email: "john.bushmill@example.com",
    phone: "0123456789",
    status: "Hoạt động",
    customerCode: "CUST001",
  },
  {
    id: 2,
    name: "Laura Prichett",
    email: "laura.prichett@example.com",
    phone: "0987654321",
    status: "Mới",
    customerCode: "CUST002",
  },
  {
    id: 3,
    name: "Mohammad Karim",
    email: "mohammad.karim@example.com",
    phone: "0933456789",
    status: "Đã khóa",
    customerCode: "CUST003",
  },
  {
    id: 4,
    name: "Sarah Connor",
    email: "sarah.connor@example.com",
    phone: "0912345678",
    status: "Hoạt động",
    customerCode: "CUST004",
  },
];

const CustomerList = () => {
  const navigate = useNavigate();

  // Quản lý toàn bộ trạng thái trong params
  const [params, setParams] = useState({
    search: "",
    status: "Tất cả trạng thái",
    selectedRowKeys: [],
    isDeleteModalVisible: false,
  });

  const [customers, setCustomers] = useState(initData());

  // Hàm xử lý thay đổi chung
  const handleChange = (key, value) => {
    setParams((prevParams) => ({
      ...prevParams,
      [key]: value,
    }));
  };

  // Lọc danh sách khách hàng
  const filteredCustomers = useMemo(() => {
    let filtered = customers;

    if (params.status !== "Tất cả trạng thái") {
      filtered = filtered.filter(
        (customer) => customer.status === params.status
      );
    }

    if (params.search) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(params.search.toLowerCase()) ||
          customer.email.toLowerCase().includes(params.search.toLowerCase())
      );
    }

    return filtered;
  }, [customers, params.status, params.search]);

  // Xử lý xóa các khách hàng đã chọn
  const handleDeleteSelected = () => {
    const remainingCustomers = customers.filter(
      (customer) => !params.selectedRowKeys.includes(customer.id)
    );
    setCustomers(remainingCustomers);
    handleChange("selectedRowKeys", []);
    handleChange("isDeleteModalVisible", false);
    alert("Đã xóa khách hàng đã chọn.");
  };

  // Cột dữ liệu cho bảng
  const columns = [
    {
      title: "Mã khách hàng",
      dataIndex: "customerCode",
      key: "customerCode",
      width: 150,
    },
    { title: "Họ tên", dataIndex: "name", key: "name", width: 200 },
    { title: "Email", dataIndex: "email", key: "email", width: 250 },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone", width: 150 },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => (
        <Tag
          color={
            status === "Hoạt động" ? "blue" : status === "Mới" ? "gold" : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginLeft: "270px" }}>
        <Topbar title="Danh sách khách hàng" />
      </div>
      <div className="customer-page">
        {/* Header */}
        <header className="customer-header">
          <div className="header-actions">
            <Input.Search
              placeholder="Tìm kiếm khách hàng..."
              value={params.search}
              onChange={(e) => handleChange("search", e.target.value)}
            />
            <Button
              type="primary"
              icon={<ExportOutlined />}
              className="export-button"
            >
              Xuất file
            </Button>
          </div>
        </header>

        {/* Filters */}
        <div className="filter-section">
          <div className="filter-buttons">
            {["Tất cả trạng thái", "Hoạt động", "Mới", "Đã khóa"].map(
              (status) => (
                <Button
                  key={status}
                  type={params.status === status ? "primary" : "default"}
                  onClick={() => handleChange("status", status)}
                  className={params.status === status ? "active" : ""}
                  style={{ margin: 5 }}
                >
                  {status}
                </Button>
              )
            )}
          </div>
          <div className="filter-buttons">
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              disabled={params.selectedRowKeys.length === 0}
              onClick={() => handleChange("isDeleteModalVisible", true)}
              className="delete-all-button"
            >
              Xóa đã chọn
            </Button>
          </div>
        </div>

        {/* Table */}
        <Table
          rowSelection={{
            selectedRowKeys: params.selectedRowKeys,
            onChange: (keys) => handleChange("selectedRowKeys", keys),
          }}
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          style={{ marginTop: 20 }}
          onRow={(record) => ({
            onClick: () => navigate(`/customer-detail/${record.id}`),
          })}
        />

        {/* Delete Confirmation Modal */}
        <Modal
          title="Xác nhận xóa"
          visible={params.isDeleteModalVisible}
          onOk={handleDeleteSelected}
          onCancel={() => handleChange("isDeleteModalVisible", false)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <p>Bạn có chắc chắn muốn xóa khách hàng đã chọn?</p>
        </Modal>
      </div>
    </div>
  );
};

export default CustomerList;
