import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Checkbox, Input, Table } from "antd";
import "./Modal_timkiemdichvu.css";

const ServiceModal = ({ isVisible, onCancel, onConfirm, services = [] }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [quantities, setQuantities] = useState({});

  // Reset states when modal closes
  useEffect(() => {
    if (!isVisible) {
      setSelectedServices([]);
      setQuantities({});
      setSearchValue("");
    }
  }, [isVisible]);

  // Filter services based on search
  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      service.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [services, searchValue]);

  // Handle quantity updates
  const updateQuantity = (serviceId, change) => {
    setQuantities(prev => ({
      ...prev,
      [serviceId]: Math.max(1, (prev[serviceId] || 1) + change)
    }));
  };

  // Handle service selection
  const handleSelect = (record) => {
    setSelectedServices(prev => {
      const isSelected = prev.some(s => s.id === record.id);
      if (isSelected) {
        return prev.filter(s => s.id !== record.id);
      } else {
        return [...prev, record];
      }
    });

    // Initialize quantity if not exists
    if (!quantities[record.id]) {
      setQuantities(prev => ({
        ...prev,
        [record.id]: 1
      }));
    }
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: "15%",
      render: (image) => (
        <img
          src={image || "https://via.placeholder.com/40"}
          alt="Dịch vụ"
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      ),
    },
    {
      title: "Dịch vụ",
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "15%",
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(record.id, -1);
            }}
            disabled={!selectedServices.some(s => s.id === record.id)}
          >
            -
          </Button>
          <span>{quantities[record.id] || 1}</span>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(record.id, 1);
            }}
            disabled={!selectedServices.some(s => s.id === record.id)}
          >
            +
          </Button>
        </div>
      ),
    },
    {
      title: "Giá (VND)",
      dataIndex: "price",
      key: "price",
      render: (price) => price.toLocaleString(),
    },
    {
      title: "",
      key: "select",
      render: (_, record) => (
        <Checkbox
          checked={selectedServices.some(s => s.id === record.id)}
          onChange={() => handleSelect(record)}
        >
          Chọn
        </Checkbox>
      ),
    },
  ];

  const handleOk = () => {
    const servicesWithQuantities = selectedServices.map(service => ({
      ...service,
      quantity: quantities[service.id] || 1,
      total: (service.price * (quantities[service.id] || 1)).toLocaleString() + ' VND'
    }));
    onConfirm(servicesWithQuantities);
  };

  return (
    <Modal
      title="Tìm kiếm dịch vụ"
      open={isVisible}
      onCancel={onCancel}
      footer={[
        <Button 
          key="cancel" 
          onClick={onCancel}
          style={{ borderRadius: '8px' }}
        >
          Hủy
        </Button>,
        <Button 
          key="confirm" 
          type="primary" 
          onClick={handleOk}
          style={{ borderRadius: '8px' }}
        >
          Hoàn tất chọn
        </Button>,
      ]}
      centered
      className="service-modal"
    >
      <Input
        placeholder="Tìm kiếm dịch vụ"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{
          marginBottom: "16px",
          padding: "8px",
          borderRadius: "4px",
        }}
      />
      <Table
        dataSource={filteredServices}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
      />
    </Modal>
  );
};

export default ServiceModal;