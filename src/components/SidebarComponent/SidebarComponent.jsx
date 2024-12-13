import React from "react";
import {
  DashboardOutlined,
  AppstoreOutlined,
  FileAddOutlined,
  ShoppingCartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  DollarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/logo.png';
import "./SidebarComponent.css";

const SidebarComponent = () => {
  const location = useLocation();

  // Kiểm tra đường dẫn hiện tại
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <Link to="/" className="header-logo">
          <img src={logo} alt="BUTTH Luxury Jewelry" />
        </Link>
      </header>
      <nav className="sidebar-nav">
        <ul className="nav-list primary-nav">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              <DashboardOutlined />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/list-product" 
              className={`nav-link ${isActive("/list-product") ? "active" : ""}`}
            >
              <AppstoreOutlined />
              <span>Quản lý kho</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/list-order-product" 
              className={`nav-link ${isActive("/list-order-product") ? "active" : ""}`}
            >
              <FileAddOutlined />
              <span>Quản lý phiếu bán hàng</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/list-import-product" 
              className={`nav-link ${isActive("/list-import-product") ? "active" : ""}`}
            >
              <ShoppingCartOutlined />
              <span>Quản lý phiếu mua hàng</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/list-service" 
              className={`nav-link ${isActive("/list-service") ? "active" : ""}`}
            >
              <FileOutlined />
              <span>Quản lý phiếu dịch vụ</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/list-customer" 
              className={`nav-link ${isActive("/list-customer") ? "active" : ""}`}
            >
              <TeamOutlined />
              <span>Quản lý khách hàng</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/list-employee" 
              className={`nav-link ${isActive("/list-employee") ? "active" : ""}`}
            >
              <TeamOutlined />
              <span>Quản lý nhân viên</span>
            </Link>
          </li>
          <li>
            <a href="#" className={`nav-link`}>
              <DollarOutlined />
              <span>Quản lý doanh thu</span>
            </a>
          </li>
        </ul>
        <ul className="nav-list secondary-nav">
          <li>
            <a href="#" className="nav-link">
              <UserOutlined />
              <span>Cá nhân</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <LogoutOutlined style={{ color: "red" }} />
              <span style={{ color: "red" }}>Đăng xuất</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarComponent;
