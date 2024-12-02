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
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import "./SidebarComponent.css";

const SidebarComponent = () => {
  return (
    <aside className="sidebar">
        <header className="sidebar-header">
        <Link to="/" className="header-logo">
            <img src={logo} alt="BUTTH Luxury Jewery" />
        </Link>
        </header>
        <nav className="sidebar-nav">
          <ul className="nav-list primary-nav">
            <li>
            <Link to="/" className="nav-link">
                <DashboardOutlined />
                <span>Dashboard</span>
            </Link>
            </li>
            <li>
            <Link to="/list-product" className="nav-link">
                <AppstoreOutlined />
                <span>Quản lý kho</span>
            </Link>
            </li>
            <li>
            <Link to="/list-order-product" className="nav-link">
                <FileAddOutlined />
                <span>Quản lý phiếu bán hàng</span>
             </Link>
            </li>
            <li>
              <a href="#" className="nav-link">
                <ShoppingCartOutlined />
                <span>Quản lý phiếu mua hàng</span>
              </a>
            </li>
            <li>
              <Link to="/list-service" className="nav-link">
                <FileOutlined />
                <span>Quản lý phiếu dịch vụ</span>
              </Link>
            </li>
            <li>
              <a href="#" className="nav-link">
                <TeamOutlined />
                <span>Quản lý khách hàng</span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                <UserOutlined />
                <span>Quản lý nhân viên</span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
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
                <LogoutOutlined />
                <span>Đăng xuất</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
  );
};

export default SidebarComponent;
