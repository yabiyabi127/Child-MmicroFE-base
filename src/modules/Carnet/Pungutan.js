import React, { Component, Fragment } from "react";
import { Table } from "antd";
import { connect } from "react-redux";

class Pungutan extends Component {
  render() {
    const data = this.props.carnet.dataPungutan;
    const columns = [
      {
        title: "Jenis Pungutan",
        dataIndex: "kodeJenisPungutan",
        fixed: "left",
        width: 100,
      },
      {
        title: "Dibayar",
        key: "pungutanDibayar",
        dataIndex: "nilaiPungutan",
        render: (text, row) => (
          <span>{row.kodeFasilitasTarif === "1" ? text : ""}</span>
        ),
      },
      {
        title: "Ditanggung Pemerintah",
        key: "pungutanDitanggungPemerintah",
        dataIndex: "nilaiPungutan",
        render: (text, row) => (
          <span>{row.kodeFasilitasTarif === "2" ? text : ""}</span>
        ),
      },
      {
        title: "Dibebaskan",
        key: "pungutanDibebaskan",
        dataIndex: "nilaiPungutan",
        render: (text, row) => (
          <span>{row.kodeFasilitasTarif === "5" ? text : ""}</span>
        ),
      },
      {
        title: "Tidak Dipungut",
        key: "pungutanTidakDipungut",
        dataIndex: "nilaiPungutan",
        render: (text, row) => (
          <span>{row.kodeFasilitasTarif === "6" ? text : ""}</span>
        ),
      },
      {
        title: "Sudah Dilunasi",
        key: "pungutanDilunasi",
        dataIndex: "nilaiPungutan",
        render: (text, row) => (
          <span>{row.kodeFasilitasTarif === "7" ? text : ""}</span>
        ),
      },
      {
        title: "Ditunda",
        key: "pungutanDitunda",
        dataIndex: "nilaiPungutan",
        render: (text, row) => (
          <span>{row.kodeFasilitasTarif === "9" ? text : ""}</span>
        ),
      },
    ];

    return (
      <Fragment>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          // loading={this.state.loading}
          // onChange={this.handleTableChange}
          size="small"
          scroll={{ x: 1300 }}
          style={{ whiteSpace: "pre-line" }}
          rowKey={"idPungutan"}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  carnet: state.carnet,
});

export default connect(mapStateToProps)(Pungutan);
