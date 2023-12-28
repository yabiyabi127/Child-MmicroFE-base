import { API_CARNET } from "setup/application.properties";
import { CarnetRequest } from "setup/setupAxios";

export const getDataLaporanPeriodik = (parameter) => {
  return CarnetRequest.get(
    `${API_CARNET}/laporanPeriodik/browse`,
    {
      params: {
        ...parameter,
      },
    }
  );
};

export const getdetailLaporan = (idLaporan) => {
  return CarnetRequest.get(`${API_CARNET}/detail-laporan-periodik/${idLaporan}`, {
  });
};
