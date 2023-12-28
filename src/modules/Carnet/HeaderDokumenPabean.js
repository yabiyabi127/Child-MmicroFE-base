import React, { Component, Fragment } from "react";
import moment from "moment";

class HeaderDokumenPabean extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    var headerDokumen = this.props.dataDokPabean;
    return (
      <Fragment>
        <table
          className="table_nilai_barang table-striped table-hover"
          id="table_nilai_barang"
          width="100%"
        >
          <tbody>
            <tr>
              <td className="px-2 text-right">Nomor / Tanggal Daftar</td>
              <td className="px-2 text-right">
                <input
                  className="form-control"
                  type="text"
                  value={this.props.noDaftar}
                  id="txtKdValutaHeader"
                  readOnly
                />
              </td>
              <td className="px-2 text-right">/</td>
              <td className="px-2">
                <input
                  className="form-control"
                  type="text"
                  value={moment(
                    this.props.tglDaftar === null ? "-" : this.props.tglDaftar
                  ).format("DD-MM-YYYY")}
                  id="txtNDPBM"
                  readOnly
                />
              </td>
            </tr>

            <tr>
              <td className="px-2 text-right">Nomor Pengajuan</td>
              <td className="px-2 text-right" colSpan={3}>
                <input
                  className="form-control"
                  type="text"
                  value={headerDokumen.nomorAju}
                  id="txtKdValutaHeader"
                  readOnly
                />
              </td>
            </tr>

            <tr>
              <td className="px-2 text-right"> Tanggal Pengajuan</td>
              <td className="px-2 text-right" colSpan={2}>
                <input
                  className="form-control"
                  type="text"
                  value={moment(
                    headerDokumen.tanggalAju == null
                      ? "-"
                      : headerDokumen.tanggalAju
                  ).format("DD-MM-YYYY")}
                  id="txtKdValutaHeader"
                  readOnly
                />
              </td>
              <td className="px-2">
                {/* {this.props.data.namaKantorPendek} */}
              </td>
            </tr>

            <tr>
              <td className="px-2 text-right"> Kantor Pelayanan BC</td>
              <td className="px-2 text-right" colSpan={2}>
                <input
                  className="form-control"
                  type="text"
                  value={headerDokumen.kodeKantorTujuan}
                  id="txtKdValutaHeader"
                  readOnly
                />
              </td>
              <td className="px-2">{/* {this.props.data.namaDokumen} */}</td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default HeaderDokumenPabean;
