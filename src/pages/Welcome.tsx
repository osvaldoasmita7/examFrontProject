import { Alert, Button, Col, Row } from "antd";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "../constants";

export const Welcome = () => {
  const { verifyToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const getData = async () => {
    const resp = await verifyToken(sessionStorage.getItem(TOKEN) || "");
    if (!resp) navigate("/");
  };
  const endSession = () => {
    logout();
    navigate("/");
  };
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <Row>
      <Col sm={24}>
        <Alert description="Bienvenido, si se pudo iniciar sesión"></Alert>
        <Button style={{ marginTop: 20 }} onClick={endSession}>
          Cerrar sesión
        </Button>
      </Col>
    </Row>
  );
};
