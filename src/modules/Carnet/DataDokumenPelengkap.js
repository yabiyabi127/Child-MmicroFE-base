import React, { Component, Fragment } from "react";
import { Table } from "antd";
import moment from "moment";
import { connect } from "react-redux";

const columns = [
  {
    title: "Kode Dokumen",
    dataIndex: "kodeDokumen",
    render: (text, row) => <span> {text}</span>,
  },
  {
    title: "Nama Dokumen",
    dataIndex: "namaDokumen",
    render: (text, row) => <span> {text} </span>,
  },
  {
    title: "Nomor dan Tanggal Dokumen",
    dataIndex: "nomorDokumen",
    render: (text, row) => (
      <span>
        {" "}
        {`No. ${text}\nTgl. ${
          row.tanggalDokumen
            ? moment(row.tanggalDokumen).format("DD-MM-YYYY")
            : "N/A"
        }`}{" "}
      </span>
    ),
  },
];

class DataDokumenPelengkap extends Component {
  render() {
    var listDokumen = this.props.carnet.dataDokumen;
    return (
      <Fragment>
        <Table
          columns={columns}
          dataSource={listDokumen}
          size="small"
          style={{ whiteSpace: "pre-line" }}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  carnet: state.carnet,
});

export default connect(mapStateToProps)(DataDokumenPelengkap);
