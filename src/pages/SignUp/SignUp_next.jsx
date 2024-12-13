import React, { useState } from 'react';
import { Layout, Form, Input, Button, Typography, Radio, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './SignUp_next.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const SignUpDetails = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const basicData = JSON.parse(localStorage.getItem('signupBasicData'));
      const fullData = { ...basicData, ...values };
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      login(fullData);
      localStorage.removeItem('signupBasicData');
      message.success('Đăng ký thành công!');
      navigate('/');
    } catch (error) {
      message.error('Đăng ký thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="app-layout">
      <Header className="header">
        <div className="header-content">
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>
        <div className="icons-and-search1">
          <img 
            src="/1.png" 
            alt="message-icon" 
            className="header-icon11" 
          />
          <img 
            src="/2.png" 
            alt="notification-icon" 
            className="header-icon21" 
          />
        </div>
      </Header>

      <Content className="content">
        <div className="signup-container">
          <Title level={2} className="signup-title">Đăng Ký</Title>
          <Form
            name="signup-details"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="role"
              label="Vai trò nhân viên"
              rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
            >
              <Radio.Group 
                style={{
                  width: '100%',
                  display: 'flex',
                  fontSize: '12px',
                  gap: '16px',
                  padding: '8px',
                  border: '2px solid #d9d9d9',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                <Radio value="sales" style={{ flex: 1, height: '40px', display: 'flex', alignItems: 'center' }}>
                  Nhân viên bán hàng
                </Radio>
                <Radio value="warehouse" style={{ flex: 1, height: '40px', display: 'flex', alignItems: 'center' }}>
                  Nhân viên kho
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Nhập mật khẩu"
                style={{
                  height: '40px',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '8px',
                  border: '2px solid #d9d9d9',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Xác nhận mật khẩu"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Xác nhận mật khẩu"
                style={{
                  height: '40px',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '8px',
                  border: '2px solid #d9d9d9',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                style={{ width: '100%' }}
                loading={loading}
              >
                Đăng Ký
              </Button>
            </Form.Item>

            <div className="signup-links">
              Đã có tài khoản? <a href="/dang-nhap">Đăng nhập</a>
            </div>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default SignUpDetails;