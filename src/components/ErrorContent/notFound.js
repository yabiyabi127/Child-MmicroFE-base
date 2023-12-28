import { Result, Button } from "antd";
import React from "react";
import Container from "components/Container";

const NotFound = ({ history, title }) => (
  <Container hideContentHeader menuName={title || undefined}>
    <Result
      status="warning"
      title="Halaman yang anda cari tidak ditemukan"
      extra={
        <Button ghost type="primary" key="console" onClick={history.goBack}>
          kembali
        </Button>
      }
    />
  </Container>
);
export { NotFound };
