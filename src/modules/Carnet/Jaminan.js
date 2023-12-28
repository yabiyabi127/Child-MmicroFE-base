import React, { Component, Fragment } from "react";
import { Input, Form } from "antd";
import { connect } from "react-redux";

const { TextArea } = Input;

class Jaminan extends Component {
  render() {
    const { dataNilaiJaminan: jaminan, rowPenelitian } = this.props.carnet;
    const alasan = rowPenelitian?.alasanCarnet
      ? rowPenelitian.alasanCarnet
      : "";
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
                <td className="px-2 text-right">Jaminan Terus Menerus</td>
                <td className="px-2 text-right" colSpan={2}>
                  <input
                    className="form-control"
                    type="text"
                    value={jaminan.totalJaminanCarnetGelondongan}
                    id="txtKdValutaHeader"
                    readOnly
                  />
                </td>
                <td className="px-2" colSpan={4}></td>
              </tr>
              <tr>
                <td className="px-2 text-right">Jaminan Satuan</td>
                <td className="px-2 text-right" colSpan={2}>
                  <input
                    className="form-control"
                    type="text"
                    value={jaminan.totalJaminanCarnetSatuan}
                    id="txtKdValutaHeader"
                    readOnly
                  />
                </td>
                <td className="px-2" colSpan={4}></td>
              </tr>
            </tbody>
          </table>
          {alasan ? (
            <Form>
              <Form.Item label={<b>Alasan Carnet</b>}>
                <TextArea value={!alasan ? "" : alasan} readOnly rows={3} />
              </Form.Item>
            </Form>
          ) : (
            ""
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  carnet: state.carnet,
});

export default connect(mapStateToProps)(Jaminan);
