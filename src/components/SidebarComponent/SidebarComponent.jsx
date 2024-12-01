import React from "react";
import {
  DashboardOutlined,
  AppstoreOutlined,
  FileAddOutlined,
  ShoppingCartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MonitorOutlined,
  
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from '../../assets/whiteLogo.svg'
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
            <Link to="/.." className="nav-link">
                <AppstoreOutlined />
                <span>Quản lý kho</span>
            </Link>
            </li>
            <li>
            <Link to="/list-order-product" className="nav-link">
                <FileAddOutlined />
                <span>Quản lý đơn hàng</span>
             </Link>
            </li>
            <li>
            <Link to="/track-order-product" className="nav-link">
                <MonitorOutlined />
                <span>Theo dõi đơn hàng</span>
             </Link>
            </li>
            <li>
            <Link to="/list-cusmoter" className="nav-link">
                <TeamOutlined />
                <span>Quản lý khách hàng</span>
            </Link>
            </li>
            <li>
            <Link to="/list-staff" className="nav-link">
                <TeamOutlined />
                <span>Quản lý nhân viên</span>
            </Link>
            </li>
            <li>
              <a href="#" className="nav-link">
              <ShoppingCartOutlined />
                <span>Quản lý cửa hàng</span>
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
