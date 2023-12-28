import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Table,
  Select,
  Col,
  Form,
  DatePicker,
  Spin,
  Card,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { ROOT_PATH } from "setup/application.properties";
import { Fragment } from "react";

const RekamLaporanPeriodik = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const { dataDetailLaporan, loadingDetail, rowLaporan } = useSelector((state) => state.laporanPeriodik);

  useEffect(() => {
    // setLoading(true);
    // const timer = setTimeout(() => {
    //   setShow(false);
    //   setLoading(false);
    // }, 2000);
    // return () => clearTimeout(timer);
  }, []);

  const kembali = () => {
    history.push(`${ROOT_PATH}/laporan-periodik`);
  };

  const rekam = () => {
    kembali();
  };

  const kirim = () => {
    kembali();
  };

  const cari = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShow(true);
    }, 2000);
  };

  let noUrut = 1;
  const columns = [
    { title: "No", dataIndex: "noUrut", key: "noUrut", width: 70 },
    {
      title: "Pemegang Carnet",
      dataIndex: "namaPemagangCarnet",
      key: "namaPemagangCarnet",
    },
    {
      title: "No Carnet",
      dataIndex: "nomorAjuCarnet",
      key: "nomorAjuCarnet",
    },
    {
      title: "Penerbit Carnet",
      dataIndex: "namaPenerbitCarnet",
      key: "namaPenerbitCarnet",
    },
    {
      title: "Asal Negara/Negara Tujuan",
      dataIndex: "negara",
      key: "negara",
    },
    {
      title: "Tujuan Pengunaan",
      dataIndex: "tujuanPenggunaan",
      key: "tujuanPenggunaan",
    },
    {
      title: "No Pendaftaran Pabean",
      dataIndex: "noPabean",
      key: "noPabean",
    },
    {
      title: "Tgl Pendaftaran Pabean",
      dataIndex: "tanggalPabean",
      key: "tanggalPabean",
    },
    {
      title: "Jangka Waktu Reekspor/Reimpor",
      dataIndex: "jangkaWaktu",
      key: "jangkaWaktu",
    },
    {
      title: "Penyelesaian",
      dataIndex: "penyelesaian",
      key: "penyelesaian",
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
    },
  ];
  const data = [
    {
      nomorLaporan: "123",
      tanggalLaporan: "12-10-2023",
      periodeLaporan: "test",
      status: "test",
      kantor: "test",
    },
  ];
  return (
    <Fragment>
      <Spin spinning={loading}>
        <div className="kt-subheader   kt-grid__item" id="kt_subheader">
          <div className="kt-subheader__main">
            <h3 className="kt-subheader__title">Carnet</h3>
            <span className="kt-subheader__separator kt-subheader__separator--v" />
            <h3 className="kt-subheader__title">
              Laporan Periodik Kepala Kantor
            </h3>
          </div>
        </div>
        <Row gutter={8} className="mb-1">
          <Card title="Rekam Laporan Periodik">
            <Col className="m-3">
              <Form>
                <Row className="mb-3" gutter={10}>
                  <Col sm={10}>
                    <Select
                      placeholder="Periode Laporan"
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
                <Row className="mb-3" gutter={10}>
                  <Col sm={4}>
                    <DatePicker
                      placeholder="Tanggal Awal"
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col sm={4}>
                    <DatePicker
                      placeholder="Tanggal Akhir"
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col sm={2}>
                    <Button type="primary" icon="search" onClick={() => cari()}>
                      Cari
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            {show && (
              <div>
                <Row className="mb-3">
                  <Col sm={24} align="right">
                    <Button
                      icon="home"
                      type="dashed"
                      style={{ marginRight: 10 }}
                      onClick={() => kembali()}
                    >
                      Kembali
                    </Button>
                    <Button
                      icon="save"
                      style={{ marginRight: 10 }}
                      onClick={() => rekam()}
                    >
                      Simpan
                    </Button>
                    <Button
                      type="primary"
                      icon="double-right"
                      onClick={() => kembali()}
                    >
                      Kirim
                    </Button>
                  </Col>
                </Row>

                <Table
                  dataSource={data}
                  columns={columns}
                  scroll={{ x: 1800 }}
                  style={{ width: "100%" }}
                />
              </div>
            )}
          </Card>
        </Row>
      </Spin>
    </Fragment>
  );
};
export default RekamLaporanPeriodik;
