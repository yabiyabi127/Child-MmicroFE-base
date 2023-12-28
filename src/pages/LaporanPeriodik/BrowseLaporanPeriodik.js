import React, { useEffect, useState } from "react";
import { Button, Row, Table, Select, Col, Form, Card, Spin, Modal, Pagination, DatePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ROOT_PATH } from "setup/application.properties";
import { Fragment } from "react";
import { dataDetailLaporan, DataLaporanPeriodik } from "store/reducers/laporanPeriodik/laporanPeriodikThunk";
import { goDetailedView, saveFilterProps } from "store/reducers/laporanPeriodik/laporanPeriodikSlice";
import moment from "moment";

const BrowseLaporanPeriodik = (props) => {
  const { confirm } = Modal;
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY-MM-DD";
  const dispatch = useDispatch();
  const history = useHistory();
  const [startDate, setStartdate] = useState(moment().format(dateFormat));
  const [endDate, setEndDate] = useState(moment().format(dateFormat));
  const [periode, setPeriode] = useState();
  const { dataLaporanPeriodik, loading, pagination } = useSelector((state) => state.laporanPeriodik);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    dispatch(DataLaporanPeriodik());
  }

  const rekamLaporan = () => {
    history.push(`${ROOT_PATH}/laporan-periodik/rekam`);
  };
  const ubahLaporan = (e, record) => {
    const { idLaporan } = record
    const rowLaporan = {...record, detailType: "edit"}
    dispatch(goDetailedView(rowLaporan))
    dispatch(dataDetailLaporan(idLaporan));
    history.push(`${ROOT_PATH}/laporan-periodik/${idLaporan}`);
  };

  const lihatLaporan = (e, record) => {
    const { idLaporan } = record
    const rowLaporan = {...record, detailType: "view"}
    dispatch(goDetailedView(rowLaporan))
    dispatch(dataDetailLaporan(idLaporan));
    history.push(`${ROOT_PATH}/laporan-periodik/${idLaporan}`);
  };

  const hapusLaporan = (e) => {
    confirm({
      title: "Apakah Anda Sudah Yakin??",
      content: "Pastikan Data Anda Sudah Benar!",
      okText: "Ya",
      cancelText: "Tidak",
    });
  };
  const columns = [
    { title: "No",
    key: 'index',
    render: (value, item, index) => pagination.current === 1 ? (index + 1) : ((pagination.current - 1) * pagination.pageSize) + (index + 1)
    },
    {
      title: "Tanggal Laporan",
      dataIndex: "tanggalLaporan",
      key: "tanggalLaporan",
      align: "center"
    },
    {
      title: "Periode Laporan",
      dataIndex: "periodeLaporan",
      key: "periodeLaporan",
      align: "center"
    },
    { title: "Status", dataIndex: "flagFinal", key: "flagFinal" },
    { title: "Kantor", dataIndex: "kodeKantor", key: "kodeKantor" },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "aksi",
      width: 150,
      fixed: "right",
      align: "center",
      render: (key, record) => (
        <div style={{ display: "flex", gap: 5 }}>
          <Button type="primary" onClick={(e) => ubahLaporan(e, record)}>
            Update
          </Button>
          <Button type="danger" onClick={(e) => hapusLaporan(e, record)}>
            Delete
          </Button>
          <Button type="default" onClick={(e) => lihatLaporan(e, record)}>
            View
          </Button>
        </div>
      ),
    },
  ];

  const onChangePeriode = (value) => {
    console.log(value);
    // if (value === "tahunan") {
    //   setDisabledKey(false);
    //   setActiveKey("1");
    //   setPeriode(value);
    // } else if (value === "bulanan") {
    //   setDisabledKey(true);
    //   setActiveKey("2");
    //   setPeriode(value);
    // }
  };

  const handlePeriode = (value, event) => {
    if(value == 1){
      setStartdate(moment('2023-01-01').format(dateFormat))
      setEndDate(moment('2023-06-01').format(dateFormat))
    }else{
      setStartdate(moment('2023-07-01').format(dateFormat))
      setEndDate(moment('2023-12-01').format(dateFormat))
    }
    setPeriode(value)
    dispatch(
      saveFilterProps({
        periode: value
      })
    );
  }

  const searchFilter = () =>{
    dispatch(
      saveFilterProps({
        tanggalAwal: startDate,
        tanggalAkhir : endDate
      })
    );
    fetch();
  }

  const disableDatefilter = (current) => {
    if(periode === '2') return [0, 1, 2, 3, 4, 5].includes(current.month());
    if(periode === '1') return [6, 7, 8, 9, 10, 11].includes(current.month());
  }

  return (
    <Fragment>
      {/* <Spin spinning={loading}> */}
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
          <Card title="Laporan Periodik Kepala Kantor">
            <Col className="m-3">
              <Row className="mb-3" gutter={10}>
                <Form>
                  <Col sm={8}>
                    <Select
                    onSelect={(value, event) =>
                      handlePeriode(value, event)
                    }
                      placeholder="Periode Laporan"
                      style={{ width: "100%" }}
                    >
                      <Option value="1">01 januari s.d 30 juni</Option>
                      <Option value="2">01 juli s.d 31 desember</Option>
                      </Select>
                    
                  </Col>
                  <Col sm={6}>
                    <Button
                     type="primary" 
                     icon="search"
                     onClick={searchFilter}
                     >
                      Cari
                    </Button>
                  </Col>
                </Form>
              </Row>
              {/* <Row className="mb-3" gutter={10}>
                <Form>
                  <Col sm={8}>
                    <Select
                    onSelect={(value, event) =>
                      handlePeriode(value, event)
                    }
                      placeholder="Tahun"
                      style={{ width: "100%" }}
                    >
                      </Select>
                    
                  </Col>
                </Form>
              </Row> */}
              
              <Row className="mb-3" gutter={10}>
                <Form>
                  <Col sm={8}>
                  <RangePicker
                    disabledDate={disableDatefilter}
                    ranges={{
                        Today: [moment(), moment()],
                        "This Month": [
                            moment().startOf("month"),
                            moment().endOf("month"),
                        ],
                    }}
                    value={[
                        moment(startDate, dateFormat),
                        moment(endDate, dateFormat),
                    ]}
                    onChange={(date, dateString) => {
                        setStartdate(dateString[0]);
                        setEndDate(dateString[1]);
                    }}
                    format={dateFormat}
                  />
                  </Col>
                </Form>
              </Row>
              {/* <Row className="mb-3" gutter={10}>
                  <Col sm={4}>
                    <DatePicker
                      placeholder="Tanggal Awal"
                      style={{ width: "100%" }}
                      onChange={(date, dateString) => {
                        setStartdate(dateString)
                      }}
                    />
                  </Col>
                  <Col sm={4}>
                    <DatePicker
                      placeholder="Tanggal Akhir"
                      style={{ width: "100%" }}
                      onChange={(date, dateString) => {
                        setEndDate(dateString)
                      }}
                    />
                  </Col>
                </Row> */}
              <Row>
                <Col sm={24} align="right">
                  <Button icon="reload" style={{ marginRight: 10 }}>
                    Muat Ulang
                  </Button>
                  <Button
                    type="primary"
                    icon="plus"
                    onClick={() => rekamLaporan()}
                  >
                    Rekam
                  </Button>
                </Col>
              </Row>
            </Col>
            <Table
              dataSource={dataLaporanPeriodik}
              columns={columns}
              style={{ width: "100%" }}
              loading={loading}
            />
          </Card>
        </Row>
      {/* </Spin> */}
    </Fragment>
  );
};
export default BrowseLaporanPeriodik;
