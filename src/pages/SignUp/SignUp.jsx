import React, { useState } from 'react';
import { Layout, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './SignUp.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // Here you would make an API call to register the user
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      login(values); // Log in the user after successful registration
      message.success('Đăng ký thành công!');
      navigate('/'); // Redirect after registration
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
        <div className="icons-and-search">
            <img 
              src="/1.png" 
              alt="message-icon" 
              className="header-icon1" 
            />
            <img 
              src="/2.png" 
              alt="notification-icon" 
              className="header-icon2" 
            />
          </div>
      </Header>

      <Content className="content">
        <div className="signup-container">
          <Title level={2} className="signup-title">Đăng Ký</Title>
          <Form
            name="signup"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Nhập tên đăng nhập" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" />
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
              <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
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

export default SignUp;