import React, { useState } from "react";
import "./DetailCustomer.css";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import avatar from "../../assets/customer1.jpg";
import {
  CopyOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  MenuOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, DatePicker } from "antd";

const CustomerDetail = () => {
  const [form] = Form.useForm();

  const initData = {
    id: "ID-011221",
    email: "lindablair@gmail.com",
    address: "1833 Bel Meadow Drive, Fontana, California 92335, USA",
    phone: "050 414 8778",
    lastActive: "1 ngày trước",
    name: "Linda Blair",
    status: "Hoạt động",
  };

  const orders = [
    {
      id: "302002",
      product: "Nhẫn Kim cương Vàng",
      extra: "+3 sản phẩm khác",
      total: "$121.00",
      status: "Đang xử lý",
      date: "12 Dec 2023",
      statusClass: "processing",
    },
    {
      id: "301901",
      product: "Nhẫn Kim cương Vàng",
      extra: "+3 sản phẩm khác",
      total: "$590.00",
      status: "Đang xử lý",
      date: "1 Dec 2023",
      statusClass: "processing",
    },
    {
      id: "301900",
      product: "Nhẫn Kim cương Vàng",
      extra: "",
      total: "$125.00",
      status: "Hoàn thành",
      date: "10 Nov 2023",
      statusClass: "completed",
    },
    {
      id: "301881",
      product: "Nhẫn Kim cương Vàng",
      extra: "+3 sản phẩm khác",
      total: "$348.00",
      status: "Hoàn thành",
      date: "2 Nov 2023",
      statusClass: "completed",
    },
    {
      id: "301643",
      product: "Nhẫn Kim cương Vàng",
      extra: "",
      total: "$607.00",
      status: "Hoàn thành",
      date: "7 Sep 2023",
      statusClass: "completed",
    },
  ];

  const [state, setState] = useState({
    customerData: initData,
    filters: {
      date: null,
      dateString: "",
    },
    filteredOrders: orders,
  });

  const handleChange = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyDateFilter = () => {
    const { dateString } = state.filters;
    const filtered = dateString
      ? orders.filter((order) => order.date === dateString)
      : orders;
    handleChange("filteredOrders", filtered);
  };

  // Hàm xử lý gửi thông tin
  const handleSubmit = (values) => {
    console.log("Updated Values:", values);
    alert("Cập nhật thông tin khách hàng thành công.");
  };

  const [isChanged, setIsChanged] = useState(false);
  const handleFormChange = () => {
    setIsChanged(true); // Đánh dấu form đã thay đổi
  };

  return (
    <div>
      <div style={{ marginLeft: "270px" }}>
        <Topbar title="Thông tin chi tiết khách hàng" />
      </div>

      <div className="customer-detail">
        <div className="customer-info">
          <div className="left-section">
            <div className="avatar-placeholder">
              <img src={avatar} alt="avatar-customer" />
            </div>
            <h2 className="customer-name">{state.customerData.name}</h2>
            <span className="status active">{state.customerData.status}</span>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={state.customerData}
              onValuesChange={() => setIsChanged(true)}
            >
              <Form.Item name="id" label="Mã khách hàng">
                <Input prefix={<CopyOutlined />} disabled />
              </Form.Item>

              <Form.Item name="email" label="E-mail">
                <Input
                  prefix={<MailOutlined />}
                  value={state.customerData.email}
                  onChange={(e) =>
                    handleChange("customerData", {
                      ...state.customerData,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Item>

              <Form.Item name="address" label="Địa chỉ">
                <Input
                  prefix={<EnvironmentOutlined />}
                  value={state.customerData.address}
                  onChange={(e) =>
                    handleChange("customerData", {
                      ...state.customerData,
                      address: e.target.value,
                    })
                  }
                />
              </Form.Item>

              <Form.Item name="phone" label="Số điện thoại">
                <Input
                  prefix={<PhoneOutlined />}
                  value={state.customerData.phone}
                  onChange={(e) =>
                    handleChange("customerData", {
                      ...state.customerData,
                      phone: e.target.value,
                    })
                  }
                />
              </Form.Item>

              <Form.Item name="lastActive" label="Hoạt động gần nhất">
                <Input
                  prefix={<ClockCircleOutlined />}
                  disabled
                  value={state.customerData.lastActive}
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={`save-button ${isChanged ? "" : "disabled-button"}`}
              >
                Cập nhật
              </Button>
            </Form>
          </div>
        </div>

        <div className="customer-container">
          {/* Right Section */}
          <div className="customer-stats">
            {/* Card 1: Chi tiêu */}
            <div className="stat-card">
              <div className="header">
                <div className="icon-wrapper">
                  <ClockCircleOutlined className="icon" />
                </div>
              </div>
              <div>
                <div className="stat-title">Chi tiêu</div>
                <div className="stat-value">120.000.000 đồng</div>
              </div>
            </div>

            {/* Card 2: Điểm */}
            <div className="stat-card">
              <div className="header">
                <div className="icon-wrapper">
                  <ShoppingCartOutlined className="icon" />
                </div>
              </div>
              <div>
                <div className="stat-title">Điểm thưởng</div>
                <div className="stat-value">12.000</div>
              </div>
            </div>

            {/* Card 3: Tổng đơn hàng */}
            <div className="stat-card">
              <div className="header">
                <div className="icon-wrapper">
                  <ShoppingOutlined className="icon" />
                </div>
              </div>
              <div className="stat-summary">
                <div className="summary-item">
                  <strong>10</strong>
                  <span>Tổng đơn hàng</span>
                </div>
                <div className="summary-item">
                  <strong>2</strong>
                  <span>Đang xử lý</span>
                </div>
                <div className="summary-item">
                  <strong>8</strong>
                  <span>Hoàn thành</span>
                </div>
                <div className="summary-item">
                  <strong>0</strong>
                  <span>Đơn hủy</span>
                </div>
              </div>
            </div>

            {/* Card 4: Đơn hủy và lỗi */}
            <div className="stat-card">
              <div className="header">
                <div className="icon-wrapper">
                  <ShoppingOutlined className="icon" />
                </div>
              </div>
              <div className="stat-summary">
                <div className="summary-item">
                  <strong>0</strong>
                  <span>Số đơn hủy</span>
                </div>
                <div className="summary-item">
                  <strong>0</strong>
                  <span>Hoàn hàng</span>
                </div>
                <div className="summary-item">
                  <strong>0</strong>
                  <span>Hư hại</span>
                </div>
                <div className="summary-item">
                  <strong>0</strong>
                  <span>Báo cáo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase History */}
          <div className="purchase-history">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Lịch sử mua hàng</h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <DatePicker
                  placeholder="Chọn ngày"
                  style={{ width: 150, marginRight: "10px" }}
                  onChange={(date, dateString) =>
                    handleChange("filters", {
                      ...state.filters,
                      date,
                      dateString,
                    })
                  }
                />
                <Button
                  type="primary"
                  onClick={applyDateFilter}
                  icon={<MenuOutlined />}
                  style={{ backgroundColor: "#091057" }}
                />
              </div>
            </div>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Mã đơn hàng</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Tình trạng</th>
                  <th>Ngày đặt hàng</th>
                </tr>
              </thead>
              <tbody>
                {state.filteredOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="order-id">{order.id}</td>
                    <td>
                      {order.product}{" "}
                      <span className="extra">{order.extra}</span>
                    </td>
                    <td>{order.total}</td>
                    <td className={`status ${order.statusClass}`}>
                      {order.status}
                    </td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
