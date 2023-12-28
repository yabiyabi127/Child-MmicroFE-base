import { Result, Button } from "antd";
import React from "react";
import Container from "components/Container";

const Forbidden = ({ history, title }) => (
  <Container hideContentHeader menuName={title || undefined}>
    <Result
      status="warning"
      title="Anda tidak memiliki hak akses ke data ini"
      extra={
        <Button ghost type="primary" key="console" onClick={history.goBack}>
          kembali
        </Button>
      }
    />
  </Container>
);
export { Forbidden };
