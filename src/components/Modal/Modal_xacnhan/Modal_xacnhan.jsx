import React from "react";
import { Modal, Select, Checkbox } from "antd";

const { Option } = Select;

const ServiceConfirmationModal = ({
  isVisible,
  onOk,
  onCancel,
  amount, // Giá trị thanh toán mặc định
}) => {
  return (
    <Modal
      className="xacn"
      title="Xác nhận lập phiếu"
      visible={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Tạo phiếu dịch vụ"
      cancelText="Hủy"
    >
      <p>
        Xác nhận sẽ nhận thanh toán sau cho phiếu dịch vụ này?
      </p>
      <p style={{ backgroundColor: "#e6fffb", padding: "10px", borderRadius: "5px" }}>
        Trạng thái thanh toán của phiếu dịch vụ là <strong>Chờ xử lý</strong>.
        Sau khi phiếu dịch vụ đã tạo, bạn không thể thay đổi phương thức hoặc trạng thái thanh toán.
      </p>
      <div style={{ marginTop: "20px" }}>
        <label>Phương thức thanh toán</label>
        <Select defaultValue="Thanh toán tại cửa hàng" style={{ width: "100%", marginTop: "10px" }}>
          <Option value="Thanh toán tại cửa hàng">Thanh toán tại cửa hàng</Option>
          <Option value="Chuyển khoản">Chuyển khoản</Option>
          <Option value="Thanh toán online">Thanh toán online</Option>
        </Select>
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>Chờ thanh toán: </label>
        <span style={{ fontWeight: "bold" }}>{amount.toLocaleString()} VND</span>
      </div>
    </Modal>
  );
};

export default ServiceConfirmationModal;
