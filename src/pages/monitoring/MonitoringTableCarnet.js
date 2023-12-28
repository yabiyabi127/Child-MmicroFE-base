import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, DatePicker, Form, Input, Row, Col, message, Table, Card } from "antd";
import { dataMonitoring as monitoring, simpanPersetujuan as updatePabean } from "store/reducers/monitoring/monitoringThunk";
import { setPagination, saveFilterProps } from "store/reducers/monitoring/monitoringSlice";
import GlobalVariable from "utils/GlobalVariable";

// const { REACT_APP_API_RUSH_HANDLING, REACT_APP_API_RUSH_HANDLING_KEY } = process.env;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const Monitoring = (props) => {
  const { RangePicker } = DatePicker;
  const formatDate = "DD-MM-YYYY";
  const dateFormatList = ['DD-MM-YYYY', 'DD-MM-YY'];
  const columns = [
    {
      title: 'Nomor Permohonan',
      dataIndex: 'nomorAjuCarnet',
      key: 'nomorAjuCarnet',
    },
    {
      title: 'Tanggal Permohonan',
      dataIndex: 'tanggalPermohonanCarnet',
      key: 'tanggalPermohonanCarnet',
      render: (r) => (
        <span >{r ? moment(r).format(formatDate) : "-"}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'namaProsesCarnet',
      key: 'namaProsesCarnet',
    },
    {
      title: 'Nomor Pendaftaran Carnet',
      dataIndex: 'nomorDaftar',
      key: 'nomorDaftar',
    },
    {
      title: 'Tanggal Pendaftaran Carnet',
      dataIndex: 'tanggalDaftar',
      key: 'tanggalDaftar',
      render: (r) => (
        <span >{r ? moment(r).format(formatDate) : "-"}</span>
      ),
    },
    {
      title: 'Nama Carnet',
      dataIndex: 'namaPerusahaan',
      key: 'namaPerusahaan',
    },
    {
      title: 'Jatuh Tempo Carnet',
      dataIndex: 'jatuhTempoCarnet',
      key: 'jatuhTempoCarnet',
      render: (r) => (
        <span >{r ? moment(r).format(formatDate) : "-"}</span>
      ),
    },
    {
      title: 'Nomor Aju PIB',
      dataIndex: 'nomorAjuPib',
      key: 'nomorAjuPib',
    },
    {
      title: 'Status PIB',
      dataIndex: 'namaProsesPib',
      key: 'namaProsesPib',
    },
    {
      title: 'Nomor Daftar PIB/PIBK',
      dataIndex: 'nomorDaftarPabean',
      key: 'nomorDaftarPabean',
    },
    {
      title: '',
      // render: (r) => {
      //   return <MonitoringCell cellData={r} />
      // }
    },
  ];

  const { confirm } = Modal;
  const dispatch = useDispatch();
  const { getFieldDecorator, getFieldValue, } = props.form;
  const { dataMonitoring, pagination, loading } = useSelector((state) => state.monitoring);
  const { nip, kodeKantor } = useSelector((state) => state.auth);

  const [dataCurrent, setDataCurrent] = useState({})
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(!showModal);
  const [filterParams, setFilterParams] = useState({
    startJatuhTempo: '',
    endJatuhTempo: '',
  })

  const handleTableChange = (pagination) => {
    dispatch(
      setPagination({
        pageSize: pagination.pageSize,
        current: pagination.current,
        total: pagination.total,
      })
    );
    fetchList()
  };

  const handleFilter = () => {
    dispatch(
      saveFilterProps({
        startJatuhTempo: filterParams.startJatuhTempo,
        endJatuhTempo: filterParams.endJatuhTempo,
      })
    );
    fetchList()
  };

  const simpanPersetujuan = () => {
    var dataHeader = dataCurrent;
    props.form.validateFields((err, fieldsValue) => {

      if (!err) {
        confirm({
          title: 'Apakah Anda Sudah Yakin?',
          content: 'Pastikan Data Anda Sudah Benar',
          onOk() {
            const values = {
              nomorDaftarPabean: fieldsValue["nomorAjuPib"],
              idHeader: dataHeader.idHeader,
              idProses: dataHeader.idHeader,
              tanggalDaftarPabean: moment(fieldsValue["tanggalDaftarPib"]).format("YYYY-MM-DD"),
              kodeKantor: kodeKantor, //user.kodeKantor,
              nipRekam: nip,
            };

            dispatch(updatePabean(values))
              .unwrap()
              .then((res) => {
                GlobalVariable.successMessage(
                  res?.message || "SPJ berhasil diterbitkan"
                );
                props.form.resetFields()
                fetchList()
                handleShowModal()
              });
          },
          onCancel() { },
        });
      }

    });
  };

  const fetchList = async () => {
    dispatch(monitoring())
  };

  const validasiBackground = (r) => {
    let bgStyle = ''
    var today = moment().format("YYYY-MM-DD");
    var yesterday = moment().subtract(3, "days").format("YYYY-MM-DD");

    let checking = r.jatuhTempoCarnet == null ? null : moment(r.jatuhTempoCarnet);
    // let flagRekonRh = r.flagRekonCarnet == null ? null : r.flagRekonCarnet;

    if (checking == null) {
      bgStyle = "";
    } else  {
      if ( checking.isAfter(today) == false) {
        bgStyle = "red";
      } else if (checking.clone().subtract(1, 'months')) {
        bgStyle = "yellow";
      } else if (checking.clone().subtract(7, 'days')) {
        bgStyle = "orange";
      } 
    } 

    return bgStyle
  }

  //Side effect
  useEffect(() => {
    fetchList()
  }, []);

  //Component Action Rekam PIB
  // const MonitoringCell = ({ cellData }) => {
  //   if (cellData.nomorDaftarPabean == null && cellData.nomorAjuPib == null) {
  //     if (cellData.kodeProsesCarnet == "800") {
  //       return (
  //         <div>
  //           <Button
  //             onClick={(e) => {
  //               handleShowModal()
  //               setDataCurrent(cellData)
  //             }}
  //             type="primary"
  //           >
  //             Rekam PIBK
  //           </Button>
  //         </div>
  //       );
  //     } else {
  //       return <div />;
  //     }
  //   } else {
  //     return <div />
  //   }
  // };

  return (
    <div>

      <div style={{ marginTop: "1rem" }}>
        <Card>
          <Row gutter={4} >
            <Col className="gutter-row" span={6}>
              <RangePicker
                onChange={(date, dateString) => {
                  setFilterParams({
                    ...filterParams,
                    startJatuhTempo: dateString[0],
                    endJatuhTempo: dateString[1]
                  })
                }}
                value={filterParams?.startJatuhTempo === "" ? [] : [moment(filterParams?.startJatuhTempo, 'DD-MM-YYYY'), moment(filterParams?.endJatuhTempo, 'DD-MM-YYYY')]}
                format={dateFormatList}
                placeholder={['Tanggal Form', '']}
                style={{ width: "95%" }}
              />
            </Col>
            <Col className='gutter-row' span={10}>
              <Button onClick={handleFilter} type="primary">Cari</Button>
            </Col>
          </Row>
        </Card>
      </div>

      <Table
        dataSource={dataMonitoring}
        columns={columns}
        loading={loading}
        onRow={(r) => {
          let bgStyle = validasiBackground(r)
          return ({
            style: {
              background: bgStyle,
            }
          })
        }}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <Modal width={800} title="Pengisian PIBK" footer={null} visible={showModal} onCancel={handleShowModal}  >
        <Row gutter={8} className="mb-1">
          <Col lg={24} md={24}>
            <div>
              <Form {...formItemLayout}>
                <Form.Item label="Nomor Daftar PIBK">
                  {getFieldDecorator("nomorAjuPib", {
                    rules: [
                      {
                        required: true,
                        message: 'Nomor Daftar PIBK is required'
                      }
                    ]
                  })(<Input
                  // onChange={this.handleValidasiPib} 
                  />)}
                </Form.Item>
                <Form.Item label="Tanggal Daftar PIBK">
                  {getFieldDecorator(
                    "tanggalDaftarPib",
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Tanggal Daftar PIBK is required'
                        }
                      ]
                    }
                  )(
                    <DatePicker
                    // onChange={this.handleValidasiPibSelect}
                    // disabledDate={(current) => {
                    //     return moment().add(-1, 'days') >= current
                    // }}
                    />
                  )}
                </Form.Item>
              </Form>
              <div className="pull-right">
                <Button
                  onClick={simpanPersetujuan}
                  type="primary"
                >
                  Simpan
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}
const MonitoringTableCarnet = Form.create()(Monitoring);
export default MonitoringTableCarnet;