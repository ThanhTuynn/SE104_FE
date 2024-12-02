import React, { useState } from "react";
import { Modal, Input, Table, Button } from "antd";

const ProductSearchModal = ({ isVisible, onCancel, onConfirm, products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => {
      const currentQty = prev[productId] || 1;
      const newQty = Math.max(1, currentQty + change);
      return { ...prev, [productId]: newQty };
    });
  };
  return (
    <div className="modal-for-product">
    <Modal
      title="Chọn sản phẩm"
      visible={isVisible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Input.Search
        placeholder="Tìm kiếm sản phẩm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", marginBottom: 16 }}
      />
      <Table
        columns={[
          {
            title: 'Hình ảnh',
            dataIndex: 'image',
            width: '130px',
            render: (image) => (
              <img
                src={image || "https://via.placeholder.com/40"}
                alt="Sản phẩm"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "4px"
                }}
              />
            ),
          },
          {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
          },
          {
            title: 'Giá',
            dataIndex: 'price',
          },
          {
            title: 'Số lượng',
            dataIndex: 'quantity',
            width: '150px',
            render: (_, record) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Button
                  onClick={() => handleQuantityChange(record.id, -1)}
                  disabled={(quantities[record.id] || 1) <= 1}
                  style={{
                    width: '24px',
                    height: '24px',
                    minWidth: '24px',
                    borderRadius: '4px',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  -
                </Button>
                <span style={{ margin: '0 4px' }}>{quantities[record.id] || 1}</span>
                <Button
                  onClick={() => handleQuantityChange(record.id, 1)}
                  style={{
                    width: '24px',
                    height: '24px',
                    minWidth: '24px',
                    borderRadius: '4px',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +
                </Button>
              </div>
            ),
          },
          {
            title: '',
            render: (_, record) => (
              <Button
                type="primary"
                onClick={() => onConfirm({ ...record, quantity: quantities[record.id] || 1 })}
              >
                Chọn
              </Button>
            ),
          },
        ]}
        dataSource={filteredProducts}
        rowKey="id"
        pagination={false}
      />
    </Modal>
    </div>
  );
};

export default ProductSearchModal;