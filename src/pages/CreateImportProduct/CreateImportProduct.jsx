import React, { useState } from "react";
import { Input, Button, Upload, DatePicker, Form, Modal, List } from "antd";
import "./CreateImportProduct.css";
import { useNavigate } from "react-router-dom"; 

const { TextArea } = Input;

const CreateImportOrder = () => {
    const navigate = useNavigate(); // Khai báo useNavigate

  // Hàm xử lý khi nhấn nút Hủy
  const handleCancel = () => {
    navigate(-1); // Quay lại trang trước
  }; 

  // Initial predefined data
  const initSupplierData = [
    { id: 1, name: "Vân Mây", phone: "0312456789" },
    { id: 2, name: "Nguyễn Văn A", phone: "0918273845" },
    { id: 3, name: "Trần Thị Ngọc B", phone: "091726354" },
    { id: 4, name: "Vân Mây", phone: "0328435671" },
    { id: 5, name: "Nguyễn Văn A", phone: "0321654879" },
  ];

  const initProductData = [
    { code: "SP001", name: "Sản phẩm A", quantity: 10, category: "Loại 1" },
    { code: "SP002", name: "Sản phẩm B", quantity: 20, category: "Loại 2" },
    { code: "SP003", name: "Sản phẩm C", quantity: 5, category: "Loại 1" },
  ];

  const [formState, setFormState] = useState({
    supplier: "",
    products: [],
    employeeName: "",
    expectedDate: null,
    referenceCode: "",
    notes: "",
    discount: 0,
    otherCosts: 0,
  });

  const [showNewSupplierModal, setShowNewSupplierModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    code: "",
    name: "",
    quantity: 0,
    category: "",
  });

  const isFormComplete = () => {
    const { supplier, employeeName, referenceCode, expectedDate } = formState;
    return supplier && employeeName && referenceCode && expectedDate;
  };

  const handleSave = () => {
    if (!isFormComplete()) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }
    alert("Đơn hàng đã được lưu.");
    navigate("list-import-product"); 
  };

  const [initialFormState, setInitialFormState] = useState({
    ...formState,
  });
  // Check if there's any change in the costs section
  const isCostChanged = () => {
    const { discount, otherCosts, laborCosts } = formState;
    return (
      discount !== initialFormState.discount ||
      otherCosts !== initialFormState.otherCosts ||
      laborCosts !== initialFormState.laborCosts
    );
  };
// Handle purchase button click
  const handlePurchase = () => {
    if (!isCostChanged()) {
      alert("Chưa có thay đổi nào về chi phí mua hàng.");
      return;
    }
    alert("Đơn hàng đã được tạo thành công.");
  };

  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Handle changes to input fields
  const handleChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
    if (key === 'supplier' && value) {
      const filtered = initSupplierData.filter(supplier =>
        supplier.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuppliers(filtered);
    } else if (key === 'products' && value) {
      const filtered = initProductData.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredSuppliers([]);
      setFilteredProducts([]);
    }
  };

  // Handle selecting a supplier
  const handleSelectSupplier = (supplier) => {
    setFormState((prev) => ({ ...prev, supplier: supplier.name }));
    setFilteredSuppliers([]);
  };

  // Handle selecting a product
  const handleSelectProduct = (product) => {
    setFormState((prev) => ({
      ...prev,
      products: [...prev.products, product],
    }));
    setFilteredProducts([]);
  };

  // Handle new supplier form fields
  const handleNewSupplierChange = (key, value) => {
    setNewSupplier((prev) => ({ ...prev, [key]: value }));
  };

  // Handle new product form fields
  const handleNewProductChange = (key, value) => {
    setNewProduct((prev) => ({ ...prev, [key]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!isFormComplete()) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }

    alert("Đơn hàng đã được tạo thành công.");
  };

  // Open modal for adding a new supplier
  const openNewSupplierModal = () => {
    setShowNewSupplierModal(true);
  };

  // Close modal for new supplier
  const closeNewSupplierModal = () => {
    setShowNewSupplierModal(false);
  };

  // Save new supplier
  const saveNewSupplier = () => {
    if (!newSupplier.name || !newSupplier.address || !newSupplier.phone) {
      alert("Vui lòng điền đầy đủ thông tin nhà cung cấp.");
      return;
    }

    initSupplierData.push({
      id: initSupplierData.length + 1,
      name: newSupplier.name,
      phone: newSupplier.phone,
    });

    setFormState((prev) => ({ ...prev, supplier: newSupplier.name }));
    closeNewSupplierModal();
    alert("Nhà cung cấp đã được thêm thành công.");
  };

  // Open modal for adding a new product
  const openNewProductModal = () => {
    setShowNewProductModal(true);
  };

  // Close modal for new product
  const closeNewProductModal = () => {
    setShowNewProductModal(false);
  };

  // Save new product
  const saveNewProduct = () => {
    if (!newProduct.code || !newProduct.name || !newProduct.quantity || !newProduct.category) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    initProductData.push({
      ...newProduct,
    });

    setFormState((prev) => ({
      ...prev,
      products: [...prev.products, newProduct],
    }));

    closeNewProductModal();
    alert("Sản phẩm đã được thêm thành công.");
  };

  const handleFeeChange = (key, value) => {
  const newFormState = { ...formState, [key]: value };

  // Calculate the total cost whenever there's a change
  const totalCost = 
    parseFloat(newFormState.totalAmount || 0) + 
    parseFloat(newFormState.discount || 0) + 
    parseFloat(newFormState.otherCosts || 0) + 
    parseFloat(newFormState.laborCosts || 0) - 
    parseFloat(newFormState.discount || 0);

  newFormState.totalCost = totalCost;

  setFormState(newFormState);

};

  return (
    <div className="create-import-order-container">
      <header className="header">
        <h2>Tạo phiếu mua hàng</h2>
        <div className="header-actions">
          <Button danger onClick={handleCancel}>Hủy</Button>
          <Button
            type="primary"
            disabled={!isFormComplete()} // Disable if form is not complete
            onClick={handleSave}
            style={{ backgroundColor: isFormComplete() ? "#1890ff" : "#d9d9d9" }}
        >
            Lưu tạo mới
        </Button>
        </div>
      </header>

      <div className="form-container">
        {/* Supplier Section */}
        <div className="form-section">
          <h3>Nhà cung cấp</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
                placeholder="Tìm kiếm nhà cung cấp"
                onChange={(e) => handleChange("supplier", e.target.value)}
                value={formState.supplier}
                style={{ flex: 1, marginRight: 8, marginBottom: '0px'}}
            />
            <Button>Tìm kiếm</Button>
            </div>
          <div>
            <List
              dataSource={filteredSuppliers}
              renderItem={(supplier) => (
                <List.Item
                  key={supplier.id}
                  onClick={() => handleSelectSupplier(supplier)}
                  style={{ cursor: 'pointer' }}
                >
                  {supplier.name} - Số điện thoại: {supplier.phone}
                </List.Item>
              )}
            />
          </div>
          <Button type="link" onClick={openNewSupplierModal}>Thêm nhà cung cấp mới</Button>
        </div>

        {/* Modal for adding new supplier */}
        <Modal
          title="Thêm nhà cung cấp mới"
          visible={showNewSupplierModal}
          onCancel={closeNewSupplierModal}
          onOk={saveNewSupplier}
          cancelText="Hủy"
          okText="Tạo mới"
        >
          <Form layout="vertical">
            <Form.Item label="Tên nhà cung cấp" required>
              <Input
                value={newSupplier.name}
                onChange={(e) => handleNewSupplierChange("name", e.target.value)}
                placeholder="Nhập tên nhà cung cấp"
              />
            </Form.Item>
            <Form.Item label="Địa chỉ" required>
              <Input
                value={newSupplier.address}
                onChange={(e) => handleNewSupplierChange("address", e.target.value)}
                placeholder="Nhập địa chỉ nhà cung cấp"
              />
            </Form.Item>
            <Form.Item label="Số điện thoại" required>
              <Input
                value={newSupplier.phone}
                onChange={(e) => handleNewSupplierChange("phone", e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </Form.Item>
          </Form>
        </Modal>

        {/* Product Section */}
        <div className="form-section">
          <h3>Sản phẩm</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
                placeholder="Tìm kiếm sản phẩm"
                onChange={(e) => handleChange("products", e.target.value)}
                style={{ flex: 1, marginRight: 8, marginBottom: '0px' }}
                />
            <Button>Tìm kiếm</Button>
            </div>
          <div>
            <List
              dataSource={filteredProducts}
              renderItem={(product) => (
                <List.Item
                  key={product.code}
                  onClick={() => handleSelectProduct(product)}
                  style={{ cursor: 'pointer' }}
                >
                  {product.name} - Mã sản phẩm: {product.code}
                </List.Item>
              )}
            />
          </div>
          <Button type="link" onClick={openNewProductModal}>Thêm sản phẩm mới</Button>
          <Upload>
            <Button>Tải file danh sách</Button>
          </Upload>
        </div>

        {/* Modal for adding new product */}
        <Modal
          title="Thêm sản phẩm mới"
          visible={showNewProductModal}
          onCancel={closeNewProductModal}
          onOk={saveNewProduct}
          cancelText="Hủy"
          okText="Tạo mới"
        >
          <Form layout="vertical">
            <Form.Item label="Mã sản phẩm" required>
              <Input
                value={newProduct.code}
                onChange={(e) => handleNewProductChange("code", e.target.value)}
                placeholder="Nhập mã sản phẩm"
              />
            </Form.Item>
            <Form.Item label="Tên sản phẩm" required>
              <Input
                value={newProduct.name}
                onChange={(e) => handleNewProductChange("name", e.target.value)}
                placeholder="Nhập tên sản phẩm"
              />
            </Form.Item>
            <Form.Item label="Số lượng" required>
              <Input
                type="number"
                value={newProduct.quantity}
                onChange={(e) => handleNewProductChange("quantity", e.target.value)}
                placeholder="Nhập số lượng"
              />
            </Form.Item>
            <Form.Item label="Loại sản phẩm" required>
              <Input
                value={newProduct.category}
                onChange={(e) => handleNewProductChange("category", e.target.value)}
                placeholder="Nhập loại sản phẩm"
              />
            </Form.Item>
          </Form>
        </Modal>

        <div className="flex-container">
          {/* Container: Nhân viên xử lý */}
          <div className="form-section half-width">
            <h3>Nhân viên xử lý</h3>
            <Form layout="vertical">
              <Form.Item label="Họ và tên" required>
                <Input
                  placeholder="Nhập họ và tên"
                  onChange={(e) => handleChange("employeeName", e.target.value)}
                  value={formState.employeeName}
                />
              </Form.Item>

              <Form.Item label="Ngày nhận hàng dự kiến" required>
                <DatePicker
                  placeholder="Chọn ngày nhận hàng dự kiến"
                  onChange={(date) => handleChange("expectedDate", date)}
                  value={formState.expectedDate}
                />
              </Form.Item>

              <Form.Item label="Mã tham chiếu" required>
                <Input
                  placeholder="Nhập mã tham chiếu"
                  onChange={(e) => handleChange("referenceCode", e.target.value)}
                  value={formState.referenceCode}
                />
              </Form.Item>

              <Form.Item label="Ghi chú">
                <TextArea
                  placeholder="Nhập ghi chú"
                  rows={4}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  value={formState.notes}
                />
              </Form.Item>
            </Form>
          </div>

          {/* Container: Chi phí mua hàng */}
          <div className="form-section half-width">
            <h3>Chi phí mua hàng</h3>
            <Form.Item label="Tổng số lượng đặt">
            <Input
                type="number"
                value={formState.totalQuantity}
                onChange={(e) => handleFeeChange("totalQuantity", e.target.value)}
            />
            </Form.Item>

            <Form.Item label="Tổng tiền hàng">
            <Input
                type="number"
                value={formState.totalAmount}
                onChange={(e) => handleFeeChange("totalAmount", e.target.value)}
            />
            </Form.Item>

            <Form.Item label="Chiết khấu">
            <Input
                type="number"
                value={formState.discount}
                onChange={(e) => handleFeeChange("discount", e.target.value)}
            />
            </Form.Item>

            <Form.Item label="Chi phí khác">
            <Input
                type="number"
                value={formState.otherCosts}
                onChange={(e) => handleFeeChange("otherCosts", e.target.value)}
            />
            </Form.Item>

            <Form.Item label="Cần trả nhà cung cấp">
            <Input
                type="number"
                value={formState.amountToPay}
                onChange={(e) => handleFeeChange("amountToPay", e.target.value)}
            />
            </Form.Item>

            <Form.Item label="Nhân công">
            <Input
                type="number"
                value={formState.laborCosts}
                onChange={(e) => handleFeeChange("laborCosts", e.target.value)}
            />
            </Form.Item>

            <Form.Item label="Tổng tiền mua hàng">
            <Input
                type="number"
                value={formState.totalCost}
                disabled
            />
            </Form.Item>
            {/* Nút Mua hàng */}
            <Button
                type="primary"
                disabled={!isCostChanged()} // Disable if costs have not changed
                onClick={handlePurchase}
                className={isCostChanged() ? "submit-button" : "submit-button-disabled"} // Thêm className khi có sự thay đổi
                style={{
                    marginLeft: 10,
                }}
                >
                Mua hàng
                </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateImportOrder;
