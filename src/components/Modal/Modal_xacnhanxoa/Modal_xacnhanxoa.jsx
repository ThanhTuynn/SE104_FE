import React from "react";
import { Modal } from "antd";
import "./Modal_xacnhanxoa.css"; // Import CSS

const DeleteConfirmationModal = ({ isVisible, onConfirm, onCancel, order}) => {
  return (
    <Modal
    className="ttcc"
      title="Xác nhận xóa"
      visible={isVisible}
      onOk={onConfirm} // Hàm xử lý xác nhận
      onCancel={onCancel} // Hàm xử lý hủy
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true }} // Nút "Xóa" màu đỏ
    >
      <p className="delete-modal-message">
        Bạn có chắc chắn muốn xóa đơn hàng <strong>{order?.productName}</strong> có mã đơn hàng là <strong>{order?.productCode}</strong> không?
      </p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
