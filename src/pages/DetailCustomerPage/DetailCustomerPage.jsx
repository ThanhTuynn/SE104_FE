import React from 'react';
import './DetailCustomerPage.css';
import Topbar from '../../components/TopbarComponent/TopbarComponent';
import avatar from '../../assets/avatar_customer/customer1.jpg';
import {
  CopyOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const CustomerDetail = () => {
  const orders = [
    {
      id: '302002',
      product: 'Nhẫn Kim cương Vàng',
      extra: '+3 sản phẩm khác',
      total: '$121.00',
      status: 'Đang xử lý',
      date: '12 Dec 2023',
      statusClass: 'processing',
    },
    {
      id: '301901',
      product: 'Nhẫn Kim cương Vàng',
      extra: '+3 sản phẩm khác',
      total: '$590.00',
      status: 'Đang xử lý',
      date: '1 Dec 2023',
      statusClass: 'processing',
    },
    {
      id: '301900',
      product: 'Nhẫn Kim cương Vàng',
      extra: '',
      total: '$125.00',
      status: 'Hoàn thành',
      date: '10 Nov 2023',
      statusClass: 'completed',
    },
    {
      id: '301881',
      product: 'Nhẫn Kim cương Vàng',
      extra: '+3 sản phẩm khác',
      total: '$348.00',
      status: 'Hoàn thành',
      date: '2 Nov 2023',
      statusClass: 'completed',
    },
    {
      id: '301643',
      product: 'Nhẫn Kim cương Vàng',
      extra: '',
      total: '$607.00',
      status: 'Hoàn thành',
      date: '7 Sep 2023',
      statusClass: 'completed',
    },
  ];

  return (
    <div>
      <div style={{ marginLeft: '270px' }}>
        <Topbar title="Thông tin chi tiết khách hàng" />
      </div>

      <div className="customer-detail">
        {/* Main Container */}
        <div className="customer-container">
          {/* Left Section */}
          <div className="left-section">
            <div className="avatar-placeholder">
              <img src={avatar} alt="avatar-customer" />
            </div>
            <h2 className="customer-name">Linda Blair</h2>
            <span className="status active">Hoạt động</span>

            {/* Customer Info */}
            <div className="info-list">
              <div className="info-item">
                <CopyOutlined className="info-icon" />
                <span>
                  <strong>Mã khách hàng:</strong> ID-011221
                </span>
              </div>
              <div className="info-item">
                <MailOutlined className="info-icon" />
                <span>
                  <strong>E-mail:</strong> lindablair@gmail.com
                </span>
              </div>
              <div className="info-item">
                <EnvironmentOutlined className="info-icon" />
                <span>
                  <strong>Địa chỉ:</strong> 1833 Bel Meadow Drive, Fontana,
                  California 92335, USA
                </span>
              </div>
              <div className="info-item">
                <PhoneOutlined className="info-icon" />
                <span>
                  <strong>Số điện thoại:</strong> 050 414 8778
                </span>
              </div>
              <div className="info-item">
                <ShoppingCartOutlined className="info-icon" />
                <span>
                  <strong>Lượt mua gần nhất:</strong> 12/10/2024
                </span>
              </div>
              <div className="info-item">
                <ClockCircleOutlined className="info-icon" />
                <span>
                  <strong>Hoạt động gần nhất:</strong> 1 ngày trước
                </span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="customer-stats">
            <div className="stat-item">
              <div className="icon time"></div>
              <div className="stat-info">
                <strong>Chi tiêu</strong>
                <span>120.000.000 đồng</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="icon cart"></div>
              <div className="stat-info">
                <strong>Điểm</strong>
                <span>12.000</span>
              </div>
            </div>
            <div className="stat-summary">
              <div>
                <strong>Tổng đơn hàng:</strong> 10
              </div>
              <div>
                <strong>Đang xử lý:</strong> 2
              </div>
              <div>
                <strong>Hoàn thành:</strong> 8
              </div>
              <div>
                <strong>Đơn hủy:</strong> 0
              </div>
            </div>
          </div>
        </div>

        {/* Purchase History */}
        <div className="purchase-history">
          <h3>Lịch sử mua hàng</h3>
          <table className="history-table">
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Tình trạng</th>
                <th>Ngày đặt hàng</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="order-id">{order.id}</td>
                  <td>
                    {order.product}{' '}
                    <span className="extra">{order.extra}</span>
                  </td>
                  <td>{order.total}</td>
                  <td className={`status ${order.statusClass}`}>
                    {order.status}
                  </td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
