import React, { Component, Fragment } from "react";
import { Row, Col, Tabs } from "antd";
import { find_label, identitas_perusahaan } from "../../utils/constantsList";
import { cekNpwp16 } from "../../utils/cekNpwp16";
import GlobalVariable from "../../utils/GlobalVariable";
import { connect } from "react-redux";

const { TabPane } = Tabs;

class IdentitasPerusahaan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNpwp16Aktif: false,
    };
  }

  componentDidMount() {
    cekNpwp16("NPWPIMPOR", (val) => {
      this.setState({ isNpwp16Aktif: val });
    });
  }

  onRedirect = (e) => {
    if (e !== "" && e.length === 15) {
    } else {
      GlobalVariable.errorMessage("Detail Perusahaan tidak ditemukan");
    }
  };

  render() {
    let no = 0;
    const { dataEntitas: entitas } = this.props.carnet;
    const { isNpwp16Aktif } = this.state;

    // let kategoriLayanan = JSON.parse(localStorage.getItem('kategoriLayanan'));
    return (
      <Fragment>
        <Tabs defaultActiveKey="1">
          {entitas.map((value) => {
            var y = find_label(
              identitas_perusahaan,
              String(value.kodeEntitas),
              "value",
              "label"
            );

            return (
              <TabPane tab={y} key={no++}>
                <div style={{ justifySelf: "center" }}>
                  {isNpwp16Aktif && (
                    <Row gutter={16} align="middle">
                      <Col span={6} align="right">
                        <p style={{ fontWeight: "bold" }}>NPWP16</p>
                      </Col>
                      <Col span={18}>
                        {value.npwp16 === null ? "-" : value.npwp16}
                      </Col>
                    </Row>
                  )}
                  <Row gutter={16} align="middle">
                    <Col span={6} align="right">
                      <p style={{ fontWeight: "bold" }}>No.ID</p>
                    </Col>
                    <Col span={18}>{value.nomorIdentitas}</Col>
                  </Row>

                  <Row gutter={16} align="middle">
                    <Col span={6} align="right">
                      <p style={{ fontWeight: "bold" }}>Nama</p>
                    </Col>
                    <Col span={18}>
                      <a
                        onClick={() =>
                          this.onRedirect(
                            value.nomorIdentitas != null
                              ? value.nomorIdentitas
                              : ""
                          )
                        }
                        style={{ color: "#4A96FF" }}
                      >
                        {value.namaEntitas}
                      </a>
                    </Col>
                  </Row>

                  <Row gutter={16} align="middle">
                    <Col span={6} align="right">
                      <p style={{ fontWeight: "bold" }}>Alamat</p>
                    </Col>
                    <Col span={18}>{value.alamatEntitas}</Col>
                  </Row>
                </div>
              </TabPane>
            );
          })}
        </Tabs>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  carnet: state.carnet,
});

export default connect(mapStateToProps)(IdentitasPerusahaan);
