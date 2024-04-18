import { Row, Card, Form, Space, Typography } from "antd";
import Layout from "../../components/layout";
import CustomInput from "../../components/custom-input";
import PasswordInput from "../../components/password-input";
import CustomButton from "../../components/custom-button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlices";
import { useState } from "react";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import ErrorMessage from "../../components/error-message";

const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  type RegisterData = Omit<User, "id"> & { confirmPassword: string };

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();
      navigate("/");
    } catch (error) {
      const maybeError = isErrorWithMessage(error);

      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Sign up" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <CustomButton type="primary" htmlType="submit" onClick={() => {}}>
              Sign up
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Already registered? <Link to={Paths.login}>Sign in</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Register;
