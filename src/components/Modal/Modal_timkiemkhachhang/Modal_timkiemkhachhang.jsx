import React, { useState, useMemo } from "react";
import { Modal, Button, Input, List, Avatar } from "antd";
import "./Modal_timkiemkhachhang.css";

const CustomerSearchModal = ({ isVisible, onCancel, onConfirm, customers = [],title }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Lọc danh sách khách hàng theo từ khóa tìm kiếm
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [customers, searchValue]);

  // Hàm xử lý xác nhận khách hàng
  const handleOk = () => {
    if (selectedCustomer) {
      onConfirm(selectedCustomer);
    }
  };

  return (
    <Modal
      title={title}
      visible={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="confirm"
          type="primary"
          onClick={handleOk}
          disabled={!selectedCustomer}
        >
          Hoàn tất chọn
        </Button>,
      ]}
      centered
      className="customer-search-modal"
    >
      <div className="search-container">
        <Input
          placeholder="Tìm kiếm sản phẩm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
        />
        <Button type="primary" className="search-button">
          Tìm kiếm
        </Button>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={filteredCustomers}
        renderItem={(item) => (
          <List.Item
            onClick={() => setSelectedCustomer(item)}
            className={`list-item ${
              selectedCustomer?.id === item.id ? "selected" : ""
            }`}
          >
            <List.Item.Meta
              avatar={<Avatar>{item.name.charAt(0)}</Avatar>}
              title={item.name}
              description={`Số điện thoại: ${item.phone}`}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default CustomerSearchModal;
