import React, { useState, useMemo } from "react";
import { Table, Button, Input, DatePicker, Modal } from "antd";
import { ExportOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import "./ImportProduct.css";

const initData = () => [
  {
    id: "1",
    products: {
      name: "Dầu gội trị viêm da cho thú cưng",
      otherProducts: [
        "Dầu dưỡng trị viêm da cho thú cưng",
        "Dầu gội trị viêm nấm cho thú cưng",
      ],
    },
    date: "29 Dec 2022",
    customer: "John Bushmill",
    total: "13,000,000",
    payment: "Mastercard",
    action: "Đang xử lý",
  },
  {
    id: "2",
    products: {
      name: "Vòng Tay Kim Cương",
      otherProducts: [
        "Dầu dưỡng trị viêm da cho thú cưng",
        "Dầu gội trị viêm nấm cho thú cưng",
      ],
    },
    date: "24 Dec 2022",
    customer: "Linda Blair",
    total: "10,000,000",
    payment: "Visa",
    action: "Đã hủy",
  },
  {
    id: "3",
    products: {
      name: "Lắc Tay Bạc",
      otherProducts: [],
    },
    date: "12 Dec 2022",
    customer: "M Karim",
    total: "5,000,000",
    payment: "Mastercard",
    action: "Đã giao",
  },
  {
    id: "4",
    products: {
      name: "Lắc Tay Bạc",
      otherProducts: [],
    },
    date: "12 Dec 2022",
    customer: "M Karim",
    total: "5,000,000",
    payment: "Mastercard",
    action: "Đã giao",
  },
  {
    id: "5",
    products: {
      name: "Lắc Tay Bạc",
      otherProducts: [],
    },
    date: "12 Dec 2022",
    customer: "M Karim",
    total: "5,000,000",
    payment: "Mastercard",
    action: "Đã hủy",
  },
];

const ImportProduct = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    filters: {
      orderType: "Tất cả phiếu mua hàng",
      date: null,
      dateString: "",
      searchQuery: "",
    },
    selectedOrders: [],
    data: initData(),
    isModalVisible: false,
    isAddModalVisible: false, // Thêm trạng thái cho modal "Thêm sản phẩm"
  });

  const handleChange = (key, value) => {
    setState((prev) => {
      const updatedState = { ...prev };
      if (key in prev.filters) {
        updatedState.filters[key] = value;
      } else {
        updatedState[key] = value;
      }
      return updatedState;
    });
  };

  const filteredData = useMemo(() => {
    const { orderType, dateString, searchQuery } = state.filters;
    return state.data.filter((item) => {
      const matchesSearchQuery = item.products.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return (
        (orderType === "Tất cả phiếu mua hàng" || item.action === orderType) &&
        (dateString ? item.date.includes(dateString) : true) &&
        matchesSearchQuery
      );
    });
  }, [state.data, state.filters]);

  const handleConfirmDelete = () => {
    const remainingOrders = state.data.filter(
      (order) => !state.selectedOrders.includes(order.id)
    );
    setState((prev) => ({
      ...prev,
      data: remainingOrders,
      selectedOrders: [],
      isModalVisible: false,
    }));
    alert("Đã xóa phiếu mua hàng đã chọn.");
  };

  const handleRowClick = (record) => {
    navigate(`/import-product-detail/${record.id}`);
  };

  const handleAddProduct = () => {
    // Thêm logic để xử lý thêm phiếu mua hàng (hiện tại chỉ đóng modal)
    alert("Thêm phiếu mua hàng thành công!");
    setState((prev) => ({
      ...prev,
      isAddModalVisible: false,
    }));
  };

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Sản phẩm",
      dataIndex: "products",
      key: "products",
      render: (products) => {
        const { name, otherProducts } = products;
        const remainingCount = otherProducts.length;

        return (
          <div>
            <span>{name}</span>
            {remainingCount > 0 && (
              <span style={{ color: "#888", marginLeft: 8 }}>
                +{remainingCount} sản phẩm khác
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Hình thức",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Xử lý",
      dataIndex: "action",
      key: "action",
      render: (action) => {
        const actionStyle = {
          "Đang xử lý": { color: "#E8A300", backgroundColor: "#feedc7" },
          "Đã giao": { color: "green", backgroundColor: "rgb(224, 251, 224)" },
          "Đã hủy": { color: "red", backgroundColor: "rgb(255, 236, 236)" },
        };

        return (
          <Button
            style={{
              ...actionStyle[action],
              cursor: "default",
            }}
            disabled
          >
            {action}
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ marginLeft: "270px" }}>
        <Topbar title="Quản lý phiếu mua hàng" />
      </div>

      <div className="order-table-container">
        <header className="order-header">
          <div className="header-actions">
            <Input.Search
              placeholder="Tìm kiếm phiếu mua hàng..."
              onSearch={(value) => handleChange("searchQuery", value)}
              onChange={(e) => handleChange("searchQuery", e.target.value)}
              value={state.filters.searchQuery}
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
              icon={<PlusOutlined />}
              className="add-product-button"
              onClick={() => handleChange("isAddModalVisible", true)}
            >
              Thêm phiếu mua hàng
            </Button>
          </div>
        </header>

        {/* Filter */}
        <div className="filter-section">
          <div className="filter-button">
            {["Tất cả phiếu mua hàng", "Đang xử lý", "Đã giao", "Đã hủy"].map((type) => (
              <Button
                key={type}
                onClick={() => handleChange("orderType", type)}
                className={`filter-btn ${
                  state.filters.orderType === type ? "active" : ""
                }`}
              >
                {type}
              </Button>
            ))}
          </div>
          <div className="filter-button">
            <DatePicker
              placeholder="Chọn ngày"
              onChange={(date, dateString) => {
                handleChange("date", date);
                handleChange("dateString", dateString);
              }}
              format="DD/MM/YYYY"
              value={state.filters.date}
            />
          
          <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              disabled={state.selectedOrders.length === 0}
              onClick={() => handleChange("isModalVisible", true)}
              className="delete-all-button"
            >
              Xóa đã chọn
            </Button>
            </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          rowSelection={{
            selectedRowKeys: state.selectedOrders,
            onChange: (selectedRowKeys) =>
              handleChange("selectedOrders", selectedRowKeys),
          }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{ pageSize: 5 }}
        />

        {/* Delete Modal */}
        <Modal
          title="Xác nhận xóa"
          visible={state.isModalVisible}
          onOk={handleConfirmDelete}
          onCancel={() => handleChange("isModalVisible", false)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <p>Bạn có chắc chắn muốn xóa những phiếu mua hàng đã chọn?</p>
        </Modal>

        {/* Add Product Modal */}
        <Modal
          title="Thêm sản phẩm"
          visible={state.isAddModalVisible}
          onOk={handleAddProduct}
          onCancel={() => handleChange("isAddModalVisible", false)}
          okText="Thêm"
          cancelText="Hủy"
        >
          <p>Form thêm sản phẩm sẽ hiển thị tại đây.</p>
        </Modal>
      </div>
    </div>
  );
};

export default ImportProduct;
