import React from "react";
import { Input, Button } from "antd";
import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import "./Header.css";

const { Search } = Input;

const Header = ({ onAddOrder,title,button_modal }) => {
  return (
    <header className="content-header">
      <div>
        <h2 className="titlee">{title}</h2>
        <img src="/bell.jpg" alt="Bell" className="logo-image1" />
        <img src="/girl.jpg" alt="Avatar" className="logo-image2" />
      </div>
      <div className="header-actionss">
        <Search placeholder="Tìm kiếm sản phẩm..." style={{ width: 900 }} />
        <Button type="primary" className="export-bttn" icon={<ExportOutlined />}>Xuất</Button>
        <Button type="primary" className="add-btnn" icon={<PlusOutlined />} onClick={onAddOrder}>{button_modal}</Button>
      </div>
    </header>
  );
};

export default Header;
