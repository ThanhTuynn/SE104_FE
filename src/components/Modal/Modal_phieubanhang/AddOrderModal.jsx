import React, { useState } from "react";
import { Select, Input,Button } from "antd";
import { UserOutlined } from '@ant-design/icons';
import CustomerSearchModal from "../Modal_timkiemkhachhang/Modal_timkiemkhachhang";
import ProductSearchModal from "../Modal_timkiemsanpham/ProductSearchModal";
import "./AddOrderModal.css";
const { Option } = Select;

const AddOrderModal = ({ isVisible, onClose, title, save }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Trạng thái tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState([]); // Sản phẩm được lọc
  const [cart, setCart] = useState([]); // Giỏ hàng
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [quantities, setQuantities] = useState({}); // Thêm state để lưu số lượng
  const productList = [
    { id: 1, name: "Sản phẩm A", image: "/product1.png", price: "100,000 VNĐ" },
    { id: 2, name: "Sản phẩm B", image: "/product2.png", price: "200,000 VNĐ" },
    { id: 3, name: "Sản phẩm C", image: "/product3.png", price: "300,000 VNĐ" },
    { id: 4, name: "Sản phẩm D", image: "/product4.png", price: "400,000 VNĐ" },
  ];
  const customerList = [
    { id: 1, name: "Nguyễn Văn A", phone: "0123456789" },
    { id: 2, name: "Trần Thị B", phone: "0987654321" },
    { id: 3, name: "Lê Văn C", phone: "0912345678" },
    { id: 4, name: "Phạm Thị D", phone: "0934567890" },
  ];
  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = productList.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };
  const handleProductSelect = (product) => {
    if (!cart.some((item) => item.id === product.id)) {
      // Add product with its quantity to cart
      setCart(prevCart => [...prevCart, product]);
      // Set the quantity from the modal
      setQuantities(prev => ({
        ...prev,
        [product.id]: product.quantity || 1
      }));
    }
    setIsProductModalVisible(false);
  };
  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    if (!cart.some((item) => item.id === product.id)) {
      setCart((prevCart) => [...prevCart, product]);
    }
    setSearchTerm(""); // Reset thanh tìm kiếm về rỗng
    setFilteredProducts([]); // Reset danh sách sản phẩm
  };
  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change)
    }));
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  const [selectedProducts, setSelectedProducts] = useState([]);
  // Lưu đơn hàng
  const handleSaveOrder = () => {
    console.log("Đơn hàng đã lưu:", cart); // Kết nối xử lý lưu đơn hàng tại đây
    onClose(); // Đóng modal
  };
  const [isCustomerModalVisible, setIsCustomerModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  if (!isVisible) return null;
  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setIsCustomerModalVisible(false);
  };
  
  return (
    <div className="tc1">
      <div className="overlay1">
        <div className="modal1">
          <div className="modal-content">
            <h3 className="modal-title">{title}</h3>
            <div className="modal-body">
              {/* Cột bên trái: Thông tin */}
              <div className="modal-column left-column">
                <div className="header-row">
                  <label>Thông tin khách hàng </label>
                  <div className="toggle-container">
                    <label>Khách hàng mới</label>
                    <div className="toggle-switch">
                      <input type="checkbox" id="newCustomer" />
                      <label htmlFor="newCustomer"></label>
                    </div>
                  </div>
                </div>
                <form>
                  <div className="custom-select-container">
                  <Button
                      type="primary"
                      className="custom-inputt"
                      onClick={() => setIsCustomerModalVisible(true)}
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        marginBottom: selectedCustomer ? '16px' : '0'
                      }}
                    >
                      Tìm kiếm khách hàng
                    </Button>
                    {selectedCustomer && (
                        <div style={{
                          padding: '12px',
                          border: '1px solid #e6e9f0',
                          borderRadius: '8px',
                          backgroundColor: '#f8f9ff'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <UserOutlined style={{ fontSize: '24px' }} />
                            <div>
                              <div style={{ fontWeight: 'bold' }}>{selectedCustomer.name}</div>
                              <div style={{ color: '#666' }}>{selectedCustomer.phone}</div>
                            </div>
                          </div>
                        </div>
                      )}
                      <CustomerSearchModal
                        isVisible={isCustomerModalVisible}
                        onCancel={() => setIsCustomerModalVisible(false)}
                        title={"Tìm kiếm khách hàng"}
                        customers={customerList}
                        onConfirm={(customer) => {
                          setSelectedCustomer(customer);
                          setIsCustomerModalVisible(false);
                        }}
                      />
                  </div>
                  <br />
                  <div style={{ display: "flex", gap: "16px" }} className="row3">
                    {/* Hình thức thanh toán */}
                    <Select
                      placeholder="Chọn hình thức thanh toán"
                      style={{ width: "600px" }}
                    >
                      <Option value="mastercard">MasterCard</Option>
                      <Option value="visa">Visa</Option>
                      <Option value="paypal">PayPal</Option>
                    </Select>

                    {/* Loại đơn hàng */}
                    <Select
                      showSearch
                      placeholder="Nhập hoặc chọn Loại đơn hàng"
                      style={{ width: "600px" }}
                    >
                      <Option value="order1">Loại đơn hàng 1</Option>
                      <Option value="order2">Loại đơn hàng 2</Option>
                      <Option value="order3">Loại đơn hàng 3</Option>
                    </Select>
                  </div>
                  <br />
                  <label>Ngày tháng năm đặt hàng</label>
                  <br />
                  <div className="days" style={{ display: "flex", gap: "16px" }}>
                    <input
                      type="date"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        width: "100%",
                        height: "30px",
                      }}
                    />
                    <Input
                      type="time"
                      style={{
                        width: "100%",
                        height: "30px",
                        paddingLeft: "40px",
                        paddingRight: "40px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                        textAlign: "center",
                        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </div>
                  <label className="trangthai-title">Trạng Thái</label>
                  <br />
                  <Select placeholder="Chọn trạng thái" className="thanhtt">
                    <Option value="processing">Đang xử lý</Option>
                    <Option value="cancelled">Đã hủy</Option>
                    <Option value="delivered">Đã giao</Option>
                  </Select>
                  <br />
                  <textarea
                    placeholder="Ghi chú"
                    className="ghichu"
                  ></textarea>
                </form>
              </div>

              {/* Cột bên phải: Chọn sản phẩm */}
              {/* Cột bên phải: Chọn sản phẩm và giỏ hàng */}
              <div className="modal-column right-column">
            <h3>Sản phẩm</h3>
            <Button
              type="primary"
              onClick={() => setIsProductModalVisible(true)}
              style={{ width: "100%", marginBottom: 16, borderRadius: '8px' }}
            >
              Chọn sản phẩm
            </Button>
            <ProductSearchModal
              isVisible={isProductModalVisible}
              onCancel={() => setIsProductModalVisible(false)}
              onConfirm={handleProductSelect}
              products={productList} // Pass the sample product data
              className="product-modal-in-order" // Add this className
            />
            {/* Hiển thị giỏ hàng */}
            <div className="cart-container">
              <h3>Giỏ hàng</h3>
              {cart.length > 0 ? (
                            cart.map((item) => (
                              <div
                                key={item.id}
                                className="cart-item"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: 10,
                                }}
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    marginRight: "10px",
                                  }}
                                />
                                <div style={{ flex: 1 }}>
                                  <strong>{item.name}</strong>
                                  <div style={{ color: "gray" }}>{item.price}</div>
                                </div>
                                <div style={{ 
                                  marginRight: '15px',
                                  padding: '4px 8px',
                                  backgroundColor: '#f5f5f5',
                                  borderRadius: '4px',
                                  fontSize: '14px'
                                }}>
                                  Số lượng: {quantities[item.id] || 1}
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  style={{
                                    backgroundColor: "#ff4d4f",
                                    color: "#fff",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                  }}
                                >
                                  Xóa
                                </button>
                              </div>
                            ))
                          ) : (
                            <p>Chưa có sản phẩm trong giỏ hàng</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button className="cancel-btn" onClick={onClose}>
                        Hủy
                      </button>
                      <button className="submit-btn" onClick={handleSaveOrder}>
                        {save}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
  );
};

export default AddOrderModal;
