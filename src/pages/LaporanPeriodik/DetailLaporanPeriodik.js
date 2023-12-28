import DetailTypeLaporanPeriodik from "modules/LaporanPeriodik/DetailTypeLaporanPeriodik";
import React, { useEffect, useState } from "react";

const DetailLaporanPeriodik = (props) => {
  return (
    <div>
        <div className="kt-subheader   kt-grid__item" id="kt_subheader">
          <div className="kt-subheader__main">
            <h3 className="kt-subheader__title">Carnet</h3>
            <span className="kt-subheader__separator kt-subheader__separator--v" />
            <h3 className="kt-subheader__title">
              Laporan Periodik Kepala Kantor
            </h3>
          </div>
        </div>
      <DetailTypeLaporanPeriodik />
    </div>
);
};
export default DetailLaporanPeriodik;
