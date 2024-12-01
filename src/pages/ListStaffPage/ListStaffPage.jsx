import React, { useState } from "react";
import { Switch, Input, Button, Pagination, Tag, Modal, Form, Select, Checkbox } from "antd";
import { ExportOutlined, PlusOutlined, MenuOutlined, DeleteOutlined } from "@ant-design/icons";
import "./ListStaffPage.css";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import customer1 from "../../assets/avatar_customer/customer1.jpg";
import customer2 from "../../assets/avatar_customer/customer2.jpg";
import customer3 from "../../assets/avatar_customer/customer3.jpg";
import customer4 from "../../assets/avatar_customer/customer4.jpg";

const { Option } = Select;

const StaffList = () => {
  // Dữ liệu nhân viên mẫu
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Bushmill",
      role: "Quản lý",
      email: "john@example.com",
      phone: "123-456-7890",
      avatar: customer1,
    },
    {
      id: 2,
      name: "Laura Prichett",
      role: "Quản lý",
      email: "laura@example.com",
      phone: "234-567-8901",
      avatar: customer2,
    },
    {
      id: 3,
      name: "Mohammad Karim",
      role: "Nhân viên",
      email: "mohammad@example.com",
      phone: "345-678-9012",
      avatar: customer3,
    },
    {
      id: 4,
      name: "Sarah Connor",
      role: "Nhân viên",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer4,
    },
    {
      id: 5,
      name: "Sarah Connor",
      role: "Nhân viên",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer4,
    },
    {
      id: 6,
      name: "John Bushmill",
      role: "Nhân viên",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer1,
    },
    {
      id: 7,
      name: "Laura Prichett",
      role: "Nhân viên",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer2,
    },
    {
      id: 8,
      name: "Mohammad Karim",
      role: "Nhân viên",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer3,
    },
    {
      id: 9,
      name: "Sarah Connor",
      role: "Nhân viên",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer4,
    },
    {
      id: 10,
      name: "Sarah Connor",
      role: "Quản lý",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer4,
    },
    {
      id: 11,
      name: "Sarah Connor",
      role: "Nhân viên",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer4,
    },
    {
        id: 12,
        name: "Sarah Connor",
        role: "Nhân viên",
        email: "sarah@example.com",
        phone: "456-789-0123",
        avatar: customer4,
      },
  ]);

  // State modal và form
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [form] = Form.useForm();

  // Bộ lọc
  const [filters, setFilters] = useState({
    roleType: "All role",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const handleRoleTypeChange = (type) => {
    setFilters((prev) => ({ ...prev, roleType: type }));
  };

  // Xử lý hiển thị modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Xử lý đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setShowAddressFields(false);
  };

  // Xử lý thêm nhân viên
  const handleAddCustomer = (values) => {
    const newCustomer = {
      id: customers.length + 1,
      name: values.name,
      role: values.role, 
      email: values.email, 
      phone: values.phone,
      avatar: customer1,
    };

    setCustomers([...customers, newCustomer]);
    handleCancel(); // Đóng modal sau khi thêm
  };

  // Dữ liệu hiển thị theo trang và lọc
  const filteredCustomers = customers.filter((customer) => {
    const roleMatch =
      filters.roleType === "All role" || customer.role === filters.roleType; 
    return roleMatch;
  });

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCheckboxChange = (customerId) => {
    setSelectedCustomers((prevSelected) => {
      if (prevSelected.includes(customerId)) {
        return prevSelected.filter((id) => id !== customerId);
      } else {
        return [...prevSelected, customerId];
      }
    });
  };

  const handleDeleteSelected = () => {
    alert(`Đã chọn ${selectedCustomers.length} nhân viên`);
    setSelectedCustomers([]); 
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCustomers(paginatedCustomers.map((customer) => customer.id)); // Chọn tất cả nhân viên trong trang hiện tại
    } else {
      setSelectedCustomers([]); // Bỏ chọn tất cả
    }
  };

  // Xử lý chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Thanh tiêu đề */}
      <div style={{ marginLeft: "270px" }}>
        <Topbar title="Danh sách nhân viên" />
      </div>

      <div className="customer-page">
        {/* Header */}
        <header className="customer-header">
          <div className="header-actions">
            <Input.Search
              placeholder="Tìm kiếm nhân viên..."
              style={{ width: 800 }}
            />
            <Button
              type="primary"
              className="export-button"
              icon={<ExportOutlined />}
            >
              Xuất file
            </Button>
            <Button
              type="primary"
              className="add-order-button"
              icon={<PlusOutlined />}
              onClick={showModal}
            >
              Thêm nhân viên
            </Button>
          </div>
        </header>

        {/* Bộ lọc */}
        <div className="filter-section">
          <div className="filter-buttons">
            {["All role", "Quản lý", "Nhân viên"].map((type) => (
              <Button
                key={type}
                onClick={() => handleRoleTypeChange(type)}
                className={`filter-btn ${
                  filters.roleType === type ? "active" : ""
                }`}
              >
                {type}
              </Button>
            ))}
          </div>
          <div className="filter-buttons">
            <Button
              type="primary"
              icon={<MenuOutlined />}
              className="filter-toggle-button"
            >
              Bộ lọc
            </Button>
            <Checkbox onChange={handleSelectAll} style={{ marginRight: 10, marginLeft: '10px' }}>
            </Checkbox>
            <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={handleDeleteSelected}
            disabled={selectedCustomers.length === 0}
            className="delete-all-button"
          >
            Xóa tất cả
          </Button>
          </div>
        </div>

        {/* Danh sách nhân viên dạng thẻ */}
        <div className="customer-grid">
          {paginatedCustomers.map((customer) => (
            <div className="customer-card" key={customer.id} style={{position: 'relative'}}>
                 <Checkbox
                checked={selectedCustomers.includes(customer.id)}
                onChange={() => handleCheckboxChange(customer.id)}
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  zIndex: 1,
                }}
              />
                <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    style={{
                    position: "absolute",
                    top: '10px',
                    right: "10px",
                    zIndex: 1, 
                    color: 'red',
                    }}
                >
                </Button>
              {/* Phần avatar */}
              <div className="card-avatar">
                <img
                  src={customer.avatar}
                  alt={`${customer.name}'s avatar`}
                  className="avatar-image"
                />
              </div>

              {/* Thông tin chi tiết */}
              <div className="card-details">
                <h3>{customer.name}</h3>
                <Tag color={customer.role === "Quản lý" ? "blue" : "red"}>
                  {customer.role}
                </Tag>
                <div className="info-row">
                    <p style={{ fontWeight: "bold" }}>Email:</p>
                    <p>{customer.email}</p>
                    <p style={{ fontWeight: "bold" }}>Số điện thoại:</p>
                    <p>{customer.phone}</p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredCustomers.length}
          onChange={handlePageChange}
          style={{ textAlign: "center", marginTop: "20px" }}
        />
      </div>

      {/* Modal Thêm nhân viên*/}
      <Modal
        title="Thêm nhân viên mới"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <h3>Thông tin nhân viên</h3>
        <Form form={form} layout="vertical" onFinish={handleAddCustomer}>
          <Form.Item
            label="Tên nhân viên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên nhân viên" }]}
          >
            <Input placeholder="Nhập tên nhân viên..." />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email nhân viên..." />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input placeholder="Nhập số điện thoại..." />
          </Form.Item>
         
          <div style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
          <Switch
            checked={showAddressFields}
            onChange={(checked) => setShowAddressFields(checked)}
          />
          <span style={{ marginLeft: 8 }}>Thêm địa chỉ</span>
        </div>
          {showAddressFields && (
            <>
              <Form.Item name="street">
                <Input placeholder="Số nhà, đường..." />
              </Form.Item>
              <Form.Item name="district">
                <Input placeholder="Quận, Huyện..." />
              </Form.Item>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px'}}>
                <Form.Item name="city" style={{width: '100%'}}>
                  <Input placeholder="Tỉnh..." />
                </Form.Item>
                <Form.Item name="country" style={{width: '100%'}}>
                  <Select placeholder="Quốc gia">
                    <Option value="Vietnam">Việt Nam</Option>
                    <Option value="USA">Hoa Kỳ</Option>
                    <Option value="Japan">Nhật Bản</Option>
                  </Select>
                </Form.Item>
              </div>
            </>
          )}
          <div className="form-footer">
            <Form.Item layout = 'vertical' style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                <Button
                htmlType="reset"
                className="cancel-button"
                onClick={handleCancel}
                >
                Hủy
                </Button>
                <Button
                type="primary"
                htmlType="submit"
                className="create-button"
                >
                Thêm nhân viên
                </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffList;
