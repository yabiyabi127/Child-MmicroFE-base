import { notification } from "antd";
import moment from "moment";
import { ReferensiRequest } from "setup/setupAxios";
import { API_REFERENSI } from "setup/application.properties";

export const cekNpwp16 = async (data, action) => {
  ReferensiRequest.get(
    `${API_REFERENSI}/v1/Npwp16/get-berlaku-npwp16?kodeAplikasi=${data}`
  )
    .then((res) => {
      if (res.status === 200) {
        const tanggalAktif = res.data.tanggalBerlaku
          .split("-")
          .reverse()
          .join("-")
          .replaceAll("-", "");
        const tanggalSekarang = moment().format("YYYYMMDD");
        action(Number(tanggalAktif) <= Number(tanggalSekarang));
      } else {
        action(false);
      }
    })
    .catch((err) => {
      notification.error({
        message: `Gagal melakukan pengecekan NPWP16, periksa koneksi atau kembali lagi nanti. `,
        top: 20,
      });
    });
};
