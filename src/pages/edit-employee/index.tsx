import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editEmployee,
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employees";
import Layout from "../../components/layout";
import { Row } from "antd";
import EmployeeForm from "../../components/employee-form";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [editEmployee] = useEditEmployeeMutation();

  if (isLoading) {
    return <span>Loading</span>;
  }

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };
      await editEmployee(editedEmployee).unwrap();
      navigate(`${Paths.status}/updated`);
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
        <EmployeeForm
          title="Edit employee"
          btnText="Edit"
          error={error}
          employee={data}
          onFinish={handleEditUser}
        />
      </Row>
    </Layout>
  );
};

export default EditEmployee;
