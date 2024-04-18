import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../custom-button";
import styles from "./index.module.css";
import { Paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlices";

const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="ghost" htmlType="button" onClick={() => {}}>
            <Typography.Title level={1}>Employees</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          htmlType="button"
          type="ghost"
          icon={<LoginOutlined />}
          onClick={onLogoutClick}
        >
          Log out
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButton
              type="ghost"
              htmlType="button"
              onClick={() => {}}
              icon={<UserOutlined />}
            >
              Sign up
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton
              type="ghost"
              htmlType="button"
              onClick={() => {}}
              icon={<LoginOutlined />}
            >
              Sign in
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};

export default Header;
