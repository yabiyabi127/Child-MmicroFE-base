import React, { Component, Fragment } from "react";
import { Table } from "antd";
import moment from "moment";
import { connect } from "react-redux";

class DataBarang extends Component {
  render() {
    const listBarang = this.props.carnet.dataBarang;
    const columns = [
      {
        title:
          "-Pos tarif/HS, \n-Uraian Jenis Barang, Merk, Tipe, Spesifikasi Wajib, \n-Negara Asal Barang",
        dataIndex: "posTarif",
        render: (text, row) => (
          <span>
            {"-Pos Tarif: " +
              text +
              "\n-Uraian: " +
              row.uraian +
              "\n-Merk: " +
              row.merk +
              "\n-Tipe: " +
              row.tipe +
              "\n-Ukuran: " +
              row.ukuran +
              "\n-Spesifikasi Lain: " +
              row.spesifikasiLain +
              "\n-Kondisi Brg: " +
              "\n-Negara Asal: " +
              row.kodeNegaraAsal}
          </span>
        ),
        // <a> {`-${row.posTarif}` + text + `\n-${row.uraian}` + `${row.merk}`}  </a>
      },
      {
        title:
          "Keterangan \n-Fasilitas dan No. Urut \n-Persyaratan dan No. Urut",
        dataIndex: "dokumenFasilitas",
        render: (text) => (
          <span>
            {" "}
            {text ? (
              text.map((e) => (
                <>
                  <br />
                  <span>{e.namaFasilitas + " (" + e.seriDokumen + ")"}</span>
                  <br />
                </>
              ))
            ) : (
              <span></span>
            )}{" "}
          </span>
        ),
      },
      {
        title: "Tarif dan Fasilitas",
        dataIndex: "ttBarangTarifs",
        render: (text) => (
          <span>
            {" "}
            {text ? (
              text.map((e) => (
                <>
                  <br />
                  <span>
                    {e.kodeJenisPungutan +
                      " " +
                      e.tarif +
                      "%\n" +
                      e.tarifFasilitas +
                      "% " +
                      e.namaFasilitasTarif}
                  </span>
                  <br />
                </>
              ))
            ) : (
              <span></span>
            )}{" "}
          </span>
        ),
      },
      {
        title:
          "-Jumlah dan Jenis Satuan \n-Berat Bersih(Kg) \n-Jumlah/Jenis Kemasan",
        dataIndex: "jumlahSatuan",
        render: (text, row) => (
          <span>
            {" "}
            {"-" +
              text +
              "/" +
              row.kodeSatuanBarang +
              "\n-" +
              row.netto +
              "\n-" +
              row.jumlahKemasan +
              "/" +
              row.kodeJenisKemasan}{" "}
          </span>
        ),
      },
      {
        title: "Nilai Pabean",
        dataIndex: "idHeader",
        render: (text, row) => (
          <span>
            {" "}
            {Math.round(row.cif + row.freight + row.asuransi).toFixed(2)}{" "}
          </span>
        ),
      },
      {
        title:
          "-Jumlah Barang Impor Eksep \n-Tanggal Rencana Kedatangan Barang Impor Eksep",
        dataIndex: "jumlahBarangEksep",
        render: (text, row) => (
          <span>
            {" "}
            {`- ${text}\n- ${
              row.tanggalDatangEksep
                ? moment(row.tanggalDatangEksep).format("DD-MM-YYYY")
                : "N/A"
            }`}{" "}
          </span>
        ),
      },
    ];
    return (
      <Fragment>
        <Table
          columns={columns}
          dataSource={listBarang}
          pagination={{ pageSize: 5 }}
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

export default connect(mapStateToProps)(DataBarang);
