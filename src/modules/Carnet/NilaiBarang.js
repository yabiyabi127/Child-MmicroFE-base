import React, { Component, Fragment } from 'react';


function jumlah(angka) {
    var number_string = (angka) ? String(angka) : '0',
        split = number_string.split('.'),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    console.log("ribuan", ribuan)
    console.log("Sisa", sisa)

    var separator = '';

    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return (rupiah ? rupiah : rupiah > 0 ? null : '');
}

class NilaiBarangRh extends Component {
    render() {
        // let kategoriLayanan = JSON.parse(localStorage.getItem('kategoriLayanan'));
        var dataSource = this.props.dataDokPabean;
        var nilaiPabean = (Math.round(dataSource.cif + dataSource.freight + dataSource.asuransi).toFixed(2));
        var nilaiPabeanRp = (Number(nilaiPabean * dataSource.ndpbm).toFixed(2));
        return (
            <Fragment>
                <div>
                    <table className="table_nilai_barang table-striped table-hover" id="table_nilai_barang" width="100%">
                        <tbody>
                            <tr>
                                <td className="px-2 text-right">Valuta</td>
                                <td className="px-2 text-right"><input className="form-control" type="text"
                                    value={this.props.dataDokPabean.kodeValuta}
                                    id="txtKdValutaHeader" readOnly /></td>
                                <td>
                                    {/* {this.props.dataDokPabean.namaValuta}??? */}
                                </td>
                                <td className="px-2">NDPBM</td>
                                <td className="px-2 text-right" colSpan={2}><input className="form-control" type="text"
                                    value={jumlah(this.props.dataDokPabean.ndpbm)}
                                    id="txtNDPBM" readOnly /></td>
                            </tr>

                            <tr>
                                <td className="px-2 text-right">Kode Incoterm</td>
                                <td className="px-2 text-right"><input className="form-control" type="text"
                                    value={this.props.dataDokPabean.kodeIncoterm}
                                    id="txtKdValutaHeader" readOnly /></td>
                                <td></td>
                                <td className="px-2">Nilai Incoterm</td>
                                <td className="px-2 text-right" colSpan={2}><input className="form-control" type="text"
                                    value={jumlah(this.props.dataDokPabean.cif)}
                                    id="txtNDPBM" readOnly /></td>
                            </tr>

                            <tr>
                                <td className="px-2 text-right">Freight</td>
                                <td className="px-2 text-right"><input className="form-control" type="text"
                                    value={this.props.dataDokPabean.freight}
                                    id="txtKdValutaHeader" readOnly /></td>
                                <td></td>
                                <td className="px-2">Asuransi</td>
                                <td className="px-2 text-right" colSpan={2}><input className="form-control" type="text"
                                    value={this.props.dataDokPabean.asuransi}
                                    id="txtNDPBM" readOnly /></td>
                            </tr>

                            <tr>
                                <td className="px-2 text-right">Nilai Pabean</td>
                                <td className="px-2 text-right"><input className="form-control" type="text"
                                    value={jumlah(nilaiPabean)}
                                    id="txtKdValutaHeader" readOnly /></td>
                                <td></td>
                                <td className="px-2">Nilai Pabean Rp.</td>
                                <td className="px-2 text-right" colSpan={2}><input className="form-control" type="text"
                                    value={jumlah(nilaiPabeanRp)}
                                    id="txtNDPBM" readOnly /></td>
                            </tr>

                            <tr>
                                <td className="px-2 text-right">Netto</td>
                                <td className="px-2 text-right"><input className="form-control" type="text"
                                    value={this.props.dataDokPabean.netto}
                                    id="txtKdValutaHeader" readOnly /></td>
                                <td></td>
                                <td className="px-2">Bruto</td>
                                <td className="px-2 text-right" colSpan={2}><input className="form-control" type="text"
                                    value={this.props.dataDokPabean.bruto}
                                    id="txtNDPBM" readOnly /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Fragment>
        );
    }
}


export default NilaiBarangRh;
