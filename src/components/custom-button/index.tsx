import { Button, Form } from "antd";

type Props = {
  children: React.ReactNode;
  htmlType: "button" | "submit" | "reset" | undefined;
  onClick: () => void;
  type?:
    | "link"
    | "text"
    | "default"
    | "primary"
    | "ghost"
    | "dashed"
    | undefined;
  danger?: boolean;
  ghost?: boolean;
  loading?: boolean;
  shape?: "default" | "circle" | "round" | undefined;
  icon?: React.ReactNode;
};

const CustomButton = ({
  children,
  htmlType = "button",
  type,
  danger,
  loading,
  shape,
  icon,
  onClick,
}: Props) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
      >
        {children}
      </Button>
    </Form.Item>
  );
};

export default CustomButton;
