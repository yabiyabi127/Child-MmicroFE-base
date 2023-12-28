import React, { Component, Fragment } from "react";
import moment from "moment";

class DokumenPelengkapPabean extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <table
            className="table_nilai_barang table-striped table-hover"
            id="table_nilai_barang"
            width="100%"
          >
            <tbody>
              <tr>
                <td className="px-2 text-right">BC.11</td>
                <td className="px-2 text-right" colSpan={2}>
                  <input
                    className="form-control"
                    type="text"
                    value={this.props.dataDokPabean.nomorBc11}
                    id="txtKdValutaHeader"
                    readOnly
                  />
                </td>
                <td className="px-2" colSpan={4}>
                  <input
                    className="form-control"
                    type="text"
                    value={this.props.dataDokPabean.tanggalBc11}
                    id="txtNDPBM"
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td className="px-2 text-right">Pos</td>
                <td className="px-2 text-right" colSpan={2}>
                  <input
                    className="form-control"
                    type="text"
                    value={this.props.dataDokPabean.posBc11}
                    id="txtKdValutaHeader"
                    readOnly
                  />
                </td>
                {/* <td className="px-2" colSpan={4}><input className="form-control" type="text"
                                    value={this.dataDokPabean.tanggalBc11}
                                    id="txtNDPBM" readOnly /></td> */}
              </tr>
              <tr>
                <td className="px-2 text-right">Tgl. Estimasi Kedatangan</td>
                <td className="px-2 text-right" colSpan={2}>
                  <input
                    className="form-control"
                    type="text"
                    value={
                      this.props.dataDokPabean.tanggalEstimasiKedatangan
                        ? moment(
                            this.props.dataDokPabean.tanggalEstimasiKedatangan
                          ).format("DD-MM-YYYY")
                        : "-"
                    }
                    id="txtKdValutaHeader"
                    readOnly
                  />
                </td>
                <td className="px-2" colSpan={4}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

export default DokumenPelengkapPabean;
