import React, { Component } from "react";
import { Table } from "antd";
import { connect } from "react-redux";
class Kemasan extends Component {
  render() {
    const data = this.props.carnet.dataKemasan;
    const columns = [
      {
        title: "Jumlah",
        dataIndex: "jumlahKemasan",
        key: "jumlahKemasan",
      },
      {
        title: "Jenis",
        dataIndex: "kodeJenisKemasan",
        key: "kodeJenisKemasan",
      },
      {
        title: "Merek",
        dataIndex: "merkKemasan",
        key: "merkKemasan",
      },
    ];
    return (
      <Table
        dataSource={data}
        columns={columns}
        style={{ width: "100%" }}
        rowKey={"idKemasan"}
        pagination={false}
        loading={false}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  carnet: state.carnet,
});

export default connect(mapStateToProps)(Kemasan);
