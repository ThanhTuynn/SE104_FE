import React, { useState } from "react";
import { Table, Button, Input, DatePicker, Select, Checkbox } from "antd";
import { ExportOutlined, MenuOutlined, DeleteOutlined } from "@ant-design/icons";
import Topbar from '../../components/TopbarComponent/TopbarComponent';
import './OrderProductPage.css';

const { Option } = Select;

const OrderProduct = () => {
  const [filters, setFilters] = useState({
    orderType: 'All order',
    date: null,
    dateString: '',
  });

  const [expandedRows, setExpandedRows] = useState({});
  const [selectedOrders, setSelectedOrders] = useState([]);
  
  const handleActionChange = (id, newAction) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, action: newAction };
      }
      return item;
    });
    setData(updatedData);
  };

  const [data, setData] = useState([
    {
      id: "302012",
      products: ["Nhẫn Kim Cương Vàng", "Dây chuyền Bạc"],
      date: "29 Dec 2022",
      customer: "John Bushmill",
      total: "13,000,000",
      payment: "Mastercard",
      action: "Xác nhận",
    },
    {
      id: "302011",
      products: ["Nhẫn Cưới Vàng", "Vòng Tay Kim Cương"],
      date: "24 Dec 2022",
      customer: "Linda Blair",
      total: "10,000,000",
      payment: "Visa",
      action: "Hủy",
    },
    {
      id: "301901",
      products: ["Lắc Tay Bạc"],
      date: "12 Dec 2022",
      customer: "M Karim",
      total: "5,000,000",
      payment: "Mastercard",
      action: "Xác nhận",
    },
  ]);

  const filteredData = data.filter((item) => {
    return (
      (filters.orderType === 'All order' || item.action === filters.orderType) &&
      (filters.dateString ? item.date.includes(filters.dateString) : true)
    );
  });

  const toggleExpandRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(filteredData.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (id) => {
    setSelectedOrders((prev) => 
      prev.includes(id) ? prev.filter((orderId) => orderId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setData((prev) => prev.filter((item) => !selectedOrders.includes(item.id)));
    setSelectedOrders([]); // Reset selected orders after deletion
  };

  const columns = [
    {
      title: <Checkbox onChange={handleSelectAll} checked={filteredData.length > 0 && selectedOrders.length === filteredData.length} />,
      dataIndex: "select",
      key: "select",
      render: (text, record) => (
        <Checkbox
          checked={selectedOrders.includes(record.id)}
          onChange={() => handleSelectOrder(record.id)}
        />
      ),
    },
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Sản phẩm",
      dataIndex: "products",
      key: "products",
      render: (products, record) => {
        const isExpanded = expandedRows[record.id];
        const displayedProducts = isExpanded ? products : products.slice(0, 1);
        return (
          <>
            <ul>
              {displayedProducts.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
            {products.length > 1 && (
              <Button
                type="link"
                onClick={() => toggleExpandRow(record.id)}
                style={{ padding: 0, color: '#E87428' }}
              >
                {isExpanded ? "Thu gọn" : "Xem thêm"}
              </Button>
            )}
          </>
        );
      },
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Hình thức",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Xử lý",
      dataIndex: "action",
      key: "action",
      render: (action, record) => {
        const actionStyle = action === 'Xác nhận' ? { color: 'blue' } : action === 'Hủy' ? { color: 'red' } : { color: 'gray' };
        
        return (
          <Select
            value={action}
            onChange={(value) => handleActionChange(record.id, value)}
            style={{ width: "120px", ...actionStyle }}
          >
            <Option value="Xác nhận" style={{ color: 'blue' }}>Xác nhận</Option>
            <Option value="Hủy" style={{ color: 'red' }}>Hủy</Option>
          </Select>
        );
      },
    },
  ];

  const handleOrderTypeChange = (type) => {
    setFilters((prev) => ({
      ...prev,
      orderType: type,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setFilters((prev) => ({
      ...prev,
      date: date,
      dateString: dateString,
    }));
  };

  return (
    <div className="order-page">
      <div style={{ marginLeft: '270px' }}>
        <Topbar title="Quản lý đơn hàng" />
      </div>
      <div className="order-table-container">
        <header className="order-header">
          <div className="header-actions">
            <Input.Search placeholder="Tìm kiếm đơn hàng..." style={{ width: 840 }} />
            <Button type="primary" className="export-button" icon={<ExportOutlined />}>Xuất file</Button>
            <Button
              type="primary"
              className="delete-all-button"
              icon={<DeleteOutlined />}
              onClick={handleDeleteSelected}
              disabled={selectedOrders.length === 0}
            >
              Xóa tất cả
            </Button>
            <div className="filter-section">
              <Button onClick={() => handleOrderTypeChange('All order')} className={`filter-btn ${filters.orderType === 'All order' ? 'active' : ''}`}>
                All order
              </Button>
              <Button onClick={() => handleOrderTypeChange('Xác nhận')} className={`filter-btn ${filters.orderType === 'Xác nhận' ? 'active' : ''}`}>
                Xác nhận
              </Button>
              <Button onClick={() => handleOrderTypeChange('Hủy')} className={`filter-btn ${filters.orderType === 'Hủy' ? 'active' : ''}`}>
                Hủy
              </Button>
              <div>
                <DatePicker
                  placeholder="Chọn ngày"
                  style={{ width: 120, marginRight: '10px' }}
                  onChange={handleDateChange}
                />
                <Button
                  type="primary"
                  icon={<MenuOutlined />}
                  className="filter-toggle-button"
                >
                  Bộ lọc
                </Button>
              </div>
            </div>
          </div>
        </header>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default OrderProduct;
