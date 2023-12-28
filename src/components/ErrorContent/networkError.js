import { Result, Button } from "antd";
import React from "react";
import Container from "components/Container";

const NetworkError = ({ refetch, title }) => (
  <Container hideContentHeader menuName={title || undefined}>
    <Result
      status="warning"
      title="Anda tidak memiliki hak akses ke data ini"
      extra={
        <Button ghost type="primary" key="console" onClick={refetch()}>
          Muat Ulang
        </Button>
      }
    />
  </Container>
);
export { NetworkError };
