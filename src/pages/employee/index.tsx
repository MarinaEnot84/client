import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../../app/services/employees";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlices";
import Layout from "../../components/layout";
import { Descriptions, Divider, Modal, Space } from "antd";
import CustomButton from "../../components/custom-button";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ErrorMessage from "../../components/error-message";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

const Employee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!data) {
    return <Navigate to="/" />;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = async () => {
    hideModal();

    try {
      await removeEmployee(data.id).unwrap();
      navigate(`${Paths.status}/deleted`);
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
      <Descriptions title="Information about employee" bordered>
        <Descriptions.Item label="name" span={3}>
          {`${data.firstname} ${data.lastname}`}
        </Descriptions.Item>
        <Descriptions.Item label="age" span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label="address" span={3}>
          {data.address}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Action</Divider>
          <Space>
            <Link to={`/employee/edit/${data.id}`}>
              <CustomButton
                shape="round"
                htmlType="button"
                onClick={() => null}
                type="default"
                icon={<EditOutlined />}
              >
                Edit
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
              htmlType="button"
            >
              Delete
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Confirm deleting"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Confim"
        cancelText="Cancel"
      >
        Do you really want to remove the employee from table?
      </Modal>
    </Layout>
  );
};

export default Employee;
