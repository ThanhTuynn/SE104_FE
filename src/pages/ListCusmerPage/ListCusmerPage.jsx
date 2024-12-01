import React, { useState } from "react";
import { Switch, Input, Button, Pagination, Tag, Modal, Form, Select, Checkbox } from "antd";
import { ExportOutlined, PlusOutlined, MenuOutlined, DeleteOutlined } from "@ant-design/icons";
import "./ListCusmerPage.css";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import customer1 from "../../assets/avatar_customer/customer1.jpg";
import customer2 from "../../assets/avatar_customer/customer2.jpg";
import customer3 from "../../assets/avatar_customer/customer3.jpg";
import customer4 from "../../assets/avatar_customer/customer4.jpg";

const { Option } = Select;

const CustomerList = () => {
  // Dữ liệu khách hàng mẫu
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Bushmill",
      status: "Hoạt động",
      email: "john@example.com",
      phone: "123-456-7890",
      avatar: customer1,
    },
    {
      id: 2,
      name: "Laura Prichett",
      status: "Hoạt động",
      email: "laura@example.com",
      phone: "234-567-8901",
      avatar: customer2,
    },
    {
      id: 3,
      name: "Mohammad Karim",
      status: "Đã khóa",
      email: "mohammad@example.com",
      phone: "345-678-9012",
      avatar: customer3,
    },
    {
      id: 4,
      name: "Sarah Connor",
      status: "Hoạt động",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer4,
    },
    {
      id: 5,
      name: "Sarah Connor",
      status: "Hoạt động",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer4,
    },
    {
      id: 6,
      name: "John Bushmill",
      status: "Hoạt động",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer1,
    },
    {
      id: 7,
      name: "Laura Prichett",
      status: "Hoạt động",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer2,
    },
    {
      id: 8,
      name: "Mohammad Karim",
      status: "Đã khóa",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer3,
    },
    {
      id: 9,
      name: "Sarah Connor",
      status: "Hoạt động",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer4,
    },
    {
      id: 10,
      name: "Sarah Connor",
      status: "Hoạt động",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer4,
    },
    {
      id: 11,
      name: "Sarah Connor",
      status: "Hoạt động",
      email: "sarah@example.com",
      phone: "456-789-0123",
      avatar: customer4,
    },
    {
        id: 12,
        name: "Sarah Connor",
        status: "Hoạt động",
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
    statusType: "All status",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const handleStatusTypeChange = (type) => {
    setFilters((prev) => ({ ...prev, statusType: type }));
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

  // Xử lý thêm khách hàng
  const handleAddCustomer = (values) => {
    const newCustomer = {
      id: customers.length + 1,
      name: values.name,
      status: values.status, 
      email: values.email, 
      phone: values.phone,
      avatar: customer1,
    };

    setCustomers([...customers, newCustomer]);
    handleCancel(); // Đóng modal sau khi thêm
  };

  // Dữ liệu hiển thị theo trang và lọc
  const filteredCustomers = customers.filter((customer) => {
    const statusMatch =
      filters.statusType === "All status" || customer.status === filters.statusType;
    return statusMatch;
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
    alert(`Đã chọn ${selectedCustomers.length} khách hàng`);
    setSelectedCustomers([]); 
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCustomers(paginatedCustomers.map((customer) => customer.id)); // Chọn tất cả khách hàng trong trang hiện tại
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
        <Topbar title="Danh sách khách hàng" />
      </div>

      <div className="customer-page">
        {/* Header */}
        <header className="customer-header">
          <div className="header-actions">
            <Input.Search
              placeholder="Tìm kiếm khách hàng..."
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
              Thêm khách hàng
            </Button>
          </div>
        </header>

        {/* Bộ lọc */}
        <div className="filter-section">
          <div className="filter-buttons">
            {["All status", "Hoạt động", "Đã khóa"].map((type) => (
              <Button
                key={type}
                onClick={() => handleStatusTypeChange(type)}
                className={`filter-btn ${
                  filters.statusType === type ? "active" : ""
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

        {/* Danh sách khách hàng dạng thẻ */}
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
                <Tag color={customer.status === "Hoạt động" ? "blue" : "red"}>
                  {customer.status}
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

      {/* Modal Thêm khách hàng */}
      <Modal
        title="Thêm khách hàng mới"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <h3>Thông tin khách hàng</h3>
        <Form form={form} layout="vertical" onFinish={handleAddCustomer}>
          <Form.Item
            label="Tên khách hàng"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}
          >
            <Input placeholder="Nhập tên khách hàng..." />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email khách hàng..." />
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
                Thêm khách hàng
                </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerList;
