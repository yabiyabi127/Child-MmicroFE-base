import React, { Component } from "react";
import { Table } from "antd";
import { connect } from "react-redux";
class Kontainer extends Component {
  render() {
    const data = this.props.carnet.dataKontainer;
    const columns = [
      {
        title: "Nomor Kontainer",
        dataIndex: "nomorKontainer",
        key: "nomorKontainer",
      },
      {
        title: "Ukuran",
        dataIndex: "kodeUkuranKontainer",
        key: "kodeUkuranKontainer",
      },
      {
        title: "Status",
        dataIndex: "kodeTipeKontainer",
        key: "kodeTipeKontainer",
      },
    ];
    return (
      <>
        <Table
          dataSource={data}
          columns={columns}
          style={{ width: "100%" }}
          rowKey={"idKemasan"}
          pagination={false}
          loading={false}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  carnet: state.carnet,
});

export default connect(mapStateToProps)(Kontainer);
