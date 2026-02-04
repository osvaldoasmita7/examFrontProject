import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Row,
  Typography,
  type FormProps,
} from "antd";
import type { FieldType } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN_FORM } from "../constants";
import { AuthContext } from "../contexts";

const { Title } = Typography;

export const Login = () => {
  // Contextos
  const { login, getToken } = useContext(AuthContext);

  // Hooks
  const navigate = useNavigate();

  //   States
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * This function execute when the form is completed
   * @param values
   */
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setErrorMessage("");
    try {
      // Intenta iniciar sesión
      const respLogin = await login({
        email: values.email,
        password: values.password,
      });
      //   Si no hay token manda un error
      if (!respLogin.access_token)
        throw {
          message:
            "El usuario se podo registrar pero no pudo iniciar sesión, ve a la página principal e intenta iniciar sesión",
        };
      // Si todo está correcto, redirecciona
      navigate("/welcome");
    } catch (error: unknown) {
      // Así queda tu catch:
      if (isErrorWithMessage(error)) {
        setErrorMessage(error.message); // ¡Aquí ya no necesitas 'as any'!
      } else if (typeof error === "string") {
        setErrorMessage(error);
      } else {
        setErrorMessage("Ocurrió un error inesperado");
      }
    }
  };

  //   Valida si tiene una sesión activa, para no mostrar esta pantalla
  const validateActiveSession = async () => {
    const resp = await getToken();
    if (resp) navigate("/welcome");
  };

  // Esta función "promete" que si devuelve true, el error tiene un .message de tipo string
  function isErrorWithMessage(error: unknown): error is { message: string } {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as Record<string, unknown>).message === "string"
    );
  }
  //   Hook que inicia al principio
  useEffect(() => {
    validateActiveSession();
  }, [validateActiveSession]);

  return (
    <Row className="form">
      <Col sm={24} lg={5} style={{ margin: "auto" }}>
        <Col sm={24}>
          <Form
            name="register"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Title style={{ textAlign: "center" }}>Bienvenido de nuevo!</Title>
            <Form.Item<FieldType>
              label="Correo electrónico"
              name={SIGN_IN_FORM.fields.EMAIL}
              rules={SIGN_IN_FORM.rules.EMAIL}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name={SIGN_IN_FORM.fields.PASSWORD}
              rules={SIGN_IN_FORM.rules.PASSWORD_LOGIN}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Empezar
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col sm={24}>
          {errorMessage && (
            <Alert
              description={errorMessage}
              type="error"
              closable={true}
              style={{ textAlign: "center" }}
            />
          )}
        </Col>
        <Col sm={24} style={{ textAlign: "center" }}>
          <Link to={"/sign-in"}>Registrate</Link>
        </Col>
      </Col>
    </Row>
  );
};
